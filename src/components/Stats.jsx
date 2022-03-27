import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    margin: '24px 0 24px 0',
}));

const Container = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    '&>span': {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        '&>span': {
            color: 'var(--primary)',
            fontSize: '5em',
        },
    },
    padding: 16,
    backgroundColor: 'var(--w)',
    filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))',
    borderRadius: 16,
}));

const Stats = ({
    joinDate = '',
    wordCount = 0,
    practiceCount = 0,
    deckCount = 0,
    username = '',
}) => {
    return (
        <Wrapper>
            <Container>
                <span>IMG GOES HERE</span>
                <span>Saved Words</span>
                <span>Decks</span>
                <span>Times Practiced</span>
                <span>
                    {username}
                    <br />
                    Join Date: {joinDate}
                </span>
                <span>
                    <span>{wordCount}</span>
                </span>
                <span>
                    <span>{deckCount}</span>
                </span>
                <span>
                    <span>{practiceCount}</span>
                </span>
            </Container>
        </Wrapper>
    );
};

export default Stats;
