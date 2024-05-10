import { twMerge } from 'tailwind-merge';
import { toast } from 'react-hot-toast';

export function classNames(...classes: string[]) {
  // Tailwind merge will choose the latest class if there are duplicates
  return twMerge(classes.filter(Boolean).join(' '));
}

export const stripNonNumeric = (str) => {
  return str.replace(/\D/g, ''); // Remove non-digit characters
};

export function formatPhoneNumber(number) {
  // Convert the number to a string
  const str = number.toString();

  // Check if it's a 10-digit number
  if (str.length !== 10) {
    return 'Invalid number';
  }

  // Format the string
  return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6)}`;
}

export function toDateTime(time: string) {
  const columnOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return `${new Date(time).toLocaleDateString('en-US', columnOptions)}`;
}
export function toDate(time: string) {
  const columnOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
 
  };
  return `${new Date(time).toLocaleDateString('en-US', columnOptions)}`;
}

export function containsArray(bigArray, targetArray) {
  return bigArray.some(
    (subArray) =>
      subArray.length === targetArray.length &&
      subArray.every((value, index) => value === targetArray[index]),
  );
}

export function removeArray(bigArray, targetArray) {
  const x = bigArray.filter(
    (subArray) =>
      subArray.length === targetArray.length &&
      subArray.join() != targetArray.join(),
  );
  return x;
}

export function handleCopyEmail(email) {
  if (email) {
    try {
      navigator.clipboard.writeText(email);
      toast.success('Email copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy email');
    }
  }
}