import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ShieldAlert, AlertTriangle, Crosshair, Ban } from 'lucide-react';

const PRE_TRADE_ITEMS = [
  'HTF bias clear (4H/1H)?',
  'Liquidity identified?',
  'Premium / discount clear?',
  'Sweep happened?',
  'FVG mitigation valid?',
  'Structure confirmation?',
  'SL & TP set? (RR >= 1:2)',
  'Calm emotional state?'
];

const POST_TRADE_ITEMS = [
  'Screenshot saved',
  'Rules followed strictly?',
  'No emotional override?',
  'Setup valid according to plan?',
  'Journal entry logged?'
];

export function CommandCenter() {
  const [preChecks, setPreChecks] = useState<Record<string, boolean>>({});
  const [postChecks, setPostChecks] = useState<Record<string, boolean>>({});

  const togglePre = (item: string) => {
    setPreChecks(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const togglePost = (item: string) => {
    setPostChecks(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Trading Command Center" subtitle="Live session control. Execute flawlessly." action={
        <div className="px-4 py-2 bg-samarth-danger/10 text-samarth-danger border border-samarth-danger/30 rounded-lg text-sm font-bold animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-samarth-danger"></div>
          LIVE SESSION
        </div>
      }/>
      
      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Main Live Window */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[400px] flex flex-col justify-center items-center border-samarth-border border-dashed bg-samarth-bg/50 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <ShieldAlert className="w-64 h-64" />
            </div>
            <Crosshair className="w-12 h-12 text-samarth-textSecondary mb-4" />
            <h2 className="text-xl font-bold text-samarth-text mb-2">Live Trading Window</h2>
            <p className="text-samarth-textSecondary text-sm text-center max-w-sm">
              Focus strictly on XAUUSD, 5M entry timeframe. Ensure all pre-trade checklist items are met before execution.
            </p>
            <div className="flex items-center gap-4 mt-8 w-full max-w-sm px-6">
               <button className="flex-1 py-3 bg-samarth-success/10 text-samarth-success border border-samarth-success/30 rounded-lg font-bold hover:bg-samarth-success/20 transition-colors">
                 LONG
               </button>
               <button className="flex-1 py-3 bg-samarth-danger/10 text-samarth-danger border border-samarth-danger/30 rounded-lg font-bold hover:bg-samarth-danger/20 transition-colors">
                 SHORT
               </button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-base font-semibold text-samarth-text mb-4 border-b border-samarth-border pb-2 uppercase tracking-wider text-xs">Pre-Trade Checklist</h3>
              <div className="space-y-3">
                {PRE_TRADE_ITEMS.map((item) => (
                  <Checkbox 
                    key={item}
                    checked={!!preChecks[item]}
                    onChange={() => togglePre(item)}
                    label={item}
                  />
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-semibold text-samarth-text mb-4 border-b border-samarth-border pb-2 uppercase tracking-wider text-xs">Post-Trade Checklist</h3>
              <div className="space-y-3">
                {POST_TRADE_ITEMS.map((item) => (
                  <Checkbox 
                    key={item}
                    checked={!!postChecks[item]}
                    onChange={() => togglePost(item)}
                    label={item}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Status / Rules */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-samarth-card items-center justify-center p-8 to-samarth-bg">
             <p className="text-xs font-bold uppercase text-samarth-textSecondary tracking-widest mb-1">Session Limit</p>
             <div className="text-5xl font-black text-samarth-text my-2">0 <span className="text-2xl text-samarth-textSecondary">/ 2</span></div>
             <p className="text-sm text-samarth-textSecondary">Max Trades Permitted</p>
          </Card>

          <Card className="border-samarth-danger/50 p-6 shadow-lg shadow-samarth-danger/5">
             <h3 className="text-base font-semibold text-samarth-danger flex items-center gap-2 mb-4">
               <Ban className="w-5 h-5" /> Hard Rules
             </h3>
             <ul className="space-y-3">
               <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-danger">•</span> 2 losses = stop</li>
               <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-danger">•</span> 2 wins = stop</li>
               <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-danger">•</span> 1 emotional trade = stop</li>
               <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-danger">•</span> No revenge trades</li>
               <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-danger">•</span> Hard close by 8:00 PM</li>
             </ul>
          </Card>

          <Card className="bg-samarth-warning/10 border-samarth-warning/30 p-6">
            <h3 className="text-sm font-bold text-samarth-warning flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" /> Recovery Mode rules
            </h3>
            <p className="text-xs text-samarth-text font-medium leading-relaxed">
              If recovered from red to break-even or a small green → shift immediately to defensive mode. Capital preservation is priority one. Do not push luck.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
