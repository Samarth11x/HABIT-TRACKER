import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <label 
      className={clsx("flex items-center gap-3 cursor-pointer group select-none py-2", className)}
      onClick={(e) => {
        e.preventDefault();
        onChange();
      }}
    >
      <div 
        className={clsx(
          "w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center flex-shrink-0",
          checked 
            ? "bg-samarth-primary border-samarth-primary shadow-sm shadow-samarth-primary/20" 
            : "bg-samarth-bg border-samarth-border group-hover:border-samarth-textSecondary"
        )}
      >
        <div className={clsx(
          "transition-all duration-200 transform",
          checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}>
          <Check className="w-3.5 h-3.5 text-white stroke-[4]" />
        </div>
      </div>
      {label && (
        <span className={clsx(
          "text-sm font-medium transition-all duration-200",
          checked ? "text-samarth-textSecondary line-through opacity-60" : "text-samarth-text"
        )}>
          {label}
        </span>
      )}
    </label>
  );
}
