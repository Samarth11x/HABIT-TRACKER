import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { 
  Clock, 
  Activity, 
  Target, 
  BookOpen, 
  Dumbbell, 
  Save,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Checkbox } from '../components/Checkbox';
import { format } from 'date-fns';
import clsx from 'clsx';

const SCHEDULE = [
  { time: '6:30 AM', task: 'Wake up' },
  { time: '7:15 AM - 2:00 PM', task: 'College' },
  { time: '2:00 PM - 2:30 PM', task: 'Lunch' },
  { time: '2:30 PM - 3:00 PM', task: 'Reset' },
  { time: '3:15 PM - 5:00 PM', task: 'Gym', icon: Dumbbell, color: 'text-samarth-warning' },
  { time: '5:00 PM - 5:30 PM', task: 'Bath/snack' },
  { time: '5:30 PM - 8:00 PM', task: 'Trading / Money block', icon: Target, color: 'text-samarth-success' },
  { time: '8:00 PM - 8:30 PM', task: 'Dinner' },
  { time: '8:30 PM - 10:00 PM', task: 'Study block', icon: BookOpen, color: 'text-samarth-primary' },
  { time: '10:00 PM - 11:00 PM', task: 'Deep growth block' },
  { time: '11:00 PM - 11:30 PM', task: 'Reflection / journal' },
  { time: '11:30 PM - 12:15 AM', task: 'Light pending tasks' },
  { time: '12:15 AM - 1:00 AM', task: 'Wind down / sleep prep' },
];

export function DailyOS() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const dailyOS = useStore(state => state.dailyOS);
  const updateDailyOS = useStore(state => state.updateDailyOS);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const os = dailyOS[today] || {
    id: today,
    date: today,
    disciplineScore: 0,
    mood: 'Neutral',
    energy: 'Constant',
    moneyTask: '',
    studyTask: '',
    bodyTask: '',
    reflectionRight: '',
    reflectionBroke: '',
    reflectionFix: '',
    checklistItems: {
      wakeOnTime: false,
      noPhoneInMorning: false,
      collegeAttended: false,
      noAfternoonSleep: false,
      gymDone: false,
      moneyTaskDone: false,
      studyTaskDone: false,
      bodyTaskDone: false,
      tradingRulesFollowed: false,
      tomorrowTop3Written: false,
    }
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const toggleCheck = (key: keyof typeof os.checklistItems) => {
    const newChecklist = {
      ...os.checklistItems,
      [key]: !os.checklistItems[key]
    };
    
    // Recalculate discipline score (each item is 1 point out of 10)
    const tasksDone = Object.values(newChecklist).filter(Boolean).length;
    
    updateDailyOS(today, {
      checklistItems: newChecklist,
      disciplineScore: tasksDone
    });
  };

  const handleUpdateReflection = (key: 'reflectionRight' | 'reflectionBroke' | 'reflectionFix', value: string) => {
    updateDailyOS(today, { [key]: value });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Daily OS" subtitle="Manage your routine and maintain discipline." action={
        <button 
          onClick={handleSave}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm shadow-lg",
            saveSuccess 
              ? "bg-samarth-success text-white shadow-samarth-success/20" 
              : "bg-samarth-primary hover:bg-samarth-primaryHover text-white shadow-samarth-primary/20"
          )}
        >
          {saveSuccess ? <><CheckCircle2 className="w-4 h-4" /> System Updated</> : <><Save className="w-4 h-4" /> Save Day Updates</>}
        </button>
      } />
      
      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Schedule & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-base font-semibold text-samarth-text mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-samarth-textSecondary" /> Daily Timetable
            </h3>
            <div className="relative border-l-2 border-samarth-border ml-2 pl-4 py-2 space-y-4">
              {SCHEDULE.map((slot, i) => {
                const Icon = slot.icon || Circle;
                return (
                  <div key={i} className="flex items-start gap-4">
                     <div className="absolute -left-[11px] bg-samarth-bg p-1 rounded-full">
                       <Icon className={`w-3 h-3 ${slot.color || 'text-samarth-textSecondary'}`} />
                     </div>
                     <div className="flex-1 -mt-1">
                       <p className="text-sm font-semibold text-samarth-text">{slot.task}</p>
                       <p className="text-xs text-samarth-textSecondary font-mono mt-0.5">{slot.time}</p>
                     </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-samarth-text mb-4">Evening Reflection</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-samarth-success uppercase mb-2 block">What I did right</label>
                <textarea 
                  className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text focus:border-samarth-primary outline-none min-h-[80px] resize-none" 
                  value={os.reflectionRight} 
                  onChange={(e) => handleUpdateReflection('reflectionRight', e.target.value)}
                  placeholder="Focusing on process, following rules..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-samarth-danger uppercase mb-2 block">What I broke</label>
                <textarea 
                  className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text focus:border-samarth-primary outline-none min-h-[80px] resize-none" 
                  value={os.reflectionBroke} 
                  onChange={(e) => handleUpdateReflection('reflectionBroke', e.target.value)}
                  placeholder="Overtrading, sleeping in afternoon..."
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-samarth-primary uppercase mb-2 block">One fix for tomorrow</label>
                <textarea 
                  className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text focus:border-samarth-primary outline-none min-h-[80px] resize-none" 
                  value={os.reflectionFix} 
                  onChange={(e) => handleUpdateReflection('reflectionFix', e.target.value)}
                  placeholder="Limit to 2 trades, set alarm..."
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Score & Checklist */}
        <div className="space-y-6">
           <Card className="items-center text-center">
             <p className="text-sm font-semibold text-samarth-textSecondary tracking-wider uppercase mb-2">Discipline Score</p>
             <div className="relative w-32 h-32 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-samarth-border" />
                 <circle 
                   cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" 
                   strokeDasharray={351.8} 
                   strokeDashoffset={351.8 - (351.8 * (os.disciplineScore || 0)) / 10} 
                   className={clsx(
                     "transition-all duration-1000",
                     (os.disciplineScore || 0) >= 8 ? 'text-samarth-success' : (os.disciplineScore || 0) >= 5 ? 'text-samarth-warning' : 'text-samarth-danger'
                   )} 
                 />
               </svg>
               <div className="absolute flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold text-samarth-text">{os.disciplineScore || 0}</span>
                 <span className="text-xs text-samarth-textSecondary">/ 10</span>
               </div>
             </div>
             <p className="text-xs text-samarth-textSecondary mt-4 font-medium">Mood: <span className="text-samarth-primary">{os.mood}</span> • Energy: <span className="text-samarth-primary">{os.energy}</span></p>
           </Card>

           <Card>
             <h3 className="text-base font-semibold text-samarth-text mb-4 flex items-center gap-2">
               <Activity className="w-5 h-5 text-samarth-textSecondary" /> Today's Checklist
             </h3>
             <div className="space-y-3">
               {[
                 { key: 'wakeOnTime', label: 'Wake up on time' },
                 { key: 'noPhoneInMorning', label: 'No phone in first 15 min' },
                 { key: 'collegeAttended', label: 'College attended' },
                 { key: 'noAfternoonSleep', label: 'No 3-6 PM sleep' },
                 { key: 'gymDone', label: 'Gym done' },
                 { key: 'moneyTaskDone', label: '1 Money Task done' },
                 { key: 'studyTaskDone', label: '1 Study Task done' },
                 { key: 'bodyTaskDone', label: '1 Body/Self Task done' },
                 { key: 'tradingRulesFollowed', label: 'Trading rules followed' },
                 { key: 'tomorrowTop3Written', label: "Tomorrow's Top 3 written" }
               ].map((item) => {
                 // @ts-ignore dynamic index
                 const isChecked = os.checklistItems[item.key as keyof typeof os.checklistItems];
                 return (
                   <Checkbox
                     key={item.key}
                     checked={isChecked}
                     onChange={() => toggleCheck(item.key as keyof typeof os.checklistItems)}
                     label={item.label}
                   />
                 );
               })}
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
