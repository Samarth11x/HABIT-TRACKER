import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export function AppLayout() {
  const { isSidebarOpen, setSidebarOpen } = useStore();

  return (
    <div className="min-h-screen flex bg-samarth-bg">
      {/* Sidebar - Hidden on mobile by default, shown as a drawer */}
      <div className={clsx(
        "fixed inset-0 z-50 lg:relative lg:z-0 lg:flex",
        isSidebarOpen ? "flex" : "hidden lg:flex"
      )}>
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col min-h-screen w-full lg:ml-0 overflow-x-hidden">
        <div className="flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
