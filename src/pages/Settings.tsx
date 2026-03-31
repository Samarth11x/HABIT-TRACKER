import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { useStore } from '../store/useStore';
import { Moon, Trash2, User, Download } from 'lucide-react';

export function Settings() {
  const resetData = useStore(state => state.resetData);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data? This will wipe your local changes and restore the default state.")) {
      resetData();
      localStorage.removeItem('samarth-os-storage');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Settings" subtitle="System preferences and data management." />
      
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
        
        <Card>
          <h3 className="text-base font-semibold text-samarth-text mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-samarth-primary" /> Profile Identity
          </h3>
          <div className="space-y-4">
            <div>
               <label className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wider mb-2 block">Operator Name</label>
               <input type="text" disabled value="SAMARTH" className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-4 py-2 opacity-70 cursor-not-allowed" />
            </div>
            <div>
               <label className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wider mb-2 block">Active Tags</label>
               <div className="flex gap-2">
                 <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Trader</span>
                 <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Builder</span>
                 <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Student</span>
                 <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Athlete</span>
               </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-samarth-text mb-6 flex items-center gap-2">
            <Moon className="w-5 h-5 text-samarth-textSecondary" /> Appearance
          </h3>
          <div className="flex items-center justify-between p-4 bg-samarth-bg rounded-lg border border-samarth-border">
             <div>
               <p className="font-semibold text-samarth-text">Dark Mode Premium</p>
               <p className="text-sm text-samarth-textSecondary">The default high-performance theme.</p>
             </div>
             <div className="w-12 h-6 bg-samarth-primary rounded-full relative opacity-50 cursor-not-allowed">
               <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
             </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-samarth-text mb-6 flex items-center gap-2">
            <Download className="w-5 h-5 text-samarth-textSecondary" /> Data Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-samarth-bg rounded-lg border border-samarth-border">
               <div>
                 <p className="font-semibold text-samarth-text">Export Data</p>
                 <p className="text-sm text-samarth-textSecondary">Download all journal and tracking data as JSON.</p>
               </div>
               <button className="px-4 py-2 bg-samarth-border text-samarth-text hover:bg-samarth-textSecondary/20 rounded-lg text-sm font-medium transition-colors">
                 Export
               </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-samarth-danger/5 rounded-lg border border-samarth-danger/20">
               <div>
                 <p className="font-semibold text-samarth-danger">Reset Demo Data</p>
                 <p className="text-sm text-samarth-danger/70">Wipes local storage and restores default mock data.</p>
               </div>
               <button onClick={handleReset} className="px-4 py-2 bg-samarth-danger text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                 <Trash2 className="w-4 h-4" /> Reset Data
               </button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
