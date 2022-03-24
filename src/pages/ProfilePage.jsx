import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainNav from '../components/MainNav';

const ProfilePage = () => {
    // TODO
    // CHECK IF LOGGED IN
    const UID = useParams().UID;

    firebase.return(
        <>
            <MainNav active="profile" />
            <div>accounts {UID}</div>
            {sessionStorage.test === 'true' && 'logged in'}
        </>
    );
};

export default ProfilePage;
