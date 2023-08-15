import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded shadow",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-400",
        outline: "bg-transparent border border-slate-200",
      },
      size: {
        default: "h-10 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * @typedef {React.HTMLAttributes<HTMLButtonElement>
 *  & import("class-variance-authority").VariantProps<typeof buttonVariants>} ButtonProps
 * 
 *
 * @param {ButtonProps} props
 */
function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
