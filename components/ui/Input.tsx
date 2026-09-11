import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", size = "md", ...props }, ref) => {
    const sizeClasses = {
      md: "input",
      lg: "input-lg",
    };
    
    const classes = `${sizeClasses[size]} ${className}`.trim();

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
