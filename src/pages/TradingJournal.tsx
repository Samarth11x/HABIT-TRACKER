import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useStore } from '../store/useStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Filter } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

export function TradingJournal() {
  const { trades, addTrade } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTrade, setNewTrade] = useState({
    instrument: 'XAUUSD',
    setupType: 'FVG Mitigation',
    outcome: 'Win' as 'Win' | 'Loss' | 'Break-even',
    pnl: 0,
    resultR: 0,
    followedRules: true,
    notes: ''
  });

  const handleAddTrade = () => {
    addTrade({
      id: crypto.randomUUID(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...newTrade
    });
    setIsModalOpen(false);
    setNewTrade({
      instrument: 'XAUUSD',
      setupType: 'FVG Mitigation',
      outcome: 'Win',
      pnl: 0,
      resultR: 0,
      followedRules: true,
      notes: ''
    });
  };

  const winRate = trades.length > 0
    ? (trades.filter(t => t.outcome === 'Win').length / trades.length * 100).toFixed(1)
    : 0;
  
  const totalR = trades.reduce((sum, t) => sum + (typeof t.resultR === 'number' ? t.resultR : 0), 0).toFixed(2);
  const totalPnL = trades.reduce((sum, t) => sum + (typeof t.pnl === 'number' ? t.pnl : 0), 0).toFixed(2);
  const ruleBreaks = trades.filter(t => !t.followedRules).length;

  const chartData = [...trades]
    .map(t => ({ name: t.date, pnl: typeof t.pnl === 'number' ? t.pnl : 0 }))
    .reverse();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Trading Journal" subtitle="Database and analytics for all historical trades." action={
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-samarth-primary hover:bg-samarth-primaryHover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-samarth-primary/20"
        >
          <Plus className="w-4 h-4" /> Add Trade
        </button>
      } />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Trade"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Instrument</label>
              <input 
                type="text" 
                value={newTrade.instrument}
                onChange={(e) => setNewTrade({...newTrade, instrument: e.target.value})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Setup Type</label>
              <input 
                type="text" 
                value={newTrade.setupType}
                onChange={(e) => setNewTrade({...newTrade, setupType: e.target.value})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Outcome</label>
              <select 
                value={newTrade.outcome}
                onChange={(e) => setNewTrade({...newTrade, outcome: e.target.value as any})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
                <option value="Break-even">Break-even</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">P/L ($)</label>
              <input 
                type="number" 
                value={newTrade.pnl}
                onChange={(e) => setNewTrade({...newTrade, pnl: Number(e.target.value)})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Result (R)</label>
              <input 
                type="number" 
                value={newTrade.resultR}
                step="0.1"
                onChange={(e) => setNewTrade({...newTrade, resultR: Number(e.target.value)})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={newTrade.followedRules}
                onChange={(e) => setNewTrade({...newTrade, followedRules: e.target.checked})}
                className="accent-samarth-primary w-4 h-4"
              />
              <span className="text-sm font-medium text-samarth-text group-hover:text-samarth-primary transition-colors">I followed all my rules for this trade.</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Notes</label>
            <textarea 
              value={newTrade.notes}
              onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none h-24 resize-none"
              placeholder="Emotional state, why did this happen?"
            />
          </div>

          <button 
            onClick={handleAddTrade}
            className="w-full py-3 bg-samarth-primary text-white font-bold rounded-lg hover:bg-samarth-primaryHover transition-colors mt-2"
          >
            CONFIRM ENTRY
          </button>
        </div>
      </Modal>
      
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="p-4 flex flex-col items-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Total Trades</span>
            <span className="text-2xl font-bold text-samarth-text mt-1">{trades.length}</span>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Win Rate</span>
            <span className="text-2xl font-bold text-samarth-primary mt-1">{winRate}%</span>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Total R</span>
            <span className={`text-2xl font-bold mt-1 ${Number(totalR) >= 0 ? 'text-samarth-success' : 'text-samarth-danger'}`}>
              {Number(totalR) >= 0 ? '+' : ''}{totalR}R
            </span>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Total P/L</span>
            <span className={`text-2xl font-bold mt-1 ${Number(totalPnL) >= 0 ? 'text-samarth-success' : 'text-samarth-danger'}`}>
              ${totalPnL}
            </span>
          </Card>
          <Card className="p-4 flex flex-col items-center text-center border-samarth-danger/30">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide text-samarth-danger">Rule Breaks</span>
            <span className="text-2xl font-bold text-samarth-danger mt-1">{ruleBreaks}</span>
          </Card>
        </div>

        {/* Analytics Chart */}
        <Card className="h-64 pt-6">
          <h3 className="text-sm font-semibold text-samarth-textSecondary mb-4 px-2">P/L Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#16191f', border: '1px solid #2a2e37', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Line type="monotone" dataKey="pnl" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Data Table */}
        <Card noPadding className="overflow-hidden">
          <div className="p-4 border-b border-samarth-border flex justify-between items-center bg-samarth-bg/50">
            <h3 className="font-semibold text-samarth-text">Journal Entries</h3>
            <button className="flex items-center gap-2 text-sm text-samarth-textSecondary hover:text-samarth-text transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
          {/* Mobile Card View (Hidden on LG+) */}
          <div className="block lg:hidden divide-y divide-samarth-border">
            {trades.map(trade => (
              <div key={trade.id} className="p-4 space-y-3 hover:bg-samarth-bg/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-samarth-textSecondary uppercase tracking-wider">{trade.date}</span>
                    <h4 className="text-base font-bold text-samarth-text mt-0.5">{trade.instrument}</h4>
                    <p className="text-xs text-samarth-textSecondary">{trade.setupType}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${trade.pnl >= 0 ? 'text-samarth-success' : 'text-samarth-danger'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                    </div>
                    <span className="text-xs font-mono text-samarth-textSecondary">{trade.resultR}R</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-samarth-border/30">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                    trade.outcome === 'Win' ? 'bg-samarth-success/10 text-samarth-success' :
                    trade.outcome === 'Loss' ? 'bg-samarth-danger/10 text-samarth-danger' :
                    'bg-samarth-warning/10 text-samarth-warning'
                  }`}>
                    {trade.outcome}
                  </span>
                  <span className={clsx(
                    "text-[10px] font-bold uppercase tracking-widest",
                    trade.followedRules ? "text-samarth-success" : "text-samarth-danger"
                  )}>
                    {trade.followedRules ? "Rules Met" : "Rule Break"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-samarth-textSecondary uppercase bg-samarth-bg/20 border-b border-samarth-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Instrument</th>
                  <th className="px-6 py-4 font-medium">Setup</th>
                  <th className="px-6 py-4 font-medium text-right">R:R</th>
                  <th className="px-6 py-4 font-medium text-right">P/L</th>
                  <th className="px-6 py-4 font-medium text-center">Outcome</th>
                  <th className="px-6 py-4 font-medium text-center">Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-samarth-border">
                {trades.map(trade => (
                  <tr key={trade.id} className="hover:bg-samarth-bg/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-samarth-text">{trade.date}</td>
                    <td className="px-6 py-4 font-medium text-samarth-text">{trade.instrument}</td>
                    <td className="px-6 py-4 text-samarth-textSecondary">{trade.setupType}</td>
                    <td className="px-6 py-4 text-right font-mono text-samarth-text">{trade.resultR}R</td>
                    <td className={`px-6 py-4 text-right font-medium ${trade.pnl >= 0 ? 'text-samarth-success' : 'text-samarth-danger'}`}>
                      ${trade.pnl}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        trade.outcome === 'Win' ? 'bg-samarth-success/10 text-samarth-success' :
                        trade.outcome === 'Loss' ? 'bg-samarth-danger/10 text-samarth-danger' :
                        'bg-samarth-warning/10 text-samarth-warning'
                      }`}>
                        {trade.outcome}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {trade.followedRules ? (
                        <span className="text-samarth-success text-xs font-bold uppercase tracking-wider">Followed</span>
                      ) : (
                        <span className="text-samarth-danger text-xs font-bold uppercase tracking-wider">Broken</span>
                      )}
                    </td>
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
