'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getUserByID } from '../../app/services/userService';

function Profile() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    console.log(router.query);
    console.log(pathname);
    console.log(searchParams.get('user'));

    const [user, setUser] = useState(null);

    const handleYearClick = (year) => {
        // Assuming setSelectedYear is defined somewhere
        setSelectedYear(year);
        router.push(`${window.location.origin}/${pathname}?year=${year}`);
    };

    useEffect(() => {
      const inputID = searchParams.get('user');
      const user = getUserByID(inputID);
      if (user) {
        console.log("Successfully fetched user data for user with id: " + inputID);
        setUser(user);
      } else {
        console.log("Error fetching user: " + inputID);
      }
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div style={{ color: 'black', minHeight: '100vh', padding: '16px 0px 0px 8px' }}>
                <h1>Profile</h1>

                {user && (
                    <ul>
                        <li>Username: {user.username}</li>
                        <li>User ID: {user.id}</li>
                        <li>Number of countries {user.username} has visited: {user.explorationStats.visitedCountries.length}</li>
                        <li>Number of countries {user.username} has lived in: {user.explorationStats.livedCountries.length}</li>
                    </ul>
                )}
            </div>
        </Suspense>
    );
}

export default Profile;