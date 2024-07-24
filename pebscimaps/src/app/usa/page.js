'use client';

import CountryInfo from "../../components/CountryInfo"
import usa from '../../data/usa.json';
import {getStates} from '../../app/services/dbFetcherService';
import Link from 'next/link';
import USAMap from "./USAMap";
import USADetailedMap from './USADetailedMap'
import SubdivisionTable from "../../components/SubdivisionTable";
import Switch from '@mui/material/Switch';

import colors from '../../resources/colors.json';

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

function USA() {

  const [selectedState, setSelectedState] = useState([]);

  // Access mode and view from Redux store
  const mode = useSelector((state) => state.app.mode);
  const view = useSelector((state) => state.app.view);


  const [isDetailedMap, setIsDetailedMap] = useState(false);
  const [statesData, setStatesData] = useState(null);
  
  const handleToggleDetailedMap = (event) => {
    setIsDetailedMap(event.target.checked);
  }

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
    <div style={{display: 'flex', justifyContent: 'center', minHeight: '120vh', color: 'black', backgroundColor: 'white', width: '100%'}}>
      <div style={{display: 'grid', gridTemplateRows: '50px 1fr', width: '100%'}}>

      <div style={{backgroundColor: colors.white, display: 'flex', alignItems: 'center', paddingLeft: '8px'}}>
        <Link href='/' style={{color: 'blue'}}>Back</Link>
        <span style={{paddingLeft: '8px'}}>Display Counties?</span>
        <Switch checked={isDetailedMap} onChange={handleToggleDetailedMap} />

        <Link href='/usa/elections' style={{color: 'blue', paddingLeft: '8px'}}>Elections</Link>

        <Link href='/usa/creator' style={{color: 'blue', paddingLeft: '8px'}}>State Creator</Link>

        
      </div>

      <CountryInfo country={usa}>
        
        {view === 'map' && !isDetailedMap &&
          <USAMap infoType={"general"} callbackData={modifyStateFromList} suppliedList={selectedState} />
        }
        {view === 'map' && isDetailedMap &&
          <USADetailedMap />
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