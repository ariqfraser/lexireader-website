import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainNav from '../components/MainNav';
import { getAuthState } from '../lib/authState';

const ProfilePage = () => {
    // TODO
    // CHECK IF LOGGED IN
    // const navigate = useNavigate();
    const [userState] = getAuthState();
    if (!userState) {
        const navigate = useNavigate();
        navigate('/');
        return null;
    }
    return (
        <>
            <MainNav active="profile" />
            <div>accounts {userState.displayName}</div>
        </>
    );
};

export default ProfilePage;
