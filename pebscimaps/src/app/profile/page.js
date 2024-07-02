'use client';

import {useEffect, useState} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import {getUserByID} from '../../app/services/userService';

function Profile() {

    const router = useRouter();

    const pathname = usePathname(); 
    const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);
    console.log(searchParams.get('user'));

    const [user, setUser] = useState(null);

    // Function to handle year selection
    const handleYearClick = (year) => {
        setSelectedYear(year);
        // Navigate programmatically using the new router
        router.push(`${window.location.origin}/${pathname}?year=${year}`);
    };
    
    useEffect(() => {

        //FOR TESTING
        const inputID = searchParams.get('user');
        const fetchedUser = getUserByID(inputID);
        //FOR TESTING
    
        if(fetchedUser){
          console.log("Successfully fetched user data for user with id: " + inputID);
          console.log(fetchedUser);
          setUser(fetchedUser);
          //SET USER STATE AS THIS USER AND UPDATE LOCAL SESSION, COOKIES OR WHATEVER...
        }else{
          //DISPLAY ERROR MESSAGE WITH ERROR LIBRARY
          console.log("Error fetching user: " + inputID);
        }
      }, []); 

    return (
      <>
        <div style={{color: 'black', minHeight: '100vh', padding: '16px 0px 0px 8px'}}>
            <h1>Profile</h1>

            {user &&
            <ul>
                <li>Username: {user.username}</li>
                <li>User ID: {user.id}</li>
                <li>Number of countries {user.username} has visited: {user.explorationStats.visitedCountries.length}</li>
                <li>Number of countries {user.username} has lived in: {user.explorationStats.livedCountries.length}</li>
            </ul>
            }
            
        </div>
      </>
    );
  }

export default Profile;