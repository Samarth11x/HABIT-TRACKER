import clsx from 'clsx';
import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  noPadding?: boolean;
}

export function Card({ children, className, noPadding = false, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-samarth-card rounded-xl border border-samarth-border shadow-sm flex flex-col overflow-hidden",
        "transition-all duration-300 hover:shadow-lg hover:shadow-samarth-primary/5 hover:border-samarth-border/80",
        !noPadding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
