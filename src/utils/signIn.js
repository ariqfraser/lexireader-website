import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore';
import { auth, db } from '../lib/init-firebase';

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            // console.log('logged in', user, token);

            return user;
        })
        .then((user) => {
            console.log(user.email);
            const userRef = collection(db, 'users');
            const q = query(userRef, where('email', '==', user.email));
            getDocs(q).then((res) => {
                // if new user then add to db, else do nothing
                if (res.docs.length === 0) {
                    console.log('new user');
                    const newUserData = {
                        email: user.email,
                        username: user.displayName,
                        joinDate: new Date(),
                        decks: [],
                        wordCount: 0,
                        practiceCount: 0,
                    };
                    addDoc(userRef, newUserData);
                } else {
                    console.log('Existing User');
                }
                window.location.href = '/u/';
            });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode, errorMessage, email, credential);
        });
};
