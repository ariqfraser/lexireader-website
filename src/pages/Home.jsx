import { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';

import Nav from '../components/Nav';
import Carousell from '../components/Carousell';
import HomeSection from '../components/HomeSection';
import { getAuthState } from '../lib/authState';
import { auth } from '../lib/init-firebase';

const Home = () => {
    const [userState] = getAuthState();

    useEffect(() => {
        if (userState) console.log(userState);
    }, [userState]);

    useEffect(() => {}, []);

    return (
        <>
            <Nav screen={'home'} />
            <PageWrapper>
                <HomeSection screen={'home'}>
                    <h1>
                        <span>Lexi</span>Reader, a browser extension.
                    </h1>
                    <h2>
                        <span>learn</span> languages <br />
                        <span>anywhere</span> on the web.
                    </h2>
                </HomeSection>
                <Carousell />
            </PageWrapper>
        </>
    );
};

export default Home;
