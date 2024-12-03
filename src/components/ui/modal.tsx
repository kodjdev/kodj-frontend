import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Modal content */}
      <div className="bg-white rounded-lg overflow-hidden shadow-xl z-10">
        {children}
      </div>
    </div>
  );
}
