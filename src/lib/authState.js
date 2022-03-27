import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/init-firebase';

export const getAuthState = () => {
    return useAuthState(auth);
};
