import { signOut } from 'firebase/auth';
import { auth } from '../lib/init-firebase';

export const logout = () => {
    console.log('attempting logout');
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.');
        })
        .catch((error) => {
            // An error happened.
            console.log(error.message);
        });
};
