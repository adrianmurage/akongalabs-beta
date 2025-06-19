import type { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "classic" | "outline" | "soft" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  variant = "classic",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        {
          [styles["button--disabled"]]: disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};
