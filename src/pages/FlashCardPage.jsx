import { useEffect } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import PageTemplate from '../components/PageTemplate';
import SearchBar from '../components/SearchBar';
import { Add } from '../assets/icons';
import { Box, SubTitle, Footer } from '../components/Box';

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
    }, []);

    // const decks = [
    //     'spanish',
    //     'french',
    //     'indonesian',
    //     'spanish',
    //     'french',
    //     'indonesian',
    //     'spanish',
    //     'french',
    //     'indonesian',
    //     'spanish',
    //     'french',
    //     'indonesian',
    //     'spanish',
    //     'french',
    //     'indonesian',
    // ];

    const decks = [];
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
                        <Box bg={'#272727'} color={'#fafafa'}>
                            <p>{v}</p>
                            <SubTitle>Cards: 0</SubTitle>
                            <Footer>click to view</Footer>
                        </Box>
                    );
                })}
            </PageTemplate>
        </>
    );
};

export default FlashCardPage;
