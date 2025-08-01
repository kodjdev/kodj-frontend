import { atom } from 'recoil';

export const userAtom = atom<{
    id: string;
    username: string;
    firstName: string;
}>({
    key: 'userAtom',
    default: {
        id: '',
        username: '',
        firstName: '',
    },
});
