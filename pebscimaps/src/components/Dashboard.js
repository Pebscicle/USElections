import DashboardTopBar from '../components/DashboardTopBar';
import LoginModal from '../components/LoginModal';

import ToggleSwitch from '../components/ToggleSwitch';

import Link from 'next/link';

import {useState} from 'react';

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
        <div>
        <LoginModal isVisible={showLogin} closeModal={closeLogin}/>
        <div style={{width: '100%', height: '100vh', backgroundColor: 'green', display: 'grid', gridTemplateRows: '50px 1fr'}}>
            <DashboardTopBar>
                <button onClick={changeMode('exploration')} style={{paddingLeft: '8px'}}>Exploration</button> <ToggleSwitch />
                <Link href='/news'><button style={{paddingLeft: '8px'}}>Latest News</button></Link>
                <button style={{paddingLeft: '8px'}}>Random</button>
                {!user && 
                <span onClick={openLogin} style={{display: 'flex', alignItems: 'center', paddingLeft: '8px', color: 'blue', cursor: 'pointer'}}>Log in / Sign Up
                </span>}
                {user && 
                <span style={{display: 'flex', alignItems: 'center', paddingLeft: '8px'}}><Link href={`/profile?user=${user.id}`} style={{color: 'blue'}}>{user.username}</Link>, welcome.
                </span>}
            </DashboardTopBar>
            {children}     
        </div>
        </div>
    );
  }

export default Dashboard;

