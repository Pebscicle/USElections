'use client';

import SidebarButton from "./SidebarButton";
import SidebarTitle from "./SidebarTitle";
import SidebarCountry from './SidebarCountry';

//import './BouncingArrow.css';
import './Sidebar.css'

import {getCountryFromID} from '../app/services/dbFetcherService'

import { useEffect, useState } from "react";


function Sidebar() {

    const openArrow = 'https://img.icons8.com/?size=100&id=86088&format=png&color=000000';
    const closeArrow = 'https://img.icons8.com/?size=100&id=99766&format=png&color=000000';

    const [countries, setCountries] = useState({});
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
    const [arrow, setArrow] = useState(closeArrow);
    const [arrowX, setArrowX] = useState(150)

    const toggleSidebar = () => {
        setArrowX(arrow === closeArrow ? 50 : 150);
        setArrow(arrow === closeArrow ? openArrow : closeArrow);
        setSidebarIsOpen(!sidebarIsOpen);
    }

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
        <>
        <div onClick={() => toggleSidebar()} style={{zIndex: 2, cursor: 'pointer', position: 'fixed', width: 'auto', bottom: 0, left: arrowX, display: 'flex', flexDirection: 'column', borderBottomRightRadius: '5px'}}>
            <img style={{borderBottomRightRadius: '5px'}} src={arrow} height={50} width={50} alt='Close sidebar'/>
            <small style={{color: 'black', position: 'relative', right: 45}}>Toggle Sidebar</small>
        </div>
        {sidebarIsOpen &&
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', height: '100vh', width: '200px', position: 'fixed'}}>
            <div className= "sidebar" style={{height: '100%', width: '100%', color: 'black', display: 'flex', flexDirection: 'column'}}>
                <SidebarButton name='Home' link='/' />

                <div style={{width: "100%", border: 'solid black 1px'}}></div>

                <SidebarTitle title='Countries' />
                {Object.entries(countries).map(([countryCode, country]) => (
                    <SidebarCountry key={countryCode} name={country.name} link={country.link} flag={country.flag} />
                ))}
                
            </div>
        </div>
        }
        </>
    );
  }

export default Sidebar;

