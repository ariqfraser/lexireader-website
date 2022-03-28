import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import PageTemplate from '../components/PageTemplate';
import SearchBar from '../components/SearchBar';
import { Add } from '../assets/icons';
import { Box, SubTitle, Footer } from '../components/Box';
import { auth } from '../lib/init-firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateBtn = () => {
    const Button = styled('a')(() => ({
        padding: '16px 12px',
        borderRadius: 50,
        position: 'fixed',
        backgroundColor: 'var(--g)',
        right: 24,
        bottom: 140,
        zIndex: 10,
        border: 'none',
        filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.25))',
        transition: 'all 200ms ease-in-out',
        cursor: 'pointer',
        '&>svg': {
            width: 24,
            height: 24,
            margin: '0 4px',
            userSelect: 'none',
        },
        '&>span': {
            margin: '0 4px',
            color: '#272727',
            textTransform: 'uppercase',
            fontWeight: 900,
            userSelect: 'none',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    return (
        <Button aria-label="Create a new deck" href="/fc/untitled?isNew=true">
            <span>Create new deck</span>
            {/* <Add /> */}
        </Button>
    );
};

const FlashCardPage = () => {
    const [decks, setDecks] = useState([]);
    const [userState] = useAuthState(auth);

    useEffect(() => {
        // const usersRef = collection(db, 'cards');
        // getDocs(usersRef)
        //     .then((res) => {
        //         console.log(res);
        //         const docs = res.docs.map((v) => ({
        //             data: v.data(),
        //             id: v.id,
        //         }));
        //         console.log(docs);
        //     })
        //     .catch((err) => console.log(err.message));

        async function getDecks() {
            const decksRef = query(
                collection(db, 'decks'),
                where('user', '==', userState['email'])
            );

            getDocs(decksRef)
                .then((data) =>
                    data.docs.map((v) => ({
                        data: v.data(),
                        id: v.id,
                    }))
                )
                .then((doc) => {
                    setDecks(doc);
                })
                .catch((err) => console.log(err.message));
        }
        getDecks();
    }, [userState]);

    return (
        <>
            <CreateBtn />
            <PageTemplate page="flashcards">
                <SearchBar />
                {decks.length === 0 && (
                    <span style={{ gridColumn: 'span 2' }}>
                        Woah there, you've not created any decks 😅
                    </span>
                )}
                {decks.map((v, i) => {
                    return (
                        <Box
                            bg={'#272727'}
                            color={'#fafafa'}
                            key={`box${i}`}
                            onClick={() =>
                                (window.location.href = `/fc/${v.id}`)
                            }
                        >
                            <p key={`p${i}`}>{v['data']['title']}</p>
                            <SubTitle key={`t${i}`}>
                                Cards: {v['data']['cardCount']}
                            </SubTitle>
                            <SubTitle key={`prac${i}`}>
                                practiced: {v['data']['practiceCount']}
                            </SubTitle>
                            <Footer key={`f${i}`}>click to view</Footer>
                        </Box>
                    );
                })}
            </PageTemplate>
        </>
    );
};

export default FlashCardPage;
