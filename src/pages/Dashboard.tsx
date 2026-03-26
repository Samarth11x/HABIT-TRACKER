import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { 
  Target, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BookOpen, 
  Briefcase, 
  Plus, 
  ShieldAlert, 
  CheckSquare, 
  RefreshCw 
} from 'lucide-react';

export function Dashboard() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { dailyOS, trades } = useStore();
  
  const todayOS = dailyOS['2026-03-25'] || dailyOS[today] || null;
  const todayTrades = trades.filter(t => t.date === '2026-03-25' || t.date === today);
  const todayPnl = todayTrades.reduce((sum, t) => sum + (typeof t.pnl === 'number' ? t.pnl : 0), 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Command Center" subtitle="System over mood. Discipline over emotion." />
      
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* ROW 1: Top Level Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <Card className="col-span-1 bg-gradient-to-br from-samarth-card to-samarth-bg">
            <h2 className="text-xl font-bold text-samarth-text">SAMARTH OS</h2>
            <p className="text-sm text-samarth-textSecondary mt-1">System over mood. Discipline over emotion.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-samarth-primary/10 text-samarth-primary rounded-md text-xs font-semibold uppercase tracking-wider">Trader</span>
              <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Builder</span>
              <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Student</span>
              <span className="px-3 py-1 bg-samarth-border text-samarth-text rounded-md text-xs font-semibold uppercase tracking-wider">Athlete</span>
            </div>
          </Card>

          {/* Today Snapshot */}
          <Card className="col-span-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-samarth-textSecondary">Today's Progress</p>
                <div className="text-3xl font-bold text-samarth-text mt-1">{todayOS?.disciplineScore || 0}<span className="text-lg text-samarth-textSecondary">/10</span></div>
                <p className="text-xs text-samarth-success mt-1 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Discipline Score
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-samarth-textSecondary">Energy</p>
                <div className="text-lg font-semibold text-samarth-primary mt-1">{todayOS?.energy || 'N/A'}</div>
              </div>
            </div>
          </Card>

          {/* Streaks */}
          <Card className="col-span-1">
            <p className="text-sm font-medium text-samarth-textSecondary mb-4">Consistency</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-samarth-text flex items-center gap-2"><Zap className="w-4 h-4 text-samarth-warning" /> Gym Streak</span>
                <span className="text-sm font-bold text-samarth-text">5 Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-samarth-text flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-samarth-success" /> Rule-Follow Streak</span>
                <span className="text-sm font-bold text-samarth-text">3 Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-samarth-text flex items-center gap-2"><AlertCircle className="w-4 h-4 text-samarth-primary" /> No 3-6 PM Sleep</span>
                <span className="text-sm font-bold text-samarth-text">8 Days</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 2: Focus & Action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Top 3 */}
          <Card className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-samarth-primary" />
              <h3 className="text-base font-semibold text-samarth-text">Today's Top 3</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-samarth-bg rounded-lg border border-samarth-border">
                <p className="text-xs text-samarth-success font-medium mb-1">MONEY</p>
                <p className="text-sm text-samarth-text">{todayOS?.moneyTask || 'Not set'}</p>
              </div>
              <div className="p-3 bg-samarth-bg rounded-lg border border-samarth-border">
                <p className="text-xs text-samarth-warning font-medium mb-1">STUDY</p>
                <p className="text-sm text-samarth-text">{todayOS?.studyTask || 'Not set'}</p>
              </div>
              <div className="p-3 bg-samarth-bg rounded-lg border border-samarth-border">
                <p className="text-xs text-samarth-primary font-medium mb-1">BODY / SELF</p>
                <p className="text-sm text-samarth-text">{todayOS?.bodyTask || 'Not set'}</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-1">
            <h3 className="text-base font-semibold text-samarth-text mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/command-center" className="flex flex-col items-center justify-center p-4 bg-samarth-bg border border-samarth-border rounded-lg hover:border-samarth-danger/50 hover:shadow-lg hover:shadow-samarth-danger/5 transition-all group active:scale-[0.98]">
                <ShieldAlert className="w-6 h-6 text-samarth-danger mb-2 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold text-samarth-text uppercase tracking-wider">Live Session</span>
              </Link>
              <Link to="/daily-os" className="flex flex-col items-center justify-center p-4 bg-samarth-bg border border-samarth-border rounded-lg hover:border-samarth-primary/50 hover:shadow-lg hover:shadow-samarth-primary/5 transition-all group active:scale-[0.98]">
                <CheckSquare className="w-6 h-6 text-samarth-primary mb-2 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold text-samarth-text uppercase tracking-wider">Update Log</span>
              </Link>
              <Link to="/trading-journal" className="flex flex-col items-center justify-center p-4 bg-samarth-bg border border-samarth-border rounded-xl hover:border-samarth-success/50 hover:shadow-lg hover:shadow-samarth-success/5 transition-all group active:scale-[0.98]">
                <Plus className="w-6 h-6 text-samarth-success mb-2 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold text-samarth-text uppercase tracking-wider">Add Trade</span>
              </Link>
              <Link to="/weekly-reset" className="flex flex-col items-center justify-center p-4 bg-samarth-bg border border-samarth-border rounded-xl hover:border-samarth-warning/50 hover:shadow-lg hover:shadow-samarth-warning/5 transition-all group active:scale-[0.98]">
                <RefreshCw className="w-6 h-6 text-samarth-warning mb-2 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold text-samarth-text uppercase tracking-wider">Weekly Reset</span>
              </Link>
            </div>
          </Card>

          {/* Rules Mini Panel */}
          <Card className="col-span-1 border-samarth-danger/30">
            <h3 className="text-base font-semibold text-samarth-danger mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Active Rules
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-samarth-text flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-samarth-danger mt-1.5" />
                Max 2 trades per day (Auto-stop)
              </li>
              <li className="text-sm text-samarth-text flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-samarth-danger mt-1.5" />
                No 3 - 6 PM sleep
              </li>
              <li className="text-sm text-samarth-text flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-samarth-warning mt-1.5" />
                Gym strictly at 3:15 PM - 5:00 PM
              </li>
              <li className="text-sm text-samarth-text flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-samarth-primary mt-1.5" />
                1 Money + 1 Study + 1 Body task daily
              </li>
            </ul>
          </Card>
        </div>

        {/* ROW 3: Snapshots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trading Snapshot */}
          <Card className="col-span-1">
            <h3 className="text-base font-semibold text-samarth-text mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-samarth-success" /> Trading Snapshot
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-samarth-textSecondary">Trades Today</span>
                <span className="text-lg font-bold text-samarth-text">{todayTrades.length}/2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-samarth-textSecondary">P/L Today</span>
                <span className={`text-lg font-bold ${todayPnl >= 0 ? 'text-samarth-success' : 'text-samarth-danger'}`}>
                  {todayPnl >= 0 ? '+' : ''}${todayPnl.toFixed(2)}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-samarth-border">
                <p className="text-xs font-medium text-samarth-success">EMOTIONAL RISK: CLEAR</p>
                <div className="w-full bg-samarth-border h-1.5 rounded-full mt-2">
                  <div className="bg-samarth-success h-1.5 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Business & Study */}
          <Card className="col-span-2">
            <h3 className="text-base font-semibold text-samarth-text mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-samarth-primary" /> Daily Operations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wider mb-3">Business (Retail)</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-samarth-text">Sales Pending Entry</span>
                    <span className="font-bold text-samarth-warning">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-samarth-text">Today's Sales</span>
                    <span className="font-bold text-samarth-text">$450.00</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-samarth-textSecondary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Study / Coursera
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-samarth-text">Study Minutes</span>
                    <span className="font-bold text-samarth-primary">135m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-samarth-text">Tasks Done</span>
                    <span className="font-bold text-samarth-text">1 / 2</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
