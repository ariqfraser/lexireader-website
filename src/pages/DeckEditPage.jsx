import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { Box, SubTitle, Footer, Title, StatText } from '../components/Box';
import styled from '@emotion/styled';
import {
    query,
    getDoc,
    where,
    doc,
    getDocs,
    collectionGroup,
} from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { getAuthState } from '../lib/authState';

const DeckSettingsBox = styled('div')(({ col }) => ({
    backgroundColor: 'var(--w)',
    padding: 16,
    display: 'grid',
    gridTemplateColumns: col ? `repeat(${col}, 1fr)` : '1fr 1fr',
    gap: 2,
    position: 'relative',
    borderRadius: 16,
    color: 'var(--b)',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&>small': {
        textTransform: 'uppercase',
        color: 'var(--b)',
        fontWeight: 'bold',
        fontSize: 12,
        gridColumn: `span ${col || 2}`,
        padding: '8px 0',
    },
    filter: 'var(--shadow)',
    gridColumn: 'span 2',
}));

const ActionButton = styled('button')(({ bg }) => ({
    fontSize: '1.25em',
    borderRadius: 24,
    border: 'none',
    backgroundColor: bg || 'var(--g)',
    padding: '12px 24px',
    textTransform: 'uppercase',
    fontWeight: 900,
    cursor: 'pointer',
    margin: '0 24px',
}));

const ActionWrapper = styled('div')(() => ({
    position: 'fixed',
    display: 'flex',
    bottom: 120,
    left: '50%',
    transform: 'translateX(-50%)',
}));

const Spacer = styled('div')(() => ({
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    gridColumn: 'span 3',
    margin: '4px 0',
}));

const DeckEditPage = () => {
    const [deckRefParam] = useState(useParams()['deckRef']);
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const [practiceCount, setPracticeCount] = useState(0);
    const [cardCount, setCardCount] = useState(0);
    const [isNew] = useSearchParams();

    const [mode, setMode] = useState(!isNew.get('isNew') ? 'view' : 'edit');
    const [userState] = getAuthState();
    const navigate = useNavigate();

    if (!userState) navigate('/');

    useEffect(() => {
        // check if creating a new deck
        if (!isNew.get('isNew')) {
            // query db and set states
            console.log('attempting to get data');

            async function getDeckData() {
                const deckRef = doc(db, 'decks', deckRefParam);

                await getDoc(deckRef)
                    .then((snap) => {
                        // validation
                        if (!snap.exists()) throw new Error(469);
                        if (snap.data()['user'] !== userState['email'])
                            throw new Error(569);
                        // console.log(snap); // show snapshot
                        return snap.data();
                    })
                    .then((data) => {
                        // process data
                        // console.log(data); // show data
                        setTitle(data.title);
                        const cardsRef = query(
                            collectionGroup(db, 'cards'),
                            where('deckRef', '==', deckRefParam)
                        );
                        getDocs(cardsRef)
                            .then((data) => {
                                data.docs.forEach((doc) => {
                                    const card = doc.data();
                                    setCards(() => [
                                        ...cards,
                                        {
                                            sideA: card['sideA'],
                                            sideB: card['sideB'],
                                            correctCount: card['correctCount'],
                                            failCount: card['failCount'],
                                            id: doc.id,
                                        },
                                    ]);

                                    setPracticeCount(
                                        practiceCount +
                                            doc.data()['correctCount'] +
                                            doc.data()['failCount']
                                    );
                                });
                            })
                            .then(() => setCardCount(cards.length));
                    })

                    .catch((err) => {
                        switch (err.message) {
                            case '469':
                                alert(
                                    'deck does not exist! Go back and try again!'
                                );
                                break;
                            case '569':
                                alert('this does not belong to you 👮‍♂️');
                                navigate('/fc');
                                break;
                        }
                    });
            }
            if (userState) getDeckData();
        }
    }, [userState]);

    function handleSaveChanges() {
        setMode('view');
    }
    function handleCancelChanges() {
        setMode('view');
    }
    return (
        <>
            {/* {JSON.stringify(cards)} */}
            <PageTemplate page={'flashcards'}>
                {mode === 'edit' && (
                    <>
                        <DeckSettingsBox>
                            <small>Deck Settings</small>
                            deck title
                            <input type="text" defaultValue={title} />
                            deck color
                            <div>buttons go here</div>
                            <small>delete deck</small>
                            <input type="text" placeholder="TYPE DECK TITLE" />
                            <button>DELETE DECK</button>
                        </DeckSettingsBox>
                        <DeckSettingsBox>
                            <small>ADD CARD</small>
                            Side A (e.g. a word)
                            <input type="text" />
                            Side B (e.g. the meaning)
                            <input type="text" />
                            <button style={{ gridColumn: 'span 2' }}>
                                Add Card
                            </button>
                        </DeckSettingsBox>
                        <DeckSettingsBox col={3}>
                            <small>cards in the deck</small>

                            <input type="text" />
                            <input type="text" />
                            <button>delete card</button>
                        </DeckSettingsBox>
                        <div style={{ padding: 100 }}></div>
                        <ActionWrapper>
                            <ActionButton
                                onClick={() => handleCancelChanges()}
                                bg="red"
                            >
                                cancel
                            </ActionButton>
                            <ActionButton onClick={() => handleSaveChanges()}>
                                Save
                            </ActionButton>
                        </ActionWrapper>
                    </>
                )}

                {mode === 'view' && (
                    <>
                        <Box color="#fafafa" bg="#272727">
                            <Footer></Footer>

                            <p>{title}</p>
                            <SubTitle>
                                Cards: {cardCount}
                                &nbsp;&nbsp;&nbsp;&nbsp;Practiced:{' '}
                                {practiceCount}
                            </SubTitle>
                        </Box>
                        <Box color="var(--b)" bg="#fafafa">
                            <Title>Times Practiced</Title>

                            <StatText>{practiceCount}</StatText>
                        </Box>
                        <DeckSettingsBox col={3}>
                            <small>cards in the deck</small>
                            {cards.map((card, i) => {
                                return (
                                    <Fragment key={'f' + i}>
                                        <Spacer key={'s' + i} />
                                        <span key={'a' + i}>{card.sideA}</span>
                                        <span key={'b' + i}>{card.sideB}</span>
                                        <span key={'count' + i}>
                                            {card.correctCount}|{card.failCount}
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </DeckSettingsBox>
                        <ActionWrapper>
                            <ActionButton
                                onClick={() => setMode('edit')}
                                bg="orange"
                            >
                                Edit
                            </ActionButton>
                            <ActionButton>Practice</ActionButton>
                        </ActionWrapper>
                    </>
                )}
            </PageTemplate>
        </>
    );
};

export default DeckEditPage;
