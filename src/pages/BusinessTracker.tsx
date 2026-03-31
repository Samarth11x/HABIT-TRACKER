import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useStore } from '../store/useStore';
import { Plus, Check, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export function BusinessTracker() {
  const businessEntries = useStore(state => state.businessEntries);
  const addBusinessEntry = useStore(state => state.addBusinessEntry);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newEntry, setNewEntry] = useState({
    totalSales: 0,
    totalPieces: 0,
    expense: 0,
    notes: ''
  });

  const handleAddEntry = () => {
    addBusinessEntry({
      id: crypto.randomUUID(),
      date: format(new Date(), 'yyyy-MM-dd'),
      salesEntered: true,
      totalSales: newEntry.totalSales,
      totalPieces: 0,
      expense: newEntry.expense,
      netProfit: newEntry.totalSales - newEntry.expense,
      cashCollected: (newEntry.totalSales - newEntry.expense) * 0.33,
      upiCollected: (newEntry.totalSales - newEntry.expense) * 0.67,
      pendingEntry: false,
      customerFollowUp: '',
      notes: newEntry.notes,
      paymentMethodDistribution: { cashPercentage: 33, upiPercentage: 67 }
    });
    setIsModalOpen(false);
    setNewEntry({ totalSales: 0, totalPieces: 0, expense: 0, notes: '' });
  };

  const totalNet = businessEntries.reduce((sum, e) => sum + e.netProfit, 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="KP Business Tracker" subtitle="Retail sales tracking and analytics." action={
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-samarth-primary hover:bg-samarth-primaryHover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-samarth-primary/20"
        >
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      } />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Log Today's Business"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Total Sales ($)</label>
            <input 
              type="number" 
              value={newEntry.totalSales}
              onChange={(e) => setNewEntry({...newEntry, totalSales: Number(e.target.value)})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Expenses ($)</label>
            <input 
              type="number" 
              value={newEntry.expense}
              onChange={(e) => setNewEntry({...newEntry, expense: Number(e.target.value)})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              placeholder="0.00"
            />
          </div>
          <div className="p-3 bg-samarth-primary/5 border border-samarth-primary/20 rounded-lg">
             <div className="flex justify-between items-center">
               <span className="text-xs font-bold text-samarth-textSecondary uppercase">Net Profit</span>
               <span className="text-lg font-bold text-samarth-primary">${(newEntry.totalSales - newEntry.expense).toFixed(2)}</span>
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Notes</label>
            <textarea 
              value={newEntry.notes}
              onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none h-20 resize-none"
              placeholder="Any specific insights from today?"
            />
          </div>

          <button 
            onClick={handleAddEntry}
            className="w-full py-3 bg-samarth-primary text-white font-bold rounded-lg hover:bg-samarth-primaryHover transition-colors mt-2"
          >
            LOG SALES ENTRY
          </button>
        </div>
      </Modal>
      
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-samarth-success/10 rounded-lg text-samarth-success">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wide">Total Sales (7d)</p>
                <p className="text-2xl font-bold text-samarth-text">${businessEntries.reduce((sum, e) => sum + e.totalSales, 0).toFixed(2)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-samarth-primary/10 rounded-lg text-samarth-primary">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wide">Net Profit (7d)</p>
                <p className="text-2xl font-bold text-samarth-text">${totalNet.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wide">Cash vs UPI</span>
            </div>
            <div className="w-full bg-samarth-border h-2 rounded-full overflow-hidden flex">
              <div className="bg-samarth-warning h-full w-1/3"></div>
              <div className="bg-samarth-primary h-full w-2/3"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium">
              <span className="text-samarth-warning">Cash (33%)</span>
              <span className="text-samarth-primary">UPI (67%)</span>
            </div>
          </Card>
          
          <Card className="p-5 flex flex-col justify-center items-center text-center border-samarth-border border-dashed">
            <p className="text-sm font-medium text-samarth-textSecondary mb-2">Pending Entries</p>
            <span className="text-3xl font-black text-samarth-success">0</span>
          </Card>
        </div>

        {/* Data Table */}
        <Card noPadding className="overflow-hidden">
          <div className="p-4 border-b border-samarth-border bg-samarth-bg/50">
            <h3 className="font-semibold text-samarth-text">Daily Entries</h3>
          </div>
          {/* Mobile Card View (Hidden on LG+) */}
          <div className="block lg:hidden divide-y divide-samarth-border">
            {businessEntries.map(entry => (
              <div key={entry.id} className="p-4 space-y-3 hover:bg-samarth-bg/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-samarth-textSecondary uppercase tracking-wider">{entry.date}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {entry.salesEntered ? (
                        <span className="flex items-center gap-1 text-samarth-success text-[10px] font-bold uppercase tracking-wider">
                          <Check className="w-3 h-3" /> Entered
                        </span>
                      ) : (
                        <span className="text-samarth-warning text-[10px] font-bold uppercase tracking-wider">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-samarth-primary">
                      +${entry.netProfit.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-medium text-samarth-textSecondary uppercase tracking-wider">Net Profit</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pb-1">
                  <div>
                    <p className="text-[10px] text-samarth-textSecondary uppercase font-bold tracking-tighter">Gross Sales</p>
                    <p className="text-sm font-semibold text-samarth-text">${entry.totalSales.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-samarth-textSecondary uppercase font-bold tracking-tighter">Expenses</p>
                    <p className="text-sm font-semibold text-samarth-danger">${entry.expense.toFixed(2)}</p>
                  </div>
                </div>

                {entry.notes && (
                  <div className="pt-2 border-t border-samarth-border/30 text-xs text-samarth-textSecondary leading-relaxed italic">
                    {entry.notes}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-samarth-textSecondary uppercase bg-samarth-bg/20 border-b border-samarth-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Sales</th>
                  <th className="px-6 py-4 font-medium text-right">Expense</th>
                  <th className="px-6 py-4 font-medium text-right">Net Profit</th>
                  <th className="px-6 py-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-samarth-border">
                {businessEntries.map(entry => (
                  <tr key={entry.id} className="hover:bg-samarth-bg/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-samarth-text font-medium">{entry.date}</td>
                    <td className="px-6 py-4">
                      {entry.salesEntered ? (
                        <span className="flex items-center gap-1 text-samarth-success text-xs font-bold uppercase tracking-wider">
                          <Check className="w-3 h-3" /> Entered
                        </span>
                      ) : (
                        <span className="text-samarth-warning text-xs font-bold uppercase tracking-wider">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-samarth-text">${entry.totalSales.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-samarth-danger">${entry.expense.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-bold text-samarth-primary">${entry.netProfit.toFixed(2)}</td>
                    <td className="px-6 py-4 text-samarth-textSecondary truncate max-w-[200px]">{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
