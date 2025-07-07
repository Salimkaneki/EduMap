import React from "react";

interface InputProps {
  label?: string;
}

export default function InputS({ label }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id="custom-input"
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {label && (
        <label
          htmlFor="custom-input"
          className="absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-600"
        >
          {label}
        </label>
      )}
    </div>
  );
}
