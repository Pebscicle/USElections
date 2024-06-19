'use client';

import SidebarButton from "./SidebarButton";
import SidebarTitle from "./SidebarTitle";
import SidebarCountry from './SidebarCountry';

//import './BouncingArrow.css';
import './Sidebar.css'

import colors from '../resources/colors.json'
import {getCountryFromID} from '../app/services/dbFetcherService'

import { useEffect, useState } from "react";


function Sidebar() {

    const [countries, setCountries] = useState({});

    useEffect(() => {
        // Directly assign the URLs assuming getFlagFromID returns a string
        const countries = {
            'BE': getCountryFromID('BE'),
            'FR': getCountryFromID('FR'),
            'US': getCountryFromID('US')
        };

        // Set the state with the URLs
        setCountries(countries);
    }, []);
    
    return (
        <div className= "sidebar" style={{backgroundColor: colors.tertiary, height: '100vh', width: '200px', position: 'fixed', color: 'black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
            <SidebarButton name='Home' link='/' />

            <div style={{width: "100%", border: 'solid black 1px'}}></div>

            <SidebarTitle title='Countries' />
            {Object.entries(countries).map(([countryCode, country]) => (
                <SidebarCountry key={countryCode} name={country.name} link={country.link} flag={country.flag} />
            ))}
        </div>
    );
  }

export default Sidebar;

