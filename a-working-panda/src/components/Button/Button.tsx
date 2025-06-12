import { Button as RadixButton } from "@radix-ui/themes/src/index.js";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof RadixButton> & {
  variant?: ComponentProps<typeof RadixButton>["variant"];
};

export const Button = ({ variant = "classic", ...props }: ButtonProps) => {
  return <RadixButton variant={variant} {...props} />;
};
