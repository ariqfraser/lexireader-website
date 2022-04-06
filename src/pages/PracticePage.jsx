import {
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    increment,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Footer, SubTitle } from '../components/Box';
import PageTemplate from '../components/PageTemplate';
import { getAuthState } from '../lib/authState';
import { db } from '../lib/init-firebase';
import styled from '@emotion/styled';

const NextButton = styled('button')(() => ({
    userSelect: 'none',
    cursor: 'pointer',
    backgroundColor: 'var(--g)',
    padding: 16,
    fontSize: 24,
    border: 'none',
    borderRadius: 8,
    gridColumnStart: 2,
}));

const PracticePage = () => {
    const deckRefParam = useParams()['deckRef'];
    const [userState] = getAuthState();
    const navigate = useNavigate();
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardCount, setCardCount] = useState(0);
    const [practiceCount, setPracticeCount] = useState(0);
    if (!userState) navigate('/');
    useEffect(() => {
        async function getDeck() {
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
                .then((deckData) => {
                    // process data
                    console.log('deck', '=>', deckData); // show data
                    setDeck([deckData]);
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
                            // console.log('cards', '=>', cardArr); // show data
                            setCards(cardArr);
                            setCardCount(cardArr.length);
                        })
                        .catch((err) => console.log(err));
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

        if (userState) getDeck();
    }, [userState]);

    const [question, setQuestion] = useState([]);
    useEffect(() => {
        console.log('cards', '=>', cards);

        function startGame() {
            const startCard = Math.floor(Math.random() * cards.length),
                card = cards[startCard],
                startOn = Math.floor(Math.random() * 2),
                q = startOn === 0 ? card['sideA'] : card['sideB'],
                ans = startOn === 0 ? card['sideB'] : card['sideA'],
                id = card['id'];
            setQuestion([
                q,
                ans,
                id,
                startOn,
                card['correctCount'],
                card['failCount'],
            ]);
        }

        if (cards.length > 0) startGame();
    }, [cards]);

    useEffect(() => {
        if (question.length > 0) console.log(question);
    }, [question]);

    const [showAns, setShowAns] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    // handles answer button clicks
    async function ansClick(ans, e) {
        console.log('cards', '=>', cards);
        console.log('question', '=>', question);
        const deckRef = doc(db, 'decks', deckRefParam);
        const cardRef = doc(deckRef, 'cards', question[2]);

        if (showAns) return null;
        let cardsTempData = cards;

        if (ans === question[1]) {
            setIsCorrect(true);
            await updateDoc(cardRef, { correctCount: increment(1) });

            for (let i in cardsTempData) {
                if (cardsTempData[i]['id'] === question[2]) {
                    cardsTempData[i]['correctCount']++;
                    break;
                }
            }
        } else {
            setIsCorrect(false);
            e.currentTarget.style.backgroundColor = 'var(--r)';
            await updateDoc(cardRef, { failCount: increment(1) });
            for (let i in cardsTempData) {
                if (cardsTempData[i]['id'] === question[2]) {
                    cardsTempData[i]['failCount']++;
                    break;
                }
            }
        }

        const buttons = document.querySelectorAll('.ansBtn');
        for (let button of buttons) {
            button.disabled = true;
        }

        let totalPracticeCount = 0;
        for (let card of cardsTempData) {
            totalPracticeCount += card['correctCount'] + card['failCount'];
        }
        console.log('total deck prac count', totalPracticeCount);

        await setDoc(
            deckRef,
            { practiceCount: totalPracticeCount },
            { merge: true }
        ).catch(console.log);

        setCards(cardsTempData);
        setShowAns(true);
    }

    const AnswersWrapper = styled('div')(() => ({
        display: 'flex',
        justifyContent: 'center',
        gridColumn: 'span 2',
    }));

    const AnsButton = styled('button')(({ correct }) => ({
        margin: 4,
        fontSize: 18,
        padding: 12,
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: showAns
            ? correct === 'true'
                ? 'var(--g)'
                : 'rgb(240,240,240)'
            : 'rgb(200,200,200)',
    }));

    function nextQuestion() {
        const startCard = Math.floor(Math.random() * cards.length),
            card = cards[startCard],
            startOn = Math.floor(Math.random() * 2),
            q = startOn === 0 ? card['sideA'] : card['sideB'],
            ans = startOn === 0 ? card['sideB'] : card['sideA'],
            id = card['id'];
        setQuestion([
            q,
            ans,
            id,
            startOn,
            card['correctCount'],
            card['failCount'],
        ]);
        setIsCorrect(null);
        setShowAns(false);
    }

    return (
        <PageTemplate h1={'PRACTISE'}>
            <Box color="#fafafa" bg="#272727">
                <Footer></Footer>

                <p>{question[0]}</p>
            </Box>

            <Box
                color="#fafafa"
                bg={
                    isCorrect === null
                        ? '#272727'
                        : isCorrect === true
                        ? 'var(--g)'
                        : 'var(--r)'
                }
            >
                <Footer></Footer>

                <p>{showAns ? question[1] : '?'}</p>
                {showAns && (
                    <SubTitle>
                        correct: {question[4]}{' '}
                        {isCorrect === true && <span>+1</span>}
                        &nbsp;&nbsp;&nbsp;&nbsp;failed: {question[5]}{' '}
                        {isCorrect === false && <span>+1</span>}
                    </SubTitle>
                )}
            </Box>

            <AnswersWrapper>
                {cards.map((v, i) => {
                    let ans = '';
                    if (question[3] === 0) {
                        ans = v.sideB;
                    } else {
                        ans = v.sideA;
                    }
                    return (
                        <AnsButton
                            key={i}
                            onClick={(e) => ansClick(ans, e)}
                            className="ansBtn"
                            correct={ans === question[1] ? 'true' : 'false'}
                        >
                            {ans}
                        </AnsButton>
                    );
                })}
            </AnswersWrapper>

            {showAns && (
                <NextButton onClick={() => nextQuestion()}>Next</NextButton>
            )}
        </PageTemplate>
    );
};

export default PracticePage;
