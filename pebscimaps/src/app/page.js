'use client';

import Image from "next/image";

import Dashboard from '../components/Dashboard';
import WorldMap from '../app/WorldMap';

import {getUserByID} from '../app/services/userService'

import {useEffect, useState} from 'react';


export default function Home() {

  const [loggedInUser, setLoggedInUser] = useState(null);

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


  return (
    <main className="" style={{color: 'black'}}>
      <Dashboard user={loggedInUser}>
        <WorldMap infoType='general' />
      </Dashboard>
    </main>
  );
}
