import React from 'react';
import styled from '@emotion/styled';
import { Button } from './Buttons';

const Nav = ({ screen }) => {
    const Wrapper = styled('nav')(() => ({
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
        width: '90vw',
        alignItems: 'center',
        '&>h3': {
            marginRight: 'auto',
        },
        padding: '0 5vw',
    }));
    return (
        <Wrapper>
            <h3>
                <span>Lexi</span>Reader
            </h3>
        </Wrapper>
    );
};

export default Nav;
