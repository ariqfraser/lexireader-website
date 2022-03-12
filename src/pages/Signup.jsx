import React, { useRef, useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';

import Nav from '../components/Nav';
import Carousell from '../components/Carousell';
import HomeSection from '../components/HomeSection';
import { BigButton } from '../components/Buttons';
import * as Icon from '../assets/icons';

import { regex } from '../utils/regex';
import axios from 'axios';
import LoginWrapper from '../components/LoginWrapper';

const Signup = () => {
    const user = useRef();
    const pass = useRef();
    const passC = useRef();
    const email = useRef();
    const [errEmail, setErrEmail] = useState('');
    const [errUser, setErrUser] = useState('');
    const [errPass, setErrPass] = useState('');

    const isValid = (user, email, pass, passC) => {
        let valid = true;
        if (user.trim() === null || user.trim() === '') {
            setErrUser('Username field MUST NOT be left blank. ');
            valid = false;
        } else if (user.trim().length < 4) {
            setErrUser('Username has to be at least 4 characters');
            valid = false;
        }

        if (!email.trim().match(regex.email)) {
            setErrEmail('Enter a valid email.');
            valid = false;
        }

        if (!pass) {
            setErrPass('Password is blank!');
            valid = false;
        } else if (pass !== passC) {
            setErrPass('Passwords do not match');
        }
        console.log('isValid?', valid);
        return valid;
    };

    const handleSubmit = () => {
        setErrEmail('');
        setErrUser('');
        setErrPass('');
        if (
            isValid(
                user.current.value,
                email.current.value,
                pass.current.value,
                passC.current.value
            ) === false
        )
            return null;

        alert('logged in');
    };

    useEffect(() => {
        console.log('1');

        return () => {
            console.log('2');
        };
    }, []);

    return (
        <>
            <Nav screen={'home'} />
            <PageWrapper>
                <HomeSection
                    screen={'signin'}
                    title={
                        <h1>
                            <span>sign</span> up
                        </h1>
                    }
                >
                    <LoginWrapper>
                        {errUser}
                        <input
                            type={'text'}
                            ref={user}
                            placeholder="username"
                        />
                        {errEmail}
                        <input type={'text'} ref={email} placeholder="email" />
                        {errPass}
                        <input
                            type={'password'}
                            ref={pass}
                            placeholder="password"
                        />
                        <input
                            type={'password'}
                            ref={passC}
                            placeholder="confirm password"
                        />
                        <BigButton onClick={() => handleSubmit()}>
                            LOG IN <Icon.Github />
                        </BigButton>
                    </LoginWrapper>
                </HomeSection>
                <Carousell />
            </PageWrapper>
        </>
    );
};

export default Signup;
