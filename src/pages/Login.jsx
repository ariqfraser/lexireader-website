import React, { useRef, useLayoutEffect, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';

import Nav from '../components/Nav';
import Carousell from '../components/Carousell';
import HomeSection from '../components/HomeSection';
import { BigButton } from '../components/Buttons';
import * as Icon from '../assets/icons';
import LoginWrapper from '../components/LoginWrapper';
import axios from 'axios';
import { signInWithGoogle } from '../utils/signIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/init-firebase';

const Login = () => {
    const user = useRef();
    const pass = useRef();
    const [userState] = useAuthState(auth);
    const handleSubmit = () => {
        console.log({ user: user, pass: pass });
    };

    useEffect(() => {
        console.log(userState);
    }, [userState]);
    return (
        <>
            <Nav screen={'home'} />
            <PageWrapper>
                <HomeSection
                    screen={'login'}
                    title={
                        <h1>
                            <span>log</span>in
                        </h1>
                    }
                >
                    <LoginWrapper>
                        <input
                            type={'text'}
                            ref={user}
                            placeholder="username / email"
                        />
                        <input
                            type={'password'}
                            ref={pass}
                            placeholder="password"
                        />
                        <BigButton onClick={() => handleSubmit()}>
                            LOG IN <Icon.Play />
                        </BigButton>
                        <BigButton onClick={() => signInWithGoogle()}>
                            GOOGLE <Icon.Google />
                        </BigButton>
                    </LoginWrapper>
                </HomeSection>
                <Carousell />
            </PageWrapper>
        </>
    );
};

export default Login;
