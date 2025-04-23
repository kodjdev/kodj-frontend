import { ModalProps } from '@/components/ui/modal';
import { atom } from 'recoil';

export type ModalType = {
    id: string;
    type: 'logout' | 'confirm' | 'others';
    props: ModalProps;
};

export const isModalOpenAtom = atom<Array<ModalType>>({
    key: 'isModalOpenAtom',
    default: [],
});
