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
    <div style={{color: 'black', backgroundColor: 'white'}}>
      <div style={{display: 'flex', justifyContent: 'center', minHeight: '120vh'}}>
        <CountryInfo country={usa}>
          <USAMap infoType={"general"} callbackData={modifyStateFromList} suppliedList={selectedState} />
        </CountryInfo>
      </div>
    </div>
  );
}

export default USA;