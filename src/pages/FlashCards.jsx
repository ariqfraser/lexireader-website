import { useEffect } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import PageTemplate from '../components/PageTemplate';
import SearchBar from '../components/SearchBar';
import { Add } from '../assets/icons';

const Box = styled('div')(({ bg, color }) => ({
    minWidth: '120px',
    minHeight: '120px',
    backgroundColor: bg,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 16,
    color: color,
    fontWeight: 'bold',
    fontSize: '2em',
    cursor: 'pointer',
    '&>p': {
        margin: 0,
        padding: 0,
        textTransform: 'uppercase',
    },
}));

const Title = styled('small')(() => ({
    textTransform: 'uppercase',
    color: 'var(--w)',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 12,
    top: 16,
    left: 16,
}));

const Footer = styled('small')(() => ({
    textTransform: 'lowercase',
    color: 'var(--w)',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 12,
    bottom: 6,
    left: '50%',
    transform: 'translateX(-50%)',
}));

const SubTitle = styled('small')(() => ({
    fontSize: 12,
    textTransform: 'lowercase',
}));

const CreateBtn = () => {
    const Button = styled('button')(() => ({
        width: 52,
        height: 52,
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
        },
        '&>span': {
            margin: '0 4px',
            color: '#272727',
            textTransform: 'uppercase',
            fontWeight: 900,
            display: 'none',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover> span': {
            display: 'block',
        },
        '&:hover> svg': {
            display: 'none',
        },
        '&:hover': {
            width: 220,
        },
    }));

    function handleClick() {}

    return (
        <Button aria-label="Create a new deck" onClick={() => handleClick}>
            <span id={'createDeckText'}>Create new deck</span> <Add />
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
