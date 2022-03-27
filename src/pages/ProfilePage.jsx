import { useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import { useEffect, useState, useLayoutEffect } from 'react';
import MainNav from '../components/MainNav';
import { getAuthState } from '../lib/authState';
import {
    collection,
    getDocs,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import { db, auth } from '../lib/init-firebase';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [practiceCount, setPracticeCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [deckCount, setDeckCount] = useState(0);
    const [userState] = getAuthState();

    if (!userState) navigate('/');

    const usersCollectionRef = collection(db, 'users');
    let email = null;
    useEffect(() => {
        const getUserData = async () => {
            // if (email === null || email === undefined) {
            //     return null;
            // }
            email = auth['_currentUser'].email;

            console.log(email);
            const collectionQuery = query(
                usersCollectionRef,
                where('email', '==', email)
            );
            getDocs(collectionQuery)
                .then((data) =>
                    data.docs.map((v) => ({
                        data: v.data(),
                        id: v.id,
                    }))
                )
                .then((doc) => {
                    const data = doc[0].data;
                    setUsername(data.username);
                    setPracticeCount(data.practiceCount);
                    setDeckCount(data.decks.length);
                    setWordCount(data.wordCount);
                    let userJoinDate = data.joinDate
                        .toDate()
                        .getDate()
                        .toString();
                    userJoinDate +=
                        '/' +
                        (data.joinDate.toDate().getMonth() + 1).toString();
                    userJoinDate += '/' + data.joinDate.toDate().getFullYear();
                    setJoinDate(userJoinDate);
                })
                .catch((err) => console.log(err.message));
        };
        getUserData();
    }, [userState]);

    // Promise.resolve()
    //     .then(() => {
    //         return ;
    //     })
    //     .then((email) => {
    //         console.log(email);
    //         return query(usersCollectionRef, where('email', '==', email));
    //     })
    //     .then((query) => getDocs(query))
    //     .then((data) =>
    //         data.docs.map((v) => ({
    //             data: v.data(),
    //             id: v.id,
    //         }))
    //     )

    //     .catch((err) => console.log(err));

    return (
        <>
            <Stats
                joinDate={joinDate}
                username={username}
                wordCount={wordCount}
                deckCount={deckCount}
                practiceCount={practiceCount}
            />
            <MainNav active="profile" />
            {/* <div>accounts {userState && userState.displayName}</div> */}
        </>
    );
};

export default ProfilePage;
