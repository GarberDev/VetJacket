import { classNames } from "@src/helpers/helper";

export interface CircularAvatarProps {
  size: string;
  value: string;
}

export default function CircularAvatar({ size, value }: CircularAvatarProps) {
  const sizeMapping: any = {
    xs: "6",
    sm: "8",
    md: "10",
    lg: "12",
    xl: "14",
  };

  const finalSize = `h-${sizeMapping[size]} w-${sizeMapping[size]}`;

  return (
    <span
      className={classNames(
        finalSize,
        "inline-flex items-center justify-center rounded-full bg-gray-500"
      )}
    >
      <span
        className={classNames(
          `text-${size}`,
          "font-medium leading-none text-white"
        )}
      >
        {value}
      </span>
    </span>
  );
}
