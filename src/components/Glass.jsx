import React from 'react';
import styled from '@emotion/styled';
const Glass = (props) => {
    const Wrapper = styled('div')(() => ({
        background: 'rgba(255, 255, 255, 0.22)',
        borderRadius: 16,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(3.6px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '60%',
        height: 300,
        padding: 16,
    }));
    return <Wrapper>{props.children}</Wrapper>;
};

export default Glass;
