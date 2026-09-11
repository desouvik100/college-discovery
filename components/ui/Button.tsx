import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", type = "button", children, ...props }, ref) => {
    const baseClasses = "btn";
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link",
    };
    const sizeClasses = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
