'use client'

import USAMap from '../USAMap';
import {useState, useEffect} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import TwoSeventyBar from '../../../components/elections/TwoSeventyBar';

import {getLeftEVs, getRightEVs, getOtherEVs, getEVsForYear} from '../../../app/services/dbFetcherService';
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

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
      setEVsByState(getEVsForYear(selectedYear, false));
      setLoading(false);
  }, []);

    
    
    return (
        <div style={{color: 'black'}}>
          <div style={{display: 'grid', gridTemplateRows: '50px 60px 1fr'}}>

            <div style={{backgroundColor: colors.secondary, display: 'flex', alignItems: 'center', paddingLeft: '8px'}}>
              <span>Elections Tool Bar</span>
              <label htmlFor='years' style={{padding: '0px 4px 0px 8px', color: 'blue'}}>Select Election Year</label>
              <select id='years' onChange={(e) => handleYearClick(e.target.value)}>
                <option value={2020}>2020</option>
                <option value={2016}>2016</option>
                <option value={2012}>2012</option>
                <option value={2008}>2008</option>
              </select>
              <Link href='/usa/elections/predictor' style={{color: 'blue', paddingLeft: '8px'}}>Election Predictor</Link>
            </div>

            <TwoSeventyBar leftEVs={leftEVs} rightEVs={rightEVs} otherEVs={otherEVs} remainingEVs={0}/>

            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
              {!loading &&
                <USAMap infoType={"elections"} selectedYear={selectedYear} suppliedStates={EVsByState}/>
              }
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