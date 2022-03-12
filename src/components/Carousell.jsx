import React from 'react';
import { Button } from './Buttons';
import styled from '@emotion/styled';
import Glass from './Glass';
import { Link } from 'react-router-dom';
const Carousell = () => {
    const Container = styled('div')(() => ({
        inset: 0,
        background: 'rgb(174,79,247)',
        background:
            'linear-gradient(0deg, rgba(174,79,247,1) 0%, rgba(79,195,247,1) 50%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const ActionWrap = styled('div')(() => ({
        display: 'flex',
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
    }));

    const Circle = styled('div')(({ top, left, size, bottom, right }) => ({
        width: size,
        height: size,
        backgroundColor: 'rgba(255,255,255,0.16)',
        borderRadius: '50%',
        userSelect: 'none',
        position: 'absolute',
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        zIndex: '- 1',
    }));
    return (
        <Container>
            <ActionWrap>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                        bg="white"
                        textColor="var(--w)"
                        isType="outlined"
                        style={{ marginRight: 32 }}
                    >
                        LOGIN
                    </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button bg="white" isType="fill" textColor="var(--primary)">
                        SIGN UP
                    </Button>
                </Link>
            </ActionWrap>
            <Circle top={40} left={20} size={200} />
            <Circle bottom={-200} left={-200} size={600} />
            <Circle right={-100} top={'10%'} size={400} />

            <Glass>Change me to some useful text!</Glass>
        </Container>
    );
};

export default Carousell;
