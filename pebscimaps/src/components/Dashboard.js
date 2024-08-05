import DashboardTopBar from '../components/DashboardTopBar';
import LoginModal from '../components/LoginModal';

import ToggleSwitch from '../components/ToggleSwitch';

import Link from 'next/link';

import {useState} from 'react';

import colors from '../resources/colors.json';


function Dashboard({children, user}) {
    
    const [showLogin, setShowLogin] = useState(false);

    const [mode, setMode] = useState('general');


    const changeMode = (modeToSwitchTo) => {
        //setMode(modeToSwitchTo);
    }

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

    return (
        <>
        <LoginModal isVisible={showLogin} closeModal={closeLogin}/>
        <div style={{width: '100vw', backgroundColor: colors.white, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            {children}     
        </div>
        </>
    );
  }

export default Dashboard;

