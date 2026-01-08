import { useState } from "react";

export const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-black text-(--color-sextary) mb-1">{title}</h3>
    <p className="text-sm text-(--color-quinary)/60">{description}</p>
  </div>
);

export const InputGroup = ({
  label,
  type = "text",
  helperText,
  ...props
}: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-(--color-sextary) uppercase tracking-wide">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        className="p-3 rounded-xl border border-(--color-secondary)/30 bg-gray-50 focus:bg-white focus:border-sextary outline-none transition-all resize-none h-32"
        {...props}
      />
    ) : (
      <input
        type={type}
        className="p-3 rounded-xl border border-(--color-secondary)/30 bg-gray-50 focus:bg-white focus:border-sextary outline-none transition-all"
        {...props}
      />
    )}
    {helperText && (
      <span className="text-[10px] text-gray-400 font-medium">
        {helperText}
      </span>
    )}
  </div>
);

export const SelectGroup = ({ label, options, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-(--color-sextary) uppercase tracking-wide">
      {label}
    </label>
    <select
      className="p-3 rounded-xl border border-(--color-secondary)/30 bg-gray-50 focus:bg-white focus:border-sextary outline-none transition-all"
      {...props}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export const ToggleGroup = ({
  label,
  description,
  defaultChecked,
  onChange,
}: any) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const newState = !checked;
    setChecked(newState);
    if (onChange) onChange();
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-(--color-secondary)/20 bg-gray-50/50">
      <div>
        <h4 className="text-sm font-bold text-(--color-sextary)">{label}</h4>
        <p className="text-xs text-(--color-quinary)/50 mt-1">{description}</p>
      </div>
      <button
        onClick={toggle}
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 ease-in-out ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
