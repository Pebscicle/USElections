'use client';

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';
import Link from 'next/link';

import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ControlBar from '../components/ControlBar';

import {useEffect, useState} from 'react';

import {getUserByID} from '../app/services/userService';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {

    //FOR TESTING
    const inputID = 'paul.davis438@gmail.com';
    const fetchedUser = getUserByID(inputID); //null
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
    <html lang="en">
       <Head>
        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Custom Metadata */}
        <title>Atlas-ter</title>
        <meta name="description" content={'Your personal atlas and exploration companion.'} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        </Head>
        <body className={inter.className}>
          <div style={{display: 'grid', gridTemplateColumns: "1fr", backgroundColor: "#f9f9f9", width: "100vw", height: '100vh'}}>
            {/*<Sidebar />*/}

            {/* Main Content and Footer Container */}
            <div style={{display: 'flex', flexDirection: 'column', maxHeight: '100%', maxWidth: '100vw'}}>
              {/* Content Area */}

              <div style={{display: 'grid', gridTemplateRows: '50px 1fr auto auto'}}>
                
              <div style={{backgroundColor: 'rgb(206, 149, 83)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '16px', color: 'black'}}>
                <div style={{display: 'flex', alignItems: 'center', width: '100px'}}>
                  <Link href='/' className='pl-8'>
                    <button style={{display: 'flex', alignItems: 'center'}}>
                      <img src='Atlaster.png' height={50} width={50} alt='Atlaster' style={{marginRight: '10px'}} />
                      <span>Home</span>
                    </button>
                  </Link>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Link href='/news'><button style={{paddingLeft: '8px'}}>Latest News</button></Link>
                </div>
              </div>


              <div style={{flexGrow: 1}}>
                {children}
                <SpeedInsights />
              </div>

              <ControlBar user={loggedInUser} />

              <Footer />

              </div>

            </div>
          </div>
        </body>
    </html>
  );
}
