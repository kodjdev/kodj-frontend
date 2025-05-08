import { ReactNode } from 'react';
import Modal, { Sizes } from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

export type InfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string | ReactNode;
    buttonLabel?: string;
    size?: Sizes;
};

/**
 * ConfirmModal - Organism Component
 * A specialized modal for confirmation dialogs with customizable buttons.
 * @param {boolean} isOpen - Controls the visibility of the modal
 * @param {function} onClose - Callback function to be called when modal is closed
 * @param {string} [title='Information'] - Title to display in the modal header
 * @param {string|ReactNode} message - Message content to display in the modal body
 * @param {string} [buttonLabel='Got it'] - Text for the action button
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [size='sm'] - Controls the width of the modal
 */
export default function InfoModal({
    isOpen,
    onClose,
    title = 'Information',
    message,
    buttonLabel = 'Got it',
    size = 'sm',
}: InfoModalProps) {
    const footer = (
        <Button variant="primary" onClick={onClose}>
            {buttonLabel}
        </Button>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size={size} footer={footer} footerAlign="center">
            {typeof message === 'string' ? <p>{message}</p> : message}
        </Modal>
    );
}
