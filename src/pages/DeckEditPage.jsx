import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import { Box, SubTitle, Footer, Title, StatText } from '../components/Box';
import styled from '@emotion/styled';

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
    gridColumn: 'span 2',
    margin: '4px 0',
}));

const DeckEditPage = () => {
    const [title, setTitle] = useState(useParams()['title']);
    const [cards, setCards] = useState([]);
    const [practiced, setPracticed] = useState(0);
    const [isNew] = useSearchParams();

    const [mode, setMode] = useState(!isNew.get('isNew') ? 'view' : 'edit');

    // check if creating a new deck
    if (!isNew.get('isNew')) {
        // query db and set states
        console.log('attempting to get data');

        async function getDeckData() {}
        getDeckData();
    }

    function handleSaveChanges() {
        setMode('view');
    }
    function handleCancelChanges() {
        setMode('view');
    }
    return (
        <>
            <PageTemplate page={'flashcards'}>
                {mode === 'edit' && (
                    <>
                        <DeckSettingsBox>
                            <small>Deck Settings</small>
                            <small></small>
                            deck title
                            <input type="text" value={title} />
                            deck color
                            <div>buttons go here</div>
                            <small></small>
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
                                Cards: 0&nbsp;&nbsp;&nbsp;&nbsp;Practiced: 0
                            </SubTitle>
                        </Box>
                        <Box color="var(--b)" bg="#fafafa">
                            <Title>Times Practiced</Title>

                            <StatText>{practiced}</StatText>
                        </Box>
                        <DeckSettingsBox col={2}>
                            <small>cards in the deck</small>

                            <span>side A</span>
                            <span>side B</span>
                            <Spacer />
                            <span>Ellos</span>
                            <span>They</span>
                            <Spacer />
                            <span>como</span>
                            <span>as</span>
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
