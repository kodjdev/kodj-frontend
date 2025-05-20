import React, { useEffect, useState, useRef, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { X } from 'lucide-react';
import { modalSizes } from './modalConstants';

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: keyof typeof modalSizes;
    hideCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    footer?: ReactNode;
    footerAlign?: 'left' | 'center' | 'right';
    customHeader?: ReactNode;
    className?: string;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(3px);
    opacity: 1;
    transition:
        visibility 0.3s ease-out,
        opacity 0.3s ease-out;
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${themeColors.zIndex_modal || 1000};
    padding: ${themeColors.spacing.md};
    animation: ${fadeIn} 0.2s ease-out;
    overflow-y: auto;
`;

const ModalContainer = styled(Card)<{ size: keyof typeof modalSizes; ref: React.RefObject<HTMLDivElement> }>`
    width: 100%;
    max-width: ${({ size }) => modalSizes[size]};
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: ${slideIn} 0.3s ease-out;
    margin: auto;
    background-color: ${themeColors.colors.black.background};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 28px;
    color: ${themeColors.colors.neutral.white};
    box-shadow: ${themeColors.shadow_3};
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${themeColors.spacing.lg};
`;

const ModalTitle = styled.h3`
    margin: 0;
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    color: ${themeColors.colors.neutral.white};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${themeColors.colors.gray.main};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${themeColors.spacing.xs};
    transition: all 0.2s;

    &:hover {
        color: ${themeColors.colors.neutral.white};
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ModalBody = styled.div`
    padding: ${themeColors.spacing.xs};
    overflow-y: auto;
    flex: 1;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${themeColors.spacing.md};
    padding: ${themeColors.spacing.lg};
`;

/**
 * Modal - Root Molecule Component
 * A reusable modal dialog component that can be used anywhere in the application.
 * @param {boolean} isOpen - Controls the visibility of the modal
 * @param {function} onClose - Callback function to be called when modal is closed
 * @param {string} [title] - Optional title to display in the modal header
 * @param {ReactNode} children - Content to display in the modal body
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [size='md'] - Controls the width of the modal
 * @param {boolean} [hideCloseButton=false] - When true, hides the X close button in header
 * @param {boolean} [closeOnOverlayClick=true] - When true, clicking the overlay closes the modal
 * @param {ReactNode} [footer] - Optional content to display in the modal footer
 * @param {ReactNode} [customHeader] - Optional custom header content that replaces the default header
 * @param {string} [className] - Additional CSS classes to apply to the modal container
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    hideCloseButton = false,
    closeOnOverlayClick = true,
    footer,
    customHeader,
    className,
}: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            /** we prevent background scrolling */
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isMounted || !isOpen) return null;

    /* we create a portal to render the modal at the document body level */
    return createPortal(
        <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
            <ModalContainer ref={modalRef} size={size} className={className} padding="0" backgroundColor="transparent">
                {customHeader ? (
                    customHeader
                ) : (
                    <ModalHeader>
                        {title && <ModalTitle>{title}</ModalTitle>}
                        {!hideCloseButton && (
                            <CloseButton onClick={onClose} aria-label="Close">
                                <X size={18} />
                            </CloseButton>
                        )}
                    </ModalHeader>
                )}

                <ModalBody>{children}</ModalBody>

                {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContainer>
        </ModalOverlay>,
        document.body,
    );
}
