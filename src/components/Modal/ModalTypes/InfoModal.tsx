import { ReactNode } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { Sizes } from '@/components/Modal/modalConstants';
import { Check } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import styled from 'styled-components';

export type InfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string | ReactNode;
    buttonLabel?: string;
    size?: Sizes;
    onConfirm?: () => void;
};

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${themeColors.spacing.md};
    text-align: center;
    margin-bottom: ${themeColors.spacing.lg};
`;

const IconContainer = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${themeColors.blue}20;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${themeColors.spacing.sm};
`;

const TitleText = styled.h2`
    margin: 0;
    font-size: ${themeColors.font20.fontSize}px;
    font-weight: ${themeColors.font20.fontWeight};
    color: ${themeColors.colors.neutral.white};
`;

const MessageContainer = styled.div`
    text-align: center;
    padding: 0 ${themeColors.spacing.md};
    color: ${themeColors.gray_text};
    line-height: 1.5;
`;

/**
 * ConfirmModal - Organism Component
 * A specialized modal for confirmation dialogs with customizable buttons.
 * @param {boolean} isOpen - Controls the visibility of the modal
 * @param {function} onClose - Callback function to be called when modal is closed
 * @param {string} [title='Information'] - Title to display in the modal header
 * @param {string|ReactNode} message - Message content to display in the modal body
 * @param {string} [buttonLabel='Got it'] - Text for the action button
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [size='sm'] - Controls the width of the modal
 * @param {function} [onConfirm] - Optional callback function to be called when the action button is clicked
 */
export default function InfoModal({
    isOpen,
    onClose,
    title = 'Information',
    message,
    buttonLabel = 'Got it',
    size = 'sm',
    onConfirm,
}: InfoModalProps) {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };
    const footer = (
        <div style={{ marginBottom: themeColors.spacing.sm, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button fullWidth={true} variant="primary" onClick={handleConfirm} size="md">
                {buttonLabel}
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            footer={footer}
            footerAlign="center"
            hideCloseButton={true}
        >
            <TitleContainer>
                <IconContainer>
                    <Check size={24} color={themeColors.blue} />
                </IconContainer>
                <TitleText>{title}</TitleText>
            </TitleContainer>
            <MessageContainer>
                {typeof message === 'string' ? <p style={{ margin: 0 }}>{message}</p> : message}
            </MessageContainer>
        </Modal>
    );
}
