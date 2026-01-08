import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  isOpen,
  onClose,
  message = "You must be logged in to share your discoveries with the community.",
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 text-quaternary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <HiLockClosed size={32} />
        </div>

        <h3 className="text-2xl font-black text-(--color-sextary) mb-4">
          Login Required
        </h3>

        <p className="text-(--color-quinary)/80 font-medium mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" fullWidth onClick={handleLogin}>
            Sign In to Continue
          </Button>
          <Button variant="outline" fullWidth onClick={handleRegister}>
            Create an Account
          </Button>
          <button
            onClick={onClose}
            className="text-xs font-bold text-(--color-quinary)/50 hover:text-quaternary uppercase tracking-widest mt-4 transition-colors"
          >
            I'll do it later
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPromptModal;
