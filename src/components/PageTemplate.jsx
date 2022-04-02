import React from 'react';
import MainNav from './MainNav';
import logoImg from '../assets/iconW-128.png';
import styled from '@emotion/styled';
const Wrapper = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 42px 120px 42px',
}));

const PageTemplate = ({ children, page }) => {
    return (
        <>
            <div
                style={{
                    background: '#fafafa',
                    // background:
                    //     'linear-gradient(0deg, rgba(174,79,247,1) 0%, rgba(79,195,247,1) 50%)',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    zIndex: -10,
                }}
            ></div>
            <Wrapper>
                <div
                    style={{
                        gridColumn: '1 / span 2',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={logoImg}
                        alt={'lexireader logo'}
                        width="44"
                        style={{
                            filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.2))',
                            userSelect: 'none',
                        }}
                    />
                </div>
                {children}
            </Wrapper>
            <MainNav active={page} />
        </>
    );
};

export default PageTemplate;
