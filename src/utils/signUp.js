import { regexp } from './regexp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/init-firebase';

export const signUp = (email, password) => {
    if (!email.match(new RegExp(regexp.email))) {
        console.log('invalid email');
        return null;
    }
    if (password.length === 0) {
        console.log('no password');
        return null;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
        });
};
