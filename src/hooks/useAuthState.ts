import { userAtom } from '@/atoms/user';
import { TokenStorage } from '@/utils/tokenStorage';
import { useRecoilValue } from 'recoil';

export const useAuthState = () => {
    const userAtomData = useRecoilValue(userAtom);
    const wasAuthenticated = localStorage.getItem('wasAuthenticated') === 'true';
    const hasValidToken = TokenStorage.getAccessToken();

    return {
        isLoggedIn: wasAuthenticated && hasValidToken,
        userId: userAtomData?.id || localStorage.getItem('lastUserId'),
    };
};
