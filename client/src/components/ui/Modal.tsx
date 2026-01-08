import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-(--color-sextary)/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-black/10 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {(title || onClose) && (
          <div className="flex items-center justify-between p-6 border-b border-(--color-secondary)/40">
            {title ? (
              <h3 className="text-xl font-black text-(--color-sextary)">
                {title}
              </h3>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-(--color-quinary)/50 hover:text-quaternary hover:bg-(--color-secondary)/20 transition-all"
            >
              <HiX size={20} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
