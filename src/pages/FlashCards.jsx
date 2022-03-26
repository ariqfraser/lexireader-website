import { useEffect } from 'react';
import styled from '@emotion/styled';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import MainNav from '../components/MainNav';

const FlashCardPage = () => {
    const Wrapper = styled('div')(() => ({}));

    useEffect(() => {
        // const usersRef = collection(db, 'cards');
        // getDocs(usersRef)
        //     .then((res) => {
        //         console.log(res);
        //         const docs = res.docs.map((v) => ({
        //             data: v.data(),
        //             id: v.id,
        //         }));
        //         console.log(docs);
        //     })
        //     .catch((err) => console.log(err.message));
    }, []);
    return (
        <>
            <MainNav active="flashcards" />
            <Wrapper>
                <div></div>
            </Wrapper>
        </>
    );
};

export default FlashCardPage;
