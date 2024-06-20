'use client';

import CountryInfo from "../../components/CountryInfo"
import usa from '../../data/usa.json'
import Link from 'next/link';
import USAMap from "./USAMap";

import {useState} from 'react';

function USA() {

  const [selectedState, setSelectedState] = useState([]);

  //Function to handle adding/removing states from list
  const modifyStateFromList = (state) => {
    let updatedList;
  
    // Check if the list is empty
    if (selectedState.length === 0) {
      updatedList = [state]; // Add the new state if the list is empty
    } else if (selectedState.length === 1) {
      // If the list has exactly one state, replace it with the new state
      updatedList = [state];
    } else {
      // If the list has more than one state, clear it and add the new state
      updatedList = [];
    }
  
    setSelectedState(updatedList);
  }


  return (
    <div style={{color: 'black'}}>
      <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
        <CountryInfo country={usa}>
          <USAMap infoType={"general"} callbackData={modifyStateFromList} suppliedList={selectedState} />
        </CountryInfo>
      </div>
      {usa.states.map((state) => (
          <Link key={state.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', overflowY: 'scroll'}} href={`/usa/alabama`}>
              <h1 style={{marginLeft: '16px'}}>{state.name}</h1>
              {/*children*/}
          </Link>
        ))
      }
    </div>
  );
}

export default USA;