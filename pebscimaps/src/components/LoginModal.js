
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import colors from '../resources/colors.json';

import Link from 'next/link';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';

function LoginModal( {isVisible, closeModal} ) {
    

    const [loginMode, setLoginMode] = useState('none');
        const [emailLoginMode, setEmailLoginMode] = useState('login');


    const [alertMessage, setAlertMessage] = useState('Login Successful!');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [showAlert, setShowAlert] = useState(false);

    const [modalStyle, setModalStyle] = useState({
        position: 'fixed',
        color: 'black',
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
        backgroundColor: 'rgba(255, 255, 255, 0.87)', 
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


    // Function to create validation schema dynamically based on mode
    const getValidationSchema = () => {
        return Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .required('Required'),
        ...(emailLoginMode === 'register' && {
                password2: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required')
                    .test('passwords-match', 'Passwords must match', function(value) {
                        return value === this.parent.password;
                    }),
            }),
        });
    };

    const getInitialValues = () => {
        if(emailLoginMode === 'register'){
            return {
                email: '',
                password: '',
                password2: ''
            }
        }
        return {
            email: '',
            password: ''
        }
    }

    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: getValidationSchema(),
        onSubmit: values => {
            if(emailLoginMode === 'register'){
                registerUser(values.email, values.password);
            }else if (emailLoginMode === 'login'){
                loginUser(values.email, values.password);
            }
            
        },
    });

    function registerUser(email, password) {
        console.log('registering user...');

        try {
            axios.post('/api/register', {
                email: email,
                password: password,
            })
            .then((response) => {
                if (response.status === 201) {
                    setAlertSeverity('success');
                    setAlertMessage('Registered successfully.');
                    setShowAlert(true);
                }
                console.log(response);
            })
            .catch((error) => {
                // This will catch errors that occur during the request
                console.log('An error occurred:', error);
                if (error.response && error.response.status === 400) {
                    setAlertSeverity('error');
                    setAlertMessage('Email already registered!');
                } else {
                    setAlertSeverity('error');
                    setAlertMessage('An error occurred during registration.');
                }
                setShowAlert(true);
            });
        } catch (error) {
            // This catch block is redundant in this context because axios is a promise-based API and handles errors within the promise chain
            console.log('This will not catch axios errors.');
        }
      }

    function loginUser(email, password) {
        console.log('Logging in user...');
        axios.post('/api/login', {
            email: email,
            password: password,
        }).then((response) => {
        if (response.status === 200) {
            setAlertSeverity('success');
            localStorage.setItem('token', response.data.token);

            setAlertMessage('Logged in successfully.');
            setShowAlert(true);
            // Handle successful login (e.g., store user info in state or localStorage)
            // Redirect to a dashboard page

            //Redirect...
            window.location.href = '/profile';

            
        }
        console.log(response);
        }).catch((error) => {
            console.error('There was a problem with the login:', error);
            if (error.response) {
                setAlertSeverity('error');
                switch (error.response.status) {
                case 400:
                    setAlertMessage('Email and password are required.');
                    break;
                case 401:
                    setAlertMessage('Invalid email or password.');
                    break;
                default:
                    setAlertMessage('An error occurred during login.');
                }
            } else {
                setAlertMessage('An error occurred during login.');
            }
            setShowAlert(true);
        });
    }
      


    useEffect(() => {
        if (Object.keys(formik.errors).length > 0 && formik.submitCount > 0) {
            setAlertSeverity('error');
            if (formik.errors.password2 === 'Passwords must match') {
                setAlertMessage('Passwords do not match!');
            } else {
                setAlertMessage('Please correct the errors in the form.');
            }
            setShowAlert(true);
        }
    }, [formik.errors, formik.submitCount]);


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
            {showAlert && <div style={{
                    position: 'fixed',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,  // Ensures it appears above other content
                    width: '90%',  // Ensures the alert is not too wide on small screens
                    maxWidth: '500px',  // Limits maximum width on large screens
                }}><Alert severity={alertSeverity} className="App-alert" onClose={() => setShowAlert(false)}><span style={{color: 'black'}}>{alertMessage}</span></Alert>
                </div>
            }
            <div style={{display: 'grid', gridTemplateRows: '25px', gridTemplateColumns: '1fr 50px', width: '100%'}}>
                <div style={{backgroundColor: colors.secondary}}></div>
                <div onClick={closeModal} style={{cursor: 'pointer', backgroundColor: colors.close, padding: '4px 2px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Close</div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', height: '375px', width: '100%'}}>
                
                <div style={{padding: '32px 48px', display: 'flex', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between'}}>
                    {loginMode == 'none' &&
                    <div>
                        <h3>Get Started with Atlaster</h3>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Google</span></button>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Facebook</span></button>
                        <button style={loginButton}> <img src='https://img.icons8.com/?size=100&id=30840&format=png&color=000000' width='25' height='25'/> <span style={{paddingLeft: '8px'}}>Continue with Apple</span></button>
                        <p style={{display: 'flex', justifyContent: 'center', fontSize: '12px'}}>----- or -----</p>
                        <button onClick={() => setLoginMode('email')} style={loginButton}>Continue with Email</button>
                    </div>
                    }
                    {loginMode == 'email' &&
                    <div>
                        <h5><span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setLoginMode('none')}>&lt;Back</span> | <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setEmailLoginMode('login')}>Login</span> or <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setEmailLoginMode('register')}>Register</span> by Email</h5>
                        {emailLoginMode == 'login' &&
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                            <FormControl fullWidth>
                                <FormLabel>Email</FormLabel>
                                <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                />
                                <FormLabel>Password</FormLabel>
                                <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button variant="contained" color="primary" type="submit" style={{marginTop: '8px'}}>Login</Button>
                            </FormControl>
                            </form>
                        </div>
                        }
                        {emailLoginMode == 'register' &&
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                            <FormControl fullWidth>
                                <FormLabel>Email</FormLabel>
                                <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                size="small"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                />
                                <FormLabel>Password</FormLabel>
                                <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                size="small"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                />
                                <FormLabel>Repeat Password</FormLabel>
                                <TextField
                                id="password2"
                                name="password2"
                                label="Password"
                                type="password"
                                size="small"
                                value={formik.values.password2}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button variant="contained" color="primary" type="submit" style={{marginTop: '8px'}}>Register</Button>
                            </FormControl>
                            </form>
                        </div>
                        }
                    </div>
                    }

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