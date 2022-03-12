import React from 'react';
import PageWrapper from '../components/PageWrapper';

import Nav from '../components/Nav';
import Carousell from '../components/Carousell';
import HomeSection from '../components/HomeSection';

const Home = () => {
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
