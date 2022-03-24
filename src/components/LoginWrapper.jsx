import React from 'react';
import styled from '@emotion/styled';
const LoginWrapper = styled('div')(() => ({
    display: 'grid',
    gridTemplateColumns: '100%',
    gap: 4,
    '&>input': {
        fontSize: '1.25em',
        borderRadius: '1em',
        border: '3px solid var(--primary)',
        padding: '0.25em 0.5em',
    },
    marginTop: 16,
}));

export default LoginWrapper;
