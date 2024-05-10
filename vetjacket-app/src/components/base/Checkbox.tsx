import { ReactNode } from 'react';

interface CheckboxProps {
  label: string | ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Checkbox({ label, value, onChange }: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          aria-describedby="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="comments">{label}</label>{' '}
      </div>
    </div>
  );
}
