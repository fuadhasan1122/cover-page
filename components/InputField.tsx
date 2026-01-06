// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}

export default function InputField({ label, value, onChange, required, type = "text" }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm text-black focus:ring-2 focus:ring-black outline-none transition-all"
      />
    </div>
  );
}