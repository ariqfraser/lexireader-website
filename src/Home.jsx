import React from 'react';
import PageWrapper from './components/PageWrapper';
import styled from '@emotion/styled';
import { BigButton } from './components/Buttons';
import * as Icon from './assets/icons';
import Nav from './components/Nav';
import Carousell from './components/Carousell';

const Home = () => {
    return (
        <>
            <Nav screen={'home'} />
            <PageWrapper>
                <LeftSideText />
                <Carousell />
            </PageWrapper>
        </>
    );
};

const LeftSideText = () => {
    const Wrapper = styled('div')(() => ({
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '&>div>button': {
            marginTop: 14,
        },
    }));
    const Container = styled('div')(() => ({
        '&>h1,h2': {
            color: 'var(--b)',
            fontWeight: 500,
            padding: 0,
            margin: 0,
            '&>span': { color: 'var(--primary)' },
        },
        '&>h1': {
            fontSize: '1.25em',
        },
        '&>h2': {
            fontSize: '3.5em',
        },
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '5%',
            left: '-32px',
            height: '90%',
            width: 6,
            backgroundColor: 'var(--primary)',
        },
    }));
    return (
        <Wrapper>
            <div>
                <Container>
                    <h1>
                        <span>Lexi</span>Reader, a browser extension.
                    </h1>
                    <h2>
                        <span>learn</span> languages <br />
                        <span>anywhere</span> on the web.
                    </h2>
                </Container>
                <BigButton>
                    GITHUB <Icon.Github />
                </BigButton>
            </div>
        </Wrapper>
    );
};

export default Home;
