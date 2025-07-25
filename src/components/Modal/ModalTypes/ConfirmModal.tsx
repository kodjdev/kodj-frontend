import { ReactNode } from 'react';
import styled from 'styled-components';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import themeColors from '@/tools/themeColors';

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'primary' | 'secondary' | 'danger';
} & Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose' | 'footer' | 'children'> & {
        message?: string | ReactNode;
        mainMessage?: string;
        highlightText?: string;
        subMessage?: string;
    };

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.md};
    text-align: left;
    padding: 24px;
    padding-top: 0;
    padding-bottom: 0;
`;

const MainMessage = styled.p`
    margin: 0;
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    line-height: 1.5;
`;

const HighlightText = styled.span`
    color: ${themeColors.blue};
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    display: block;
    margin: 0;
`;

const SubMessage = styled.p`
    margin: 0;
    color: ${themeColors.gray_text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

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
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmVariant = 'danger',
    message,
    mainMessage,
    highlightText,
    subMessage,
    ...modalProps
}: ConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
    };

    const organizedContent =
        mainMessage || highlightText || subMessage ? (
            <ContentContainer>
                {mainMessage && <MainMessage>{mainMessage}</MainMessage>}
                {highlightText && <HighlightText>{highlightText}</HighlightText>}
                {subMessage && <SubMessage>{subMessage}</SubMessage>}
            </ContentContainer>
        ) : message ? (
            <MessageContainer>
                <Message>{typeof message === 'string' ? message : message}</Message>
            </MessageContainer>
        ) : null;

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
            <Button
                variant={
                    confirmVariant === 'primary' ? 'primary' : confirmVariant === 'danger' ? 'redText' : 'blueText'
                }
                size="sm"
                onClick={handleConfirm}
            >
                {confirmLabel}
            </Button>
        </div>
    );

    return (
        <Modal
            size="md"
            isOpen={isOpen}
            onClose={onClose}
            footer={footer}
            hideCloseButton={true}
            closeOnOverlayClick={false}
            {...modalProps}
        >
            {organizedContent}
        </Modal>
    );
}
