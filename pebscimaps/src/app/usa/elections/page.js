'use client'

import usa from '../../../data/usa.json'
import USAMap from '../USAMap';
import {useState} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Link from 'next/link'

function usaElections() {
    const router = useRouter();

    const pathname = usePathname(); 
    const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);
    console.log(searchParams.get('year'));

    const [selectedYear, setSelectedYear] = useState(2020);
    
    // Function to handle year selection
    const handleYearClick = (year) => {
      setSelectedYear(year);
      // Navigate programmatically using the new router
      router.push(`localhost:3000/${pathname}?year=${year}`);
    };

    
    
    return (
        <div style={{color: 'black'}}>
          <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <USAMap infoType={"elections"} selectedYear={selectedYear}/>
          </div>
          <div style={{marginLeft: '16px'}}>
            <h1 style={{fontSize: '2rem'}}>Viewing Modes</h1>

            <h2 style={{fontSize: '1.3rem'}}>Election by year:</h2>
              <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2020)}>2020</h3>
              <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2016)}>2016</h3>
              <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2012)}>2012</h3>
              <h3 style={{ cursor: 'pointer' }} onClick={() => handleYearClick(2008)}>2008</h3>

            <h2 style={{fontSize: '1.3rem'}}>State Creator</h2>
                <h3>State Creator v1</h3>
                <p>Combine states and see how they would have voted if they were apart of the same state.</p>
          </div>
        </div>
      );
  }

export default usaElections;