import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';
import { Search } from '../assets/icons';

const SearchBar = () => {
    const formRef = useRef();

    const Wrapper = styled('form')(() => ({
        gridColumn: '1 / span 2',
        width: '100%',
        position: 'relative',
        '&>input': {
            width: 'calc(100% - 32px)',
            padding: '8px 24px',
            borderRadius: 32,
            border: 'none',
        },
        '&>button': {
            position: 'absolute',
            height: '100%',
            top: 0,
            right: 0,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }));
    useEffect(() => {
        const handleSubmit = (e) => {
            e.preventDefault();
            alert('submit');
        };
        formRef.current.addEventListener('submit', handleSubmit, true);

        return () => {
            formRef.current.removeEventListener('submit', handleSubmit);
        };
    }, []);

    return (
        <Wrapper ref={formRef}>
            <input type="text" placeholder="Search deck title..." />
            <button type="submit" aria-label="Search button">
                <Search />
            </button>
        </Wrapper>
    );
};

export default SearchBar;
