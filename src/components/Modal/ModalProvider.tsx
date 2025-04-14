import React, { createContext, useState, ReactNode, useContext } from "react";
// import Modal from "@/components/ui/modal";

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
    // <Modal onClose={onClose}>
    //   <div className="bg-gray-800" onClick={(e) => e.stopPropagation()}>
    //     {children}
    //   </div>
    // </Modal>
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white">{children}</div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
