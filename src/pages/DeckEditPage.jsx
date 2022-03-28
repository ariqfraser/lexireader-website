import { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { Box, SubTitle, Footer, Title, StatText } from '../components/Box';
import styled from '@emotion/styled';
import AWN from 'awesome-notifications';
import {
    query,
    getDoc,
    where,
    doc,
    getDocs,
    collectionGroup,
    collection,
    setDoc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { getAuthState } from '../lib/authState';

const DeckSettingsBox = styled('form')(({ col }) => ({
    backgroundColor: 'var(--w)',
    padding: 16,
    display: 'grid',
    gridTemplateColumns: col ? `repeat(${col}, 1fr)` : '1fr 1fr',
    gap: 4,
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
        gridColumn: col ? `span ${col}` : `span 2`,
        padding: '8px 0',
    },
    filter: 'var(--shadow)',
    gridColumn: 'span 2',
}));

const CardList = styled('div')(() => ({
    display: 'grid',
    backgroundColor: 'var(--w)',
    gridTemplateColumns: '1fr 1fr 50px',
    gridColumn: 'span 2',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    filter: 'var(--shadow)',
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
    gridColumn: 'span 4',
    margin: '4px 0',
}));

const FormSaveButton = styled('button')(() => ({
    gridColumn: 'span 2',
    backgroundColor: 'var(--g)',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 16,
    padding: 4,
    marginTop: 4,
    fontWeight: 900,
}));

const FormDeleteButton = styled('button')(() => ({
    backgroundColor: 'var(--r)',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 16,
    padding: 4,
    marginTop: 4,
    fontWeight: 900,
}));

const EditCardModal = (props) => {
    const Overlay = styled('div')(() => ({
        position: 'fixed',
        width: '100vh',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
    }));

    const Modal = styled('div')(() => ({
        width: '80vw',
        padding: 16,
        backgroundColor: 'var(--w)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 16,
        '&>button': {
            gridColumn: 'span 1',
        },
        position: 'relative',
        borderRadius: 16,
        '&>#closeBtn': {
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            border: '2px solid var(--r)',
            cursor: 'pointer',
            borderRadius: 16,
            padding: 4,
            marginTop: 4,
            fontWeight: 900,
            gridColumnStart: 3,
        },
    }));

    return (
        <Overlay>
            <Modal onSubmit={(e) => e.preventDefault()}>{props.children}</Modal>
        </Overlay>
    );
};

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

    const formSaveRef = useRef();
    const formAddRef = useRef();

    useEffect(() => {
        // check if creating a new deck
        if (!isNew.get('isNew')) {
            // query db and set states
            console.log('attempting to get data');

            async function getDeckData() {
                const deckRef = doc(db, 'decks', deckRefParam);
                const cardsRef = collection(deckRef, 'cards');
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
                        const cardsQuery = query(cardsRef);
                        getDocs(cardsQuery)
                            .then((data) => {
                                console.log(data);
                                return data.docs.map((v) => {
                                    setPracticeCount(
                                        practiceCount +
                                            v.data()['correctCount'] +
                                            v.data()['failCount']
                                    );
                                    return {
                                        sideA: v.data()['sideA'],
                                        sideB: v.data()['sideB'],
                                        correctCount: v.data()['correctCount'],
                                        failCount: v.data()['failCount'],
                                        id: v.id,
                                    };
                                });
                            })
                            .then((cardArr) => {
                                setCards(cardArr);
                                setCardCount(cardArr.length);
                            });
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

    useEffect(() => {
        async function saveNewTitle(e) {
            e.preventDefault();
            const newTitle = {
                title: formSaveRef.current['title']['value'],
            };
            setTitle(newTitle.title);

            if (!isNew.get('isNew')) {
                const docRef = doc(db, 'decks', deckRefParam);
                await setDoc(docRef, newTitle, { merge: true });
            }
        }

        async function addCard(e) {
            e.preventDefault();

            const newCard = {
                correctCount: 0,
                deckRef: deckRefParam,
                failCount: 0,
                sideA: formAddRef.current['sideA'].value,
                sideB: formAddRef.current['sideB'].value,
            };

            if (newCard.sideA.trim() !== '' || newCard.sideB.trim() !== '') {
                const docRef = doc(db, 'decks', deckRefParam);
                const cardsRef = collection(docRef, 'cards');
                await addDoc(cardsRef, newCard).then(() => {
                    setCards(() => [...cards, newCard]);
                    setCardCount(cards.length);
                });
            } else {
                alert('Add card fields cannot be blank');
                return null;
            }
        }

        if (formSaveRef.current)
            formSaveRef.current.addEventListener('submit', saveNewTitle, true);

        if (formAddRef.current)
            formAddRef.current.addEventListener('submit', addCard, true);
    }, [mode]);

    const [modal, setModal] = useState(false);
    const aRef = useRef();
    const bRef = useRef();
    const idRef = useRef();
    const arrIndexRef = useRef();

    async function deleteCard(e, id, i) {
        e.preventDefault();

        const idVal = id;

        const docRef = doc(db, 'decks', deckRefParam);
        const cardRef = doc(docRef, 'cards', idVal);
        await deleteDoc(cardRef).catch(console.log);
        console.log('deleted card');
        let tempArr = cards;
        tempArr.splice(i, 1);
        setCards(tempArr);
        setModal(false);
    }

    async function updateCard(e) {
        e.preventDefault();
        const aVal = aRef.current.value;
        const bVal = bRef.current.value;
        const idVal = idRef.current.value;

        // update db
        const docRef = doc(db, 'decks', deckRefParam);
        const cardRef = doc(docRef, 'cards', idVal);
        await setDoc(
            cardRef,
            {
                sideA: aVal,
                sideB: bVal,
            },
            { merge: true }
        ).then(console.log('updated card'));

        // update cards state to resembe db without another query
        const newData = {
            sideA: aVal,
            sideB: bVal,
            correctCount: cards[arrIndexRef.current.value]['correctCount'],
            failCount: cards[arrIndexRef.current.value]['failCount'],
            id: idVal,
        };
        let cardArr = cards;
        cardArr[arrIndexRef.current.value] = newData;
        console.log('newData', '=', newData);
        console.log('cardArr', '=', cardArr);
    }

    async function showModal(sideA, sideB, cardID, arrIndex) {
        await setModal(true);
        aRef.current.value = sideA;
        bRef.current.value = sideB;
        idRef.current.value = cardID;
        arrIndexRef.current.value = arrIndex;
    }

    const deleteTitleRef = useRef();
    async function deleteDeck(inTitle) {
        console.log(inTitle);
        if (inTitle !== title) {
            alert('title does not match');
            return null;
        }
        await deleteDoc(doc(db, 'decks', deckRefParam));
        console.log('deleted deck', title);
        navigate('/fc');
    }
    return (
        <>
            {/* {JSON.stringify(cards)} */}

            <PageTemplate page={'flashcards'}>
                {modal && (
                    <EditCardModal>
                        <span>SideA</span>
                        <span>SideB</span>
                        <FormSaveButton
                            onClick={(e) => {
                                updateCard(e);
                            }}
                        >
                            SAVE
                        </FormSaveButton>
                        <input type="text" ref={aRef} />
                        <input type="text" ref={bRef} />
                        <input type="hidden" ref={idRef} />
                        <input type="hidden" ref={arrIndexRef} />
                        {/* <FormDeleteButton onClick={(e) => deleteCard(e)}>
                            DELETE
                        </FormDeleteButton> */}
                        <button
                            id={'closeBtn'}
                            onClick={(e) => {
                                e.preventDefault();
                                setModal(false);
                            }}
                        >
                            close
                        </button>
                    </EditCardModal>
                )}
                {mode === 'edit' && (
                    <>
                        <DeckSettingsBox ref={formSaveRef}>
                            <small>Deck Settings</small>
                            deck title
                            <input
                                type="text"
                                defaultValue={title}
                                name="title"
                            />
                            {/* deck color
                                <div>buttons go here</div> */}
                            <FormSaveButton>SAVE</FormSaveButton>
                        </DeckSettingsBox>
                        <DeckSettingsBox onSubmit={(e) => e.preventDefault()}>
                            <small>delete deck</small>

                            <input
                                type="text"
                                placeholder="TYPE DECK TITLE"
                                ref={deleteTitleRef}
                            />

                            <FormDeleteButton
                                onClick={() =>
                                    deleteDeck(deleteTitleRef.current.value)
                                }
                            >
                                DELETE DECK
                            </FormDeleteButton>
                        </DeckSettingsBox>
                        <DeckSettingsBox ref={formAddRef}>
                            <small>ADD CARD</small>
                            Side A (e.g. a word)
                            <input type="text" name={'sideA'} />
                            Side B (e.g. the meaning)
                            <input type="text" name={'sideB'} />
                            <FormSaveButton>Add Card</FormSaveButton>
                        </DeckSettingsBox>
                        <DeckSettingsBox col={4}>
                            <small>cards in the deck {cardCount}</small>
                        </DeckSettingsBox>
                        <CardList>
                            {cards.map((v, i) => {
                                return (
                                    <Fragment>
                                        <span key={'a' + i}>{v.sideA}</span>
                                        <span key={'b' + i}>{v.sideB}</span>
                                        <button
                                            onClick={() =>
                                                showModal(
                                                    v.sideA,
                                                    v.sideB,
                                                    v.id,
                                                    i
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                deleteCard(e, v.id, i)
                                            }
                                        >
                                            delete
                                        </button>

                                        <Spacer />
                                    </Fragment>
                                );
                            })}
                        </CardList>

                        <div style={{ padding: 100 }}></div>
                        <ActionWrapper>
                            <ActionButton onClick={() => setMode('view')}>
                                done
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
                        <DeckSettingsBox
                            col={4}
                            style={{ gridTemplateColumns: '1fr 1fr 50px 50px' }}
                        >
                            <small>cards in the deck</small>
                            {cards.map((card, i) => {
                                return (
                                    <Fragment key={'f' + i}>
                                        <Spacer key={'s' + i} />
                                        <span key={'a' + i}>{card.sideA}</span>
                                        <span key={'b' + i}>{card.sideB}</span>
                                        <span
                                            key={'count' + i}
                                            style={{ color: 'var(--g)' }}
                                        >
                                            {card.correctCount}
                                        </span>
                                        <span
                                            key={'fail' + i}
                                            style={{ color: 'var(--r)' }}
                                        >
                                            {card.failCount}
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
