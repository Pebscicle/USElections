'use client'

import USAMap from '../USAMap';
import USADetailedMap from '../USADetailedMap';
import {useState, useEffect} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import TwoSeventyBar from '../../../components/elections/TwoSeventyBar';
import Switch from '@mui/material/Switch';

import {getLeftEVs, getRightEVs, getOtherEVs, getEVsForYear} from '../../../app/services/dbFetcherService';
import {getCounties} from '../../../app/services/electionService';
import ElectionColorer from './ElectionColorer';
import ElectionHelper from './ElectionHelper';
import colors from '../../../resources/colors.json';


import Link from 'next/link'

function UsaElections() {
    const router = useRouter();

    const pathname = usePathname(); 
    //const searchParams = useSearchParams();

    const [selectedYear, setSelectedYear] = useState(2020);

    const [leftEVs, setLeftEVs] = useState(306);
    const [rightEVs, setRightEVs] = useState(232);
    const [otherEVs, setOtherEVs] = useState(0);
    const remainingEVs = 0;

    const [EVsByState, setEVsByState] = useState(null);
    const [countyElectionData, setCountyElectionData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isDetailedMap, setIsDetailedMap] = useState(false);
    const [colorCountyMappings, setColorCountyMappings] = useState([]);

    // Function to handle year selection
    const handleYearClick = (year) => {
      if(typeof(year) === typeof('string')){
        year = parseInt(year);
      }

      //Get Electoral Votes Data
      setLeftEVs(getLeftEVs(year));
      setRightEVs(getRightEVs(year));
      setOtherEVs(getOtherEVs(year));

      setEVsByState(getEVsForYear(year, false));

      setSelectedYear(year);
      // Navigate programmatically using the new router
      router.push(`${window.location.origin}/${pathname}?year=${year}`);
    };

    const handleToggleDetailedMap = (event) => {
      setIsDetailedMap(event.target.checked);
    }

    // Function to handle adding/removing counties from the list
    const modifyCountyFromList = (county, color) => {
      setColorCountyMappings((prevMappings) => {
        let updatedList = [...prevMappings];
        let targetColor = color;
        let targetObject = null;
    
        // Look for target color
        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i].color === targetColor) {
            targetObject = updatedList[i];
            break;
          }
        }
    
        // No corresponding color found
        if (targetObject == null) {
          // Add new color and county to the list
          targetObject = { color: targetColor, counties: [] };
          targetObject.counties.push(county);
          updatedList.push(targetObject);
        } 
        // COLOR already exists, now append county to the existing list
        else {
          // Check if the county is already in the list
          let countyIndex = targetObject.counties.indexOf(county);
    
          if (countyIndex === -1) {
            // County not found, add it
            targetObject.counties.push(county);
          } 
          // Optionally, you can handle the case where the county is found,
          // depending on whether you want to remove duplicates or not.
        }
        
        return updatedList;
      });
    };
    


    useEffect(() => {
      setEVsByState(getEVsForYear(selectedYear, false));
      const electionData = getCounties;
      setCountyElectionData(electionData);
      setLoading(false);
    }, []);

    useEffect(() => {
      //Go through countyElectionData, and calculate margin, and assign colors to each.
      if(countyElectionData){
        for(let i = 0; i < countyElectionData.length; i++){
          //Check that county has electionResults
          if(countyElectionData[i]?.electionResults){
            //If does have, determine color based on a coloring rule
            const electionResultYears = Object.values(countyElectionData[i].electionResults);
            let resultsOfGivenYear = null;
            for(let j = 0; j < electionResultYears.length; j++){
              if(electionResultYears[j].year == selectedYear){
                resultsOfGivenYear = electionResultYears[j];
              }
            }
            
            

            //Results for given year?
            if(resultsOfGivenYear){
              const electionHelper = new ElectionHelper();
              const percentageLeft = electionHelper.getPercentage(true, resultsOfGivenYear);
              const percentageRight = electionHelper.getPercentage(false, resultsOfGivenYear);
              const leftMoreThanRight = percentageLeft - percentageRight >= 0;

              const electionColorer = new ElectionColorer();
              const color = leftMoreThanRight ? electionColorer.colorByPercentage(percentageLeft, leftMoreThanRight) : electionColorer.colorByPercentage(percentageRight, leftMoreThanRight);

              modifyCountyFromList(countyElectionData[i], color);
            }

            //Add to colorCountyMappings... CHECK IF COUNTY IS IN COLOR MAPPING: 
            //Add to a color, if not exist, create color and add...
          }else{
            //console.log('No election data found');
          }
        }
      }
    }, [countyElectionData]);

    
    return (
        <div style={{color: 'black', backgroundColor: 'white'}}>
          <div style={{display: 'grid', gridTemplateRows: '50px 60px 1fr', width: '100%'}}>

            <div style={{backgroundColor: colors.white, display: 'flex', alignItems: 'center', paddingLeft: '8px'}}>
              <Link href='/usa' style={{color: 'blue'}}>Back</Link>
              
              <span style={{paddingLeft: '8px'}}>Elections Tool Bar</span>
              <label htmlFor='years' style={{padding: '0px 4px 0px 8px', color: 'blue'}}>Select Election Year</label>
              <select id='years' onChange={(e) => handleYearClick(e.target.value)}>
                <option value={2020}>2020</option>
                <option value={2016}>2016</option>
                <option value={2012}>2012</option>
                <option value={2008}>2008</option>
              </select>
              <span style={{paddingLeft: '8px'}}>Display Counties?</span>
              <Switch checked={isDetailedMap} onChange={handleToggleDetailedMap} />
              <Link href='/usa/elections/predictor' style={{color: 'blue', paddingLeft: '8px'}}>Election Predictor</Link>
            </div>

            <TwoSeventyBar leftEVs={leftEVs} rightEVs={rightEVs} otherEVs={otherEVs} remainingEVs={0}/>

            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <div style={{width: '100%'}}>
              {!loading && !isDetailedMap &&
                <USAMap infoType={"elections"} selectedYear={selectedYear} suppliedStates={EVsByState}/>
              }
              {!loading && isDetailedMap &&
                <USADetailedMap infoType={"elections"} selectedYear={selectedYear} colorStateMappings={colorCountyMappings} />
              }
              </div>
            </div>
            {/*<div style={{marginLeft: '16px'}}>
              <h1 style={{fontSize: '2rem'}}>Viewing Modes</h1>

              <h2 style={{fontSize: '1.3rem'}}>Election by year:</h2>
                <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2020)}>2020</h3>
                <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2016)}>2016</h3>
                <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2012)}>2012</h3>
                <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2008)}>2008</h3>

              <h2 style={{fontSize: '1.3rem'}}>State Creator</h2>
                  <h3>State Creator v1</h3>
                  <p>Combine states and see how they would have voted if they were apart of the same state.</p>
            </div>*/}
          </div>

          <article>
            <h2>Elections in the United States</h2>
            <p>Info to come...</p>
          </article>

        </div>
      );
  }

export default UsaElections;