import { useEffect } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import MainNav from '../components/MainNav';
import PageTemplate from '../components/PageTemplate';
import SearchBar from '../components/SearchBar';

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

const FlashCardPage = () => {
    useEffect(() => {
        const usersRef = collection(db, 'cards');
        getDocs(usersRef)
            .then((res) => {
                console.log(res);
                const docs = res.docs.map((v) => ({
                    data: v.data(),
                    id: v.id,
                }));
                console.log(docs);
            })
            .catch((err) => console.log(err.message));
    }, []);

    const decks = [
        'spanish',
        'french',
        'indonesian',
        'spanish',
        'french',
        'indonesian',
        'spanish',
        'french',
        'indonesian',
        'spanish',
        'french',
        'indonesian',
        'spanish',
        'french',
        'indonesian',
    ];
    return (
        <PageTemplate page="flashcards">
            <SearchBar />
            <Box bg={'#272727'} color={'#fafafa'}>
                <p>spanish</p>
                <SubTitle>Cards: 0</SubTitle>
                <Footer>click to view</Footer>
            </Box>
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
    );
};

export default FlashCardPage;
