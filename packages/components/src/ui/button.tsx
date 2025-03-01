import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("explita-button", {
  variants: {
    variant: {
      default: "default",
      destructive: "destructive",
      outline: "outline",
      secondary: "secondary",
      ghost: "ghost",
      link: "link",
      teal: "teal",
      green: "green",
    },
    size: {
      default: "size-default",
      sm: "size-sm",
      lg: "size-lg",
      icon: "size-icon",
      xs: "size-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
