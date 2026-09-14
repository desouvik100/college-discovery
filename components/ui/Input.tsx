import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", inputSize = "md", ...props }, ref) => {
    const sizeClasses = {
      md: "input",
      lg: "input-lg",
    };
    
    const classes = `${sizeClasses[inputSize]} ${className}`.trim();

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
