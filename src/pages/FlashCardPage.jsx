import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import PageTemplate from '../components/PageTemplate';
import { Search } from '../assets/icons';
import { Add } from '../assets/icons';
import { Box, SubTitle, Footer } from '../components/Box';
import { auth } from '../lib/init-firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getAuthState } from '../lib/authState';

const CreateBtn = () => {
    const [userState] = getAuthState();

    const Button = styled('button')(() => ({
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

    async function createNewDeck() {
        const newDeckRef = await addDoc(collection(db, 'decks'), {
            cardCount: 0,
            practiceCount: 0,
            title: 'untitled',
            user: userState['email'],
        });
        window.location.href = `/fc/${newDeckRef['id']}?edit=true`;
        console.log();
    }

    return (
        <Button aria-label="Create a new deck" onClick={() => createNewDeck()}>
            <span>Create new deck</span>
            {/* <Add /> */}
        </Button>
    );
};

const FlashCardPage = () => {
    const [decks, setDecks] = useState([]);
    const [userState] = getAuthState();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    if (!userState) navigate('/');
    useEffect(() => {
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
        if (userState) getDecks();
    }, [userState]);

    const SearchBar = () => {
        const formRef = useRef();
        const searchRef = useRef();

        const Wrapper = styled('form')(() => ({
            gridColumn: '1 / span 2',
            width: '100%',
            position: 'relative',
            '&>input': {
                width: 'calc(100% - 32px)',
                padding: '8px 24px',
                borderRadius: 32,
                border: 'none',
            },
            '&>div': {
                position: 'absolute',
                height: '100%',
                top: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&>button': {
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                },
            },
        }));
        useEffect(() => {
            const handleSubmit = (e) => {
                e.preventDefault();
                setSearchQuery(searchRef.current.value);
            };
            formRef.current.addEventListener('submit', handleSubmit, true);

            // return () => {
            //     formRef.current.removeEventListener('submit', handleSubmit);
            // };
        }, []);

        const handleReset = (e) => {
            e.preventDefault();
            setSearchQuery('');
        };

        return (
            <Wrapper ref={formRef}>
                <input
                    type="text"
                    placeholder="Search deck title..."
                    ref={searchRef}
                />
                <div>
                    {searchQuery.trim() !== '' && (
                        <button onClick={(e) => handleReset(e)}>reset</button>
                    )}
                    <button type="submit" aria-label="Search button">
                        <Search />
                    </button>
                </div>
            </Wrapper>
        );
    };

    return (
        <>
            <CreateBtn />
            <PageTemplate page="flashcards" h1={'Decks'}>
                <SearchBar />
                {decks.length === 0 && (
                    <span style={{ gridColumn: 'span 2' }}>
                        Woah there, you've not created any decks 😅
                    </span>
                )}
                {decks.map((v, i) => {
                    if (searchQuery.trim() !== '') {
                        if (v['data']['title'].includes(searchQuery)) {
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
                        }
                    } else {
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
                    }
                })}
            </PageTemplate>
        </>
    );
};

export default FlashCardPage;
