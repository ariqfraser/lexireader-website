import styled from '@emotion/styled';

export const Box = styled('div')(({ bg, color }) => ({
    minWidth: '120px',
    minHeight: '120px',
    backgroundColor: bg,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 16,
    color: color,
    fontWeight: 'bold',
    cursor: 'pointer',
    '&>p': {
        fontSize: '100%',
        margin: 0,
        padding: 0,
        textTransform: 'uppercase',
    },
    filter: 'var(--shadow)',
}));

export const Title = styled('small')((color) => ({
    textTransform: 'uppercase',
    color: color,
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 12,
    top: 16,
    left: 16,
}));

export const Footer = styled('small')(() => ({
    textTransform: 'lowercase',
    color: 'var(--w)',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 12,
    bottom: 6,
    left: '50%',
    transform: 'translateX(-50%)',
}));

export const SubTitle = styled('small')(() => ({
    fontSize: 12,
    textTransform: 'lowercase',
}));

export const StatText = styled('span')({
    fontSize: '5em',
    color: 'var(--primary)',
});
