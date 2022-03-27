import { useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import { useEffect, useState, useLayoutEffect } from 'react';
import MainNav from '../components/MainNav';
import { getAuthState } from '../lib/authState';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';

const ProfilePage = () => {
    const navigate = useNavigate();

    const username = useState();
    const joinDate = useState();
    const practiceCount = useState();
    const wordCount = useState();
    const deckCount = useState();
    const [userState] = getAuthState();
    const [isLoaded, setIsLoaded] = useState();

    if (!userState) navigate('/');
    useEffect(() => {
        // Stuff goes here
        if (!userState) navigate('/');
        setIsLoaded(userState);
        console.log(userState);
    }, [userState]);

    useEffect(() => {
        const usersCollectionRef = collection(db, 'users');

        Promise.resolve()
            .then(() => {
                return userState['email'];
            })
            .then((email) => {
                console.log(email);
                return query(usersCollectionRef, where('email', '==', email));
            })
            .then((query) => getDocs(query))
            .then(console.log)
            .catch((err) => console.log(err));
    }, [isLoaded]);

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
            {/* <div>accounts {userState && userState.displayName}</div> */}
        </>
    );
};

export default ProfilePage;
