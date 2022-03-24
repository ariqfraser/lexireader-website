import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/init-firebase';

export const getAuthState = () => {
    const userState = useAuthState(auth);
    return userState;
};
