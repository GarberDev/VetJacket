import { classNames } from '@src/helpers/helper';

export interface CircularButtonProps {
  onClick: () => void;
  className: string;
  children: any;
}

export default function CircularButton({
  onClick,
  className,
  children,
}: CircularButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={classNames(
          'rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          className,
        )}
      >
        {children}
      </button>
    </>
  );
}
