import styled from '@emotion/styled';
import { BigButton } from './Buttons';
import * as Icon from '../assets/icons';
import { signInWithGoogle } from '../utils/signIn';
import { getAuthState } from '../lib/authState';
import { Link } from 'react-router-dom';

const HomeSection = (props) => {
    const Wrapper = styled('div')(() => ({
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '&>div>div>button': {
            marginTop: 14,
        },
    }));
    const Container = styled('div')(() => ({
        '&>h1,h2': {
            color: 'var(--b)',
            fontWeight: 500,
            padding: 0,
            margin: 0,
            '&>span': { color: 'var(--primary)' },
        },
        '&>h1': {
            fontSize: props.screen === 'home' ? '1.25em' : '3.5em',
        },
        '&>h2': {
            fontSize: '3.5em',
        },
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '5%',
            left: '-32px',
            height: '90%',
            width: 6,
            backgroundColor: 'var(--primary)',
        },
    }));

    const [userState] = getAuthState();

    return (
        <Wrapper>
            <div>
                <Container>
                    {props.screen === 'home' ? props.children : props.title}
                </Container>
                {props.screen === 'home' ? (
                    <>
                        {/* <BigButton style={{ marginRight: 18 }}>
                            <Icon.Github />
                            VIEW ON GITHUB
                        </BigButton> */}
                        {userState ? (
                            <Link to="/u/">
                                <BigButton>OPEN DASHBOARD</BigButton>
                            </Link>
                        ) : (
                            <BigButton onClick={signInWithGoogle}>
                                <Icon.Google />
                                SIGN IN
                            </BigButton>
                        )}
                    </>
                ) : (
                    props.children
                )}
            </div>
        </Wrapper>
    );
};

export default HomeSection;
