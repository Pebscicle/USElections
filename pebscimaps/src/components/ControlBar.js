'use client';

import DashboardTopBar from '../components/DashboardTopBar';
import LoginModal from '../components/LoginModal';
import SubdivisionsModal from '../components/SubdivisionsModal';

import ToggleSwitch from '../components/ToggleSwitch';

import Link from 'next/link';

import { Fab, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

import {getCountryFromID} from '../app/services/dbFetcherService';

import {useState, useEffect} from 'react';
import {fetchUser} from '../app/services/auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setView } from '../actions/appActions';

import colors from '../resources/colors.json';

function ControlBar( ) {

    const [user, setUser] = useState(null);
    
    const [showLogin, setShowLogin] = useState(false);
    const [showSubdivisionsModal, setShowSubdivisionsModal] = useState(false);

    const mode = useSelector((state) => state.app.mode);
    const view = useSelector((state) => state.app.view);
    const dispatch = useDispatch();
    const [subdivision, setSubdivision] = useState('world');

    // Update handleModeChange and handleViewChange to dispatch actions
    const handleModeChange = (event) => {
        dispatch(setMode(event.target.value));
    };

    const handleViewChange = (event) => {
        dispatch(setView(event.target.value));
    };

    const openSubdivisionsModal = () => {
        setShowSubdivisionsModal(true);
    };
    
    const closeSubdivisionsModal = () => {
        setShowSubdivisionsModal(false);
    };

    const [subdivisionsLinks, setSubdivisionLinks] = useState([
        { text: 'Subdivision 1', href: '/subdivision1' },
        { text: 'Subdivision 2', href: '/subdivision2' },
        { text: 'Subdivision 3', href: '/subdivision3' }]);
 

//START LOGIN / SIGN UP
    const openLogin = () => {
        setShowLogin(true);
        //other stuff...
    }

    const closeLogin = () => {
        setShowLogin(false);
        //other stuff...
    }
//END LOGIN / SIGN UP

useEffect(() => {
    const fetchSubdivisionLinks = async () => {
      const idsToSearch = ['US', 'FR', 'BE'];
      const links = await Promise.all(
        idsToSearch.map(async (id) => {
          const country = await getCountryFromID(id);
          return { text: country.name, flag: country.flag, href: `${country.link}` };
        })
      );
      setSubdivisionLinks(links);
    };

    const fetchAUser = async () => {
        const aUser = await fetchUser();
        console.log('A USER!');
        console.log(aUser);
        setUser(aUser);
    };

    fetchSubdivisionLinks();
    fetchAUser();
  }, []);

    

    return (
        <div style={{position: 'fixed', bottom: '0', width: '100%', height: '60px', backgroundColor: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '16px'}}>
            
            {/*START Popups*/}
            <LoginModal isVisible={showLogin} closeModal={closeLogin}/>
            {showSubdivisionsModal &&
                <SubdivisionsModal title={'Select a Subdivision'} open={openSubdivisionsModal} handleClose={closeSubdivisionsModal} links={subdivisionsLinks} />
            }
            {/*END Popups*/}
            
            
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>

                <FormControl variant="filled" sx={{ m: 1 }}>
                    <InputLabel id="mode-label" sx={{ color: 'blue' }}>Mode</InputLabel>
                    <Select
                    labelId="mode-label"
                    id="mode-select"
                    value={mode}
                    onChange={handleModeChange}
                    >
                    <MenuItem value="general">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'general'}>Info</MenuItem>
                    <MenuItem value={'mapmaker'}>Map Maker</MenuItem>
                    <MenuItem value={'exploration'}>Exploration</MenuItem>
                    </Select>
                </FormControl>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Fab variant="extended" onClick={openSubdivisionsModal}>
                        <MapIcon sx={{ mr: 1 }} />
                        Select a Subdivision
                    </Fab>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>

                    <FormControl variant="filled" sx={{ m: 1 }}>
                        <InputLabel id="view-label" sx={{ color: 'blue' }}>View</InputLabel>
                        <Select
                        labelId="view-label"
                        id="view-select"
                        value={view}
                        onChange={handleViewChange}
                        >
                        <MenuItem value="map">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'map'}>Map</MenuItem>
                        <MenuItem value={'table'}>Table</MenuItem>
                        </Select>
                    </FormControl>

                    {/*LOGIN MESSAGE*/}
                    {!user && 
                    <button onClick={openLogin} style={{display: 'flex', alignItems: 'center', paddingLeft: '8px', color: 'blue', cursor: 'pointer'}}>
                        Log in / Sign Up
                    </button>
                    }
                    {user && 
                    <Link href={`/profile?user=${user.id}`} style={{display : 'flex', justifyContent: 'center'}} title='Profile'>
                        <button style={{display: 'flex', alignItems: 'center'}}>
                            <img src='Default_pfp.svg' style={{borderRadius: '50px'}} height={32} width={32} alt='Profile'/>
                        </button>
                    </Link>
                    }
                    {/*END LOGIN MESSAGE*/}
                </div>
                
                {/*DO NOT DELETE
                <button onClick={changeMode('exploration')} style={{paddingLeft: '8px'}}>Exploration</button> <ToggleSwitch />
                <Link href='/news'><button style={{paddingLeft: '8px'}}>Latest News</button></Link>
                <Link href='/mapmaker'><button style={{paddingLeft: '8px'}}>Map Maker</button></Link>
                */}
                
                {/*LOGIN MESSAGE*/}
                {/*DO NOT DELETE
                {!user && 
                <span onClick={openLogin} style={{display: 'flex', alignItems: 'center', paddingLeft: '8px', color: 'blue', cursor: 'pointer'}}>Log in / Sign Up
                </span>}
                {user && 
                <span style={{display: 'flex', alignItems: 'center', paddingLeft: '8px'}}><Link href={`/profile?user=${user.id}`} style={{color: 'blue'}}>{user.username}</Link>, welcome.
                </span>}
                {/*END LOGIN MESSAGE*/}


                
            </div>
        </div>
    );
  }

export default ControlBar;

