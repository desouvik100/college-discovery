import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    const classes = `select ${className}`.trim();

    return (
      <select ref={ref} className={classes} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
