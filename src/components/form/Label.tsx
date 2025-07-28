import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { selectWordTranslation } from "../../stores/translation";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
          className,
        ),
      )}
    >
      { useSelector(selectWordTranslation(children as string)) }
    </label>
  );
};

export default Label;
