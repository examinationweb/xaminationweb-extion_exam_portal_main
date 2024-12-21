import React from 'react';
import { countryCodes } from '../utils/countryCodes';

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CountryCodeSelect({ value, onChange, className }: CountryCodeSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-28 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md bg-white/80 backdrop-blur-sm text-sm ${className}`}
    >
      {countryCodes.map((code) => (
        <option key={code.id} value={code.code}>
          {code.code}
        </option>
      ))}
    </select>
  );
}