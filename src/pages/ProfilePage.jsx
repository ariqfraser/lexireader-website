import { useNavigate } from 'react-router-dom';
import Stats from '../components/Stats';
import { useEffect, useState } from 'react';
import MainNav from '../components/MainNav';
import { getAuthState } from '../lib/authState';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [practiceCount, setPracticeCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [deckCount, setDeckCount] = useState(0);

    const usersCollectionRef = collection(db, 'users');
    const [userState] = getAuthState();
    if (!userState) navigate('/');
    useEffect(() => {
        const getUserData = async () => {
            // if (email === null || email === undefined) {
            //     return null;
            // }
            const email = userState.email;

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
        if (userState) getUserData();
    }, [userState]);

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
        </>
    );
};

export default ProfilePage;
