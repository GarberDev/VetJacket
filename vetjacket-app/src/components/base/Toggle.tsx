interface ToggleProps {
  value: boolean;
  setValue: (val: any) => void;
}

export default function Toggle({ value, setValue }: ToggleProps) {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={() => setValue(!value)}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    />
  );
}
