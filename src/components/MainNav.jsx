import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import * as Icon from '../assets/icons';
import { logout } from '../utils/logout';

const MainNav = ({ active = '' }) => {
    const Wrapper = styled('div')(() => ({
        position: 'fixed',
        bottom: '4vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
    }));
    const Container = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        padding: '24px 24px',
        borderRadius: '100px',
        '&>a>button, >button': {
            margin: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&>svg': {
                height: 32,
            },
        },
        backgroundColor: 'var(--w)',
        filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.2))',
    }));
    return (
        <Wrapper>
            <Container>
                <Link to="/fc">
                    <button>
                        <Icon.Flashcard />
                    </button>
                </Link>
                <Link to="/u">
                    <button>
                        <Icon.Heart />
                    </button>
                </Link>
                <Link to="/u">
                    <button>
                        <Icon.User />
                    </button>
                </Link>

                <button onClick={logout}>
                    <Icon.Logout />
                </button>
            </Container>
        </Wrapper>
    );
};

export default MainNav;
