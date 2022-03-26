import { useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import { useLayoutEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { getAuthState } from '../lib/authState';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userState] = getAuthState();
    if (!userState) navigate('/');

    useLayoutEffect(() => {}, []);

    return (
        <>
            <Stats
                joinDate={'26/03/2022'}
                username={'Ariq Fraser'}
                wordCount={0}
                deckCount={0}
                practiceCount={0}
            />
            <MainNav active="profile" />
            <div>accounts {userState && userState.displayName}</div>
        </>
    );
};

export default ProfilePage;
