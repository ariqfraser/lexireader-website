import React from 'react';
import styled from '@emotion/styled';
import { Button } from './Buttons';
import { Link } from 'react-router-dom';
import { getAuthState } from '../lib/authState';
import { signInWithGoogle } from '../utils/signIn';
import { logout } from '../utils/logout';
import { useState } from 'react';

const Nav = ({ screen }) => {
    const Wrapper = styled('nav')(() => ({
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
        width: '90vw',
        alignItems: 'center',
        padding: '0 5vw',
        height: 75,
    }));

    const NavLink = styled(Link)(() => ({
        marginRight: 'auto',
        fontWeight: 600,
        fontSize: '1.25em',
        textDecoration: 'none',
        color: 'var(--b)',
        transition: '200ms ease-in-out',
        '&>span': { transition: 'inherit' },
        '&:hover': {
            '&>span': { color: 'var(--primary)' },
        },
    }));

    const [userState] = getAuthState();
    return (
        <Wrapper>
            <NavLink to="/">
                <span>Lexi</span>Reader
            </NavLink>
            {userState ? (
                <>
                    hello, {userState.displayName}
                    <Button
                        className="navButton"
                        isType="outlined"
                        bg="white"
                        textColor="#fafafa"
                        onClick={() => logout()}
                        style={{ marginLeft: 8 }}
                    >
                        logout
                    </Button>
                </>
            ) : (
                <Button
                    className="navButton"
                    isType="outlined"
                    bg="white"
                    textColor="#fafafa"
                    onClick={signInWithGoogle}
                >
                    sign in with Google
                </Button>
            )}
        </Wrapper>
    );
};

export default Nav;
