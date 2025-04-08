import React, { useState, createContext, useContext } from "react";
import theme from "@/tools/theme";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

type SelectContextType = {
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const Select: React.FC<{
  children: React.ReactNode;
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
}> = ({ children, value, options, onValueChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, options, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style = {} }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectTrigger must be used within a Select");
  }

  return (
    <button
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={`flex items-center justify-between ${className}`}
      style={style}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform ${context.open ? "rotate-180" : ""}`}
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export const SelectValue: React.FC<{
  placeholder?: string;
}> = ({ placeholder = "Select" }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectValue must be used within a Select");
  }

  const selectedLabel = context.options.find(opt => opt.value === context.value)?.label;

  return (
    <span className="truncate text-gray-300">
      {selectedLabel || placeholder}
    </span>
  );
};

export const SelectContent: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style = {} }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectContent must be used within a Select");
  }

  if (!context.open) {
    return null;
  }

  return (
    <div
      className="absolute z-10 w-full mt-1 rounded-md shadow-lg overflow-hidden"
      style={{ ...style, maxHeight: "15rem", overflowY: "auto" }}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export const SelectItem: React.FC<{
  children: React.ReactNode;
  value: string;
  className?: string;
}> = ({ children, value, className = "" }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectItem must be used within a Select");
  }

  const isSelected = context.value === value;

  return (
    <div
      onClick={() => {
        context.onValueChange(value);
        context.setOpen(false);
      }}
      className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
        isSelected ? "bg-gray-700" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select",
}) => {
  return (
    <Select value={value} options={options} onValueChange={onChange}>
      <SelectTrigger
        className="w-full h-12 px-4 rounded-md"
        style={{ backgroundColor: theme.gray_inputTag_background }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent style={{ backgroundColor: theme.gray_background }}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-gray-300"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};