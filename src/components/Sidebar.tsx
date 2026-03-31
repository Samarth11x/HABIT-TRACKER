import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  LineChart, 
  BookOpen, 
  Briefcase, 
  Library, 
  RefreshCw, 
  ShieldAlert, 
  Ban, 
  Settings,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Daily OS', path: '/daily-os', icon: CheckSquare },
  { name: 'Trading Command Center', path: '/command-center', icon: ShieldAlert },
  { name: 'Trading Journal', path: '/trading-journal', icon: LineChart },
  { name: 'KP Business Tracker', path: '/business-tracker', icon: Briefcase },
  { name: 'Study Tracker', path: '/study-tracker', icon: Library },
  { name: 'Weekly Reset', path: '/weekly-reset', icon: RefreshCw },
  { name: 'Rules I Do Not Break', path: '/rules', icon: BookOpen },
  { name: 'Distraction Kill List', path: '/distractions', icon: Ban },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const setSidebarOpen = useStore(state => state.setSidebarOpen);

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside className="w-64 h-full bg-samarth-card border-r border-samarth-border flex flex-col relative z-50">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-samarth-text">SAMARTH <span className="text-samarth-primary">OS</span></h1>
          <p className="text-xs text-samarth-textSecondary mt-1 font-medium tracking-wide opacity-80">
            DISCIPLINE OVER EMOTION
          </p>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-samarth-textSecondary hover:text-samarth-text"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group active:scale-[0.98]",
                isActive 
                  ? "bg-samarth-primary/10 text-samarth-primary shadow-sm shadow-samarth-primary/5" 
                  : "text-samarth-textSecondary hover:text-samarth-text hover:bg-samarth-bg/50"
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon className={clsx(
                    "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                    isActive && "text-samarth-primary"
                  )} />
                  {item.name}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-samarth-border">
        <div className="bg-samarth-bg p-3 rounded-lg flex flex-col gap-1 items-center justify-center text-center border border-samarth-border/50">
           <span className="text-[10px] font-bold text-samarth-textSecondary tracking-[0.2em] uppercase">Identity</span>
           <div className="flex flex-wrap gap-1.5 justify-center mt-2">
             <span className="px-2 py-0.5 bg-samarth-border/50 rounded-md text-[9px] font-bold text-samarth-text uppercase tracking-wider">Trader</span>
             <span className="px-2 py-0.5 bg-samarth-border/50 rounded-md text-[9px] font-bold text-samarth-text uppercase tracking-wider">Builder</span>
             <span className="px-2 py-0.5 bg-samarth-border/50 rounded-md text-[9px] font-bold text-samarth-text uppercase tracking-wider">Student</span>
             <span className="px-2 py-0.5 bg-samarth-border/50 rounded-md text-[9px] font-bold text-samarth-text uppercase tracking-wider">Athlete</span>
           </div>
        </div>
      </div>
    </aside>
  );
}
