"use client";

import React, { forwardRef, useState, useEffect } from "react";

interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange?: (selectedValue: string | null) => void; // Permite valor nulo
  className?: string;
  id?: string;
  defaultValue: string | null; // Valor padrão
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ label, options, onChange, className, id, defaultValue, ...props }) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(
      defaultValue
    );

    useEffect(() => {
      if (onChange) {
        onChange(selectedValue);
      }
    }, [selectedValue, onChange]);

    const handleOptionClick = (value: string) => {
      setSelectedValue(value);
    };

    return (
      <div className={`mb-4 ${className}`} id={id}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          value={selectedValue ?? ""} // Define o valor selecionado.  ?? '' para evitar erro com null
          onChange={(e) => handleOptionClick(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          {...props}
        >
          {/* Opção vazia se defaultValue for null */}
          {defaultValue === null && <option value="">Nenhum...</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
