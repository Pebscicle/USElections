'use client'

import USAMap from '../../USAMap';
import {useEffect, useState} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import TwoSeventyBar from '../../../../components/elections/TwoSeventyBar';

import {getEVsForYear} from '../../../../app/services/dbFetcherService';
import colors from '../../../../resources/colors.json';

import Link from 'next/link'

function UsaElectionsPredictor() {
    const router = useRouter();

    const pathname = usePathname(); 
    //const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);

    const [selectedYear, setSelectedYear] = useState(2020);

    const [leftEVs, setLeftEVs] = useState(0);
    const [rightEVs, setRightEVs] = useState(0);
    const [otherEVs, setOtherEVs] = useState(0);

    const [EVsByState, setEVsByState] = useState({});
    
    // Function to handle year selection
    const handleYearClick = (year) => {
      if(typeof(year) === typeof('string')){
        year = parseInt(year);
      }

      //Get Electoral Votes Data
      console.log("EVs for 2020 census: ")
      console.log(getEVsForYear(year));
      setEVsByState(getEVsForYear(year));

      setSelectedYear(year);
      // Navigate programmatically using the new router
      router.push(`${window.location.origin}/${pathname}?year=${year}`);
    };

    useEffect(() => {
        console.log("EVs for 2020 census: ")
        console.log(getEVsForYear(selectedYear));
        setEVsByState(getEVsForYear(selectedYear));
    }, []);

    
    
    return (
        <div style={{color: 'black'}}>
          <div style={{display: 'grid', gridTemplateRows: '50px 60px 1fr'}}>

            <div style={{backgroundColor: colors.secondary, display: 'flex', alignItems: 'center', paddingLeft: '8px'}}>
              <span>Elections Tool Bar</span>
              <Link href='/usa/elections' style={{color: 'blue', paddingLeft: '8px'}}>Back</Link>
              <label for='years' style={{padding: '0px 4px 0px 8px', color: 'blue'}}>Select Census Year</label>
              <select id='years' onChange={(e) => handleYearClick(e.target.value)}>
                <option value={2020}>2020</option>
                <option value={2010}>2010</option>
                <option value={2000}>2000</option>
              </select>
            </div>

            <TwoSeventyBar leftEVs={leftEVs} rightEVs={rightEVs} otherEVs={otherEVs}/>

            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
              <USAMap infoType={"elections"} specificInfoType={"predictor"} selectedYear={selectedYear}/>
            </div>
          </div>

          <article>
            <h2>Elections in the United States</h2>
            <p>Info to come...</p>
          </article>

        </div>
      );
  }

export default UsaElectionsPredictor;