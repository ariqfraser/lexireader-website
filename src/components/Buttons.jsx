import styled from '@emotion/styled';

export const BigButton = styled('button')(() => ({
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    borderRadius: '5px',
    fontSize: '1.75em',
    fontWeight: 800,
    color: 'var(--w)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&>svg': {
        fill: 'var(--w)',
        height: '35px',
        marginLeft: 14,
    },
    transition: '200ms ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'var(--b)',
    },
}));

export const Button = styled('button')(({ bg, isType, textColor }) => ({
    padding: '10px 24px',
    backgroundColor:
        isType === 'outlined' ? 'transparent' : bg === 'white' && 'var(--w)',
    borderRadius: '5px',
    fontSize: '1em',
    fontWeight: 600,
    color: textColor,
    border:
        isType === 'outlined'
            ? `2px solid ${bg === 'white' && 'var(--w)'}`
            : 'none',
    display: 'flex',
    alignItems: 'center',
    transition: '200ms ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        // backgroundColor: 'var(--b)',
    },
}));
