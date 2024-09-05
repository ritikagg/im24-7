import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      {label && (
        <span className="mr-2 text-sm font-medium text-gray-900">{label}</span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <div
          className={`block w-10 h-6 rounded-full ${
            checked ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 
            rounded-full transition-transform duration-200 ease-in-out 
            ${checked ? "transform translate-x-4" : ""}`}
        />
      </div>
    </label>
  );
};
