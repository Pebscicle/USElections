'use client';

import CountryInfo from "../../components/CountryInfo"
import usa from '../../data/usa.json';
import {getStates} from '../../app/services/dbFetcherService';
import Link from 'next/link';
import USAMap from "./USAMap";
import SubdivisionTable from "../../components/SubdivisionTable";

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

function USA() {

  const [selectedState, setSelectedState] = useState([]);

  // Access mode and view from Redux store
  const mode = useSelector((state) => state.app.mode);
  const view = useSelector((state) => state.app.view);

  const [statesData, setStatesData] = useState(null);
  
  useEffect(() => {
    console.log('view has changed!');
    if(view === 'table'){
      let tableData = getStates();
      tableData = Object.values(tableData);
      setStatesData(tableData);
    }
    //Fetch World Data is view has changed to table?
  }, [view]);

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
          {view === 'map' &&
          <USAMap infoType={"general"} callbackData={modifyStateFromList} suppliedList={selectedState} />
          }
          {view === 'table' && 
          <SubdivisionTable 
            title={'United States of America'}
            subdivisions={statesData}
            ignoreColumns={['id', 'link', 'comment', 'counties']}
          />
        }
        </CountryInfo>
      </div>
    </div>
  );
}

export default USA;