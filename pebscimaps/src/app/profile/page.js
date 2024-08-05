'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getUserByID } from '../../app/services/userService';
import { fetchUser } from '../services/auth';

function Profile() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);
    console.log(searchParams.get('user'));

    const [user, setUser] = useState(null);


    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }


    useEffect(() => {
        const fetchAUser = async () => {
            const aUser = await fetchUser();
            setUser(aUser);
        };
    
        fetchAUser();
    }, []); //Fetch user when component mounts

    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div style={{ color: 'black', minHeight: '100vh', padding: '16px 0px 0px 8px' }}>
                <h1>Profile</h1>

                <button style={{color: 'red', fontWeight: 'semibold'}} onClick={() => logout()}>Logout</button>

                {user && 
                    <div>
                        <p>User: {user.email}</p>
                        <p>{user.secretMessage}</p>
                    </div>
                }
                {/*user && (
                    <ul>
                        <li>Username: {user.username}</li>
                        <li>User ID: {user.id}</li>
                        <li>Number of countries {user.username} has visited: {user.explorationStats.visitedCountries.length}</li>
                        <li>Number of countries {user.username} has lived in: {user.explorationStats.livedCountries.length}</li>
                    </ul>
                )*/}
            </div>
        </Suspense>
    );
}

export default Profile;