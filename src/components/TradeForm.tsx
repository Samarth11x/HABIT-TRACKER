import { useState } from 'react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';

interface TradeFormProps {
  onSuccess: () => void;
  initialOutcome?: 'Win' | 'Loss' | 'Break-even';
}

export function TradeForm({ onSuccess, initialOutcome }: TradeFormProps) {
  const addTrade = useStore(state => state.addTrade);
  
  const [newTrade, setNewTrade] = useState({
    instrument: 'XAUUSD',
    setupType: 'FVG Mitigation',
    outcome: initialOutcome || 'Win' as 'Win' | 'Loss' | 'Break-even',
    pnl: 0,
    resultR: 0,
    followedRules: true,
    notes: ''
  });

  const handleAddTrade = () => {
    const pnlValue = newTrade.outcome === 'Loss' ? -Math.abs(newTrade.pnl) : Math.abs(newTrade.pnl);
    
    addTrade({
      id: crypto.randomUUID(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...newTrade,
      pnl: pnlValue
    });
    
    onSuccess();
    
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

  return (
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
  );
}
