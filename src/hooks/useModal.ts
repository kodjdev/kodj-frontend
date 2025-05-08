import { useState } from 'react';

/**
 * Hook for easy modal state management
 * @param initialState - Initial state of the modal (open or closed)
 * @returns Object with isOpen state and functions to open/close the modal
 */
export default function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen((prev) => !prev);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };
}
