
import { useEffect, useState } from "react";
import colors from '../resources/colors.json';

import Link from 'next/link';

function LoginModal( {isVisible, closeModal} ) {
    
    const [modalStyle, setModalStyle] = useState({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        width: '800px', // Default width
        height: '400px', // Default height
    });

    const blurStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        borderRadius: '5px',
        padding: '20px', 
        listStyleType: 'disc'
    };

    const loginButton = {
        backgroundColor: '#0070f3',
        border: 'none',
        backgroundColor: colors.white,
        padding: '5px 10px',
        width: '100%',
        borderRadius: '2px',
        margin: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center'
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 767) {
                setModalStyle(prevState => ({
                  ...prevState,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    transform: 'none',
                }));
            } else {
                setModalStyle(prevState => ({
                  ...prevState,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '400px',
                }));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct style

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        isVisible &&
        <div style={modalStyle}>
            <div style={{display: 'grid', gridTemplateRows: '25px', gridTemplateColumns: '1fr 50px', width: '100%'}}>
                <div style={{backgroundColor: colors.secondary}}></div>
                <div onClick={closeModal} style={{cursor: 'pointer', backgroundColor: colors.close, padding: '4px 2px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Close</div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', height: '375px', width: '100%'}}>
                <div style={{padding: '32px 48px', display: 'flex', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between'}}>
                    <div>
                        <h3>Get Started with Atlaster</h3>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Google</span></button>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Facebook</span></button>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=30840&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Apple</span></button>
                        <p style={{display: 'flex', justifyContent: 'center', fontSize: '12px'}}>----- or -----</p>
                        <button style={loginButton}>Continue with Email</button>
                    </div>

                    <p style={{fontSize: 'small'}}>By continuing, you agree to our <Link target='_blank' href='/terms_of_use' style={{color: 'blue', textDecoration: 'underline'}}>Terms of Use</Link> & <Link target='_blank' href='/privacy_policy' style={{color: 'blue', textDecoration: 'underline'}}>Privacy Policy</Link>.</p>
                </div>
                <div 
                style={{backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661311950994-d263ea9681a1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    width: 'auto',
                    height: '100%',
                }}
                >
                    <div style={{padding: '32px 48px', display: 'flex', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between'}}>
                        <h3>Start Exploring The World With Atlaster</h3>
                        <ul style={blurStyle}>
                            <li>Your personal Atlas</li>
                            <li>Powerful insights on countries and their subdivisions</li>
                            <li>Personal exploration tracker</li>
                            <li>Save creations from the state creator, etc.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;