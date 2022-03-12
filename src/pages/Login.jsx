import React, { useRef } from 'react';
import PageWrapper from '../components/PageWrapper';

import Nav from '../components/Nav';
import Carousell from '../components/Carousell';
import HomeSection from '../components/HomeSection';
import { BigButton } from '../components/Buttons';
import * as Icon from '../assets/icons';
import LoginWrapper from '../components/LoginWrapper';
import axios from 'axios';

const Login = () => {
    const user = useRef();
    const pass = useRef();

    const handleSubmit = () => {
        console.log({ user: user, pass: pass });
    };
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
                        <input type={'text'} ref={user} />
                        <input type={'password'} ref={pass} />
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

export default Login;
