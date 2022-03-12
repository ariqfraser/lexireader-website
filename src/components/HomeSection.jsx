import styled from '@emotion/styled';
import { BigButton } from './Buttons';
import * as Icon from '../assets/icons';

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
    return (
        <Wrapper>
            <div>
                <Container>
                    {props.screen === 'home' ? props.children : props.title}
                </Container>
                {props.screen === 'home' ? (
                    <div style={{ display: 'flex' }}>
                        <BigButton style={{ marginRight: 18 }}>
                            GITHUB <Icon.Github />
                        </BigButton>
                        <BigButton>
                            SIGN IN <Icon.Google />
                        </BigButton>
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </Wrapper>
    );
};

export default HomeSection;
