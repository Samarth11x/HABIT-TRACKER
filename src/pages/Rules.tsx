import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { ShieldAlert, Crosshair, Activity } from 'lucide-react';

export function Rules() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Rules I Do Not Break" subtitle="High accountability. No exceptions." />
      
      <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto w-full">
        <div className="text-center py-8">
          <ShieldAlert className="w-16 h-16 text-samarth-danger mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-samarth-text tracking-tight uppercase">
            "I am building a system stronger than my mood."
          </h2>
          <div className="w-24 h-1 bg-samarth-danger mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-samarth-danger/50 shadow-lg shadow-samarth-danger/5">
            <h3 className="text-lg font-bold text-samarth-danger mb-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5" /> Trading Rules
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">01</span> Max 2 trades per day.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">02</span> 2 losses = stop for the day.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">03</span> 2 wins = stop for the day.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">04</span> 1 emotional trade = stop immediately.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">05</span> No trades after 8 PM.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-danger font-bold mt-0.5">06</span> My day is judged by discipline, not only by money.</li>
            </ul>
          </Card>

          <Card className="border-samarth-primary/50 shadow-lg shadow-samarth-primary/5">
            <h3 className="text-lg font-bold text-samarth-primary mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Daily Non-Negotiables
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-primary font-bold mt-0.5">01</span> No sleeping from 3 PM to 6 PM.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-primary font-bold mt-0.5">02</span> If tired, only 15–20 minute max power nap.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-primary font-bold mt-0.5">03</span> Gym is fixed from 3:15 PM – 5:00 PM.</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-primary font-bold mt-0.5">04</span> Every day must include:<br/>- 1 Money Task<br/>- 1 Study Task<br/>- 1 Body / Self Task</li>
              <li className="flex gap-3 text-samarth-text font-medium"><span className="text-samarth-primary font-bold mt-0.5">05</span> Before sleep, write tomorrow’s Top 3.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
