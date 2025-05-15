import { ReactNode } from 'react';
import styled from 'styled-components';
import Modal, { Sizes } from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import themeColors from '@/tools/themeColors';

const MessageContainer = styled.div`
    text-align: left;
    margin-bottom: ${themeColors.spacing.sm};
`;

const Message = styled.p`
    margin: 0;
    padding-left: 20px;
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;
/**
 * ConfirmModal - Organism Component
 * A specialized modal for confirmation dialogs with customizable buttons.
 * @param {boolean} isOpen - Controls the visibility of the modal
 * @param {function} onClose - Callback function to be called when modal is closed
 * @param {string} [title='Confirm Logout'] - Title to display in the modal header
 * @param {string|ReactNode} message - Message content to display in the modal body
 * @param {function} onConfirm - Callback function to be called when confirm button is clicked
 * @param {string} [confirmLabel='Logout'] - Text for the confirmation button
 * @param {string} [cancelLabel='Cancel'] - Text for the cancel button
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [size='sm'] - Controls the width of the modal
 */
export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string | ReactNode;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'primary' | 'secondary' | 'danger';
    size?: Sizes;
};

export default function ConfirmModal({
    isOpen,
    onClose,
    title = 'Confirm Logout',
    message,
    onConfirm,
    confirmLabel = 'Logout',
    cancelLabel = 'Cancel',
    size = 'sm',
}: ConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const styledMessage = (
        <MessageContainer>
            <Message>{typeof message === 'string' ? message : message}</Message>
        </MessageContainer>
    );

    const footer = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'right',
                gap: '32px',
                width: '100%',
            }}
        >
            <Button variant="blueText" size="sm" onClick={onClose}>
                {cancelLabel}
            </Button>
            <Button variant="redText" size="sm" onClick={handleConfirm}>
                {confirmLabel}
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
            footer={footer}
            hideCloseButton={true}
            closeOnOverlayClick={false}
        >
            {styledMessage}
        </Modal>
    );
}
