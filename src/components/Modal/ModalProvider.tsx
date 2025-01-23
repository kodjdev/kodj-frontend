import React, { createContext, useState, ReactNode, useContext } from "react";
import Modal from "@/components/ui/modal";

export type ModalContextType = {
  openModal: (type: string, content?: React.ReactNode) => void;
  closeModal: (type?: string) => void;
  isModalOpen: (type: string) => boolean;
};

export type GlobalModalProps = {
  type: string;
  onClose: () => void;
  children?: React.ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<
    { type: string; content?: React.ReactNode }[]
  >([]);

  const openModal = (type: string, content?: React.ReactNode) => {
    setModals((prev) => {
      // buyerda biz bir xil modalni bir necha marta ochmasligimizni tekshiramiz
      if (prev.some((modal) => modal.type === type)) return prev;
      return [...prev, { type, content }];
    });
  };

  const closeModal = (type?: string) => {
    setModals((prev) => {
      // agar type berilmagan bo'lsa , barcha modalni yopamiz
      if (!type) return prev.slice(0, -1);
      // yokida berilgan type modalni yopamiz
      return prev.filter((modal) => modal.type !== type);
    });
  };

  const isModalOpen = (type: string) => {
    return modals.some((modal) => modal.type === type);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
      {modals.map((modal, index) => (
        <GlobalModal
          key={`${modal.type}-${index}`}
          type={modal.type}
          onClose={() => closeModal(modal.type)}
        >
          {modal.content}
        </GlobalModal>
      ))}
    </ModalContext.Provider>
  );
};

// bu modal global modal bo'lib , barcha modalni bir joyda chiqaradi
const GlobalModal: React.FC<GlobalModalProps> = ({ onClose, children }) => {
  return (
    <Modal onClose={onClose}>
      <div className="bg-gray-800" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Modal>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
