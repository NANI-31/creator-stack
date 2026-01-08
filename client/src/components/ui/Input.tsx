import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = isPassword ? (showPassword ? "text" : "password") : props.type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-(--color-quinary) ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          {...props}
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl bg-(--color-secondary)/30 border-2 border-transparent
            text-(--color-sextary) placeholder:text-(--color-quinary)/50
            focus:border-quaternary focus:bg-white outline-none
            transition-all duration-300
            ${error ? "border-red-500" : ""}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--color-quinary) hover:text-quaternary transition-colors"
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
