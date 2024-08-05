'use client';

import Image from "next/image";

import Dashboard from '../components/Dashboard';
import WorldMap from '../app/WorldMap';
import SubdivisionTable from "../components/SubdivisionTable";

import {getUserByID} from '../app/services/userService';
import {getCountries} from '../app/services/dbFetcherService';

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';



export default function Home() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Access mode and view from Redux store
  const mode = useSelector((state) => state.app.mode);
  const view = useSelector((state) => state.app.view);

  const [worldData, setWorldData] = useState(null);
  

  useEffect(() => {

    //FOR TESTING
    const inputID = 'paul.davis438@gmail.com';
    const fetchedUser = null;//getUserByID(inputID);
    //FOR TESTING

    if(fetchedUser){
      console.log("Successfully fetched user data for user with id: " + inputID);
      console.log(fetchedUser);
      setLoggedInUser(fetchedUser);
      //SET USER STATE AS THIS USER AND UPDATE LOCAL SESSION, COOKIES OR WHATEVER...
    }else{
      //DISPLAY ERROR MESSAGE WITH ERROR LIBRARY
      console.log("Error fetching user: " + inputID);
    }
  }, []); 


  useEffect(() => {
    console.log('view has changed!');
    if(view === 'table'){
      let tableData = getCountries();
      tableData = Object.values(tableData);
      setWorldData(tableData);
    }
    //Fetch World Data is view has changed to table?
  }, [view]);


  return (
    <main className="" style={{color: 'black'}}>
      <Dashboard user={loggedInUser}>
        {view === 'map' &&
          <>
            <WorldMap infoType={mode} />
            <div className="min-h-screen px-2 sm:px-20 md:px-20 lg:px-96" style={{color: 'black', paddingTop: '16px', textAlign: 'justify'}}>
              <h1 style={{display: 'flex', justifyContent: 'center'}}>Atlaster</h1>
              <h2>Your Digital Atlas</h2>
            </div>
          </>
        }
        {view === 'table' && 
          <SubdivisionTable 
            title={'The World'}
            subdivisions={worldData}
            ignoreColumns={['id', 'link']}
          />
        }
      </Dashboard>
    </main>
  );
}
