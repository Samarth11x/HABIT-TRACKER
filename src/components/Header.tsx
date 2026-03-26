import { format } from 'date-fns';
import { Flame, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, action }: HeaderProps) {
  const { setSidebarOpen } = useStore();

  return (
    <header className="h-20 border-b border-samarth-border bg-samarth-bg/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-samarth-textSecondary hover:text-samarth-text"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-samarth-text truncate max-w-[150px] sm:max-w-none">{title}</h1>
          {subtitle && (
            <p className="text-[10px] md:text-sm text-samarth-textSecondary mt-0.5 truncate max-w-[150px] sm:max-w-none">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="text-right hidden lg:block">
          <p className="text-sm font-medium text-samarth-text">{format(new Date(), 'EEEE')}</p>
          <p className="text-xs text-samarth-textSecondary">{format(new Date(), 'MMMM do, yyyy')}</p>
        </div>
        
        <div className="h-8 w-px bg-samarth-border hidden md:block" />

        <div className="flex items-center gap-1.5 bg-samarth-card px-2.5 py-1 rounded-full border border-samarth-border">
          <Flame className="w-3.5 h-3.5 text-samarth-warning" />
          <span className="text-[11px] md:text-sm font-bold text-samarth-warning">Day 1</span>
        </div>

        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}
