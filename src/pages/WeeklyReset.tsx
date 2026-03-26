import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useStore } from '../store/useStore';
import { BarChart3, Briefcase, BookOpen, Activity, ChevronRight, ChevronLeft } from 'lucide-react';

export function WeeklyReset() {
  const { weeklyResets } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  const currentWeekly = weeklyResets[0];

  if (!currentWeekly) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Weekly Reset" subtitle="Sunday premium review and planning system." action={
        <button 
          onClick={() => {
            setStep(1);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-samarth-primary hover:bg-samarth-primaryHover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-samarth-primary/20"
        >
          Start Review
        </button>
      } />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Weekly Review: Step ${step} of 4`}
        maxWidth="lg"
      >
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-samarth-text flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-samarth-primary" /> Trading Reflection
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Most Emotional Mistake</label>
                  <textarea className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary h-20 resize-none" placeholder="Did you revenge trade? Over-leverage?" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Lesson of the Week</label>
                  <textarea className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary h-20 resize-none" placeholder="What will you do differently?" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-samarth-text flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-samarth-success" /> Business Status
              </h3>
              <p className="text-sm text-samarth-textSecondary">Total Sales this week: <span className="text-samarth-text font-bold">${currentWeekly.businessSummary.weeklySales}</span></p>
              <div>
                <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Inventory / Logistics Notes</label>
                <textarea className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary h-24 resize-none" placeholder="Stock levels? Customer feedback?" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-samarth-text flex items-center gap-2">
                <Activity className="w-5 h-5 text-samarth-danger" /> Discipline & Health
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-samarth-bg border border-samarth-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-samarth-text">{currentWeekly.disciplineSummary.gymDaysCompleted}/7</p>
                  <p className="text-xs text-samarth-textSecondary font-bold uppercase mt-1">Gym Days</p>
                </div>
                <div className="p-4 bg-samarth-bg border border-samarth-border rounded-lg text-center">
                  <p className="text-2xl font-bold text-samarth-text">{currentWeekly.disciplineSummary.daysNoAfternoonSleep}/7</p>
                  <p className="text-xs text-samarth-textSecondary font-bold uppercase mt-1">No Day Sleep</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Main Distraction of the Week</label>
                <input type="text" className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary" defaultValue={currentWeekly.disciplineSummary.biggestDistraction} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold text-samarth-text">Next Week Priority</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-samarth-success uppercase mb-1">Money Goal</label>
                  <input type="text" className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary" placeholder="Specific focus..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-samarth-warning uppercase mb-1">Study Goal</label>
                  <input type="text" className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary" placeholder="Specific focus..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-samarth-primary uppercase mb-1">Discipline Goal</label>
                  <input type="text" className="w-full bg-samarth-bg border border-samarth-border rounded-lg p-3 text-sm text-samarth-text outline-none focus:border-samarth-primary" placeholder="Specific focus..." />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-samarth-border">
            <button 
              disabled={step === 1}
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1 text-sm text-samarth-textSecondary hover:text-samarth-text disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            
            {step < 4 ? (
              <button 
                onClick={() => setStep(s => s + 1)}
                className="bg-samarth-border text-samarth-text px-6 py-2 rounded-lg font-bold text-sm hover:bg-samarth-bg transition-colors flex items-center gap-1"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-samarth-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-samarth-primaryHover transition-colors shadow-lg shadow-samarth-primary/20"
              >
                COMPLETE REVIEW
              </button>
            )}
          </div>
        </div>
      </Modal>
      
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top Summary */}
        <Card className="bg-gradient-to-r from-samarth-card to-samarth-bg border-l-4 border-l-samarth-primary">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
             <div>
               <p className="text-sm font-bold text-samarth-primary tracking-widest uppercase">Week of {currentWeekly.weekStart}</p>
               <h2 className="text-2xl font-bold text-samarth-text mt-1">Ready for next week's discipline?</h2>
             </div>
             <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wider mb-1">Avg Discipline</p>
                  <p className="text-xl font-bold text-samarth-success">{currentWeekly.disciplineSummary.averageDisciplineScore}/10</p>
                </div>
                <div className="w-px bg-samarth-border mx-2"></div>
                <div className="text-center">
                  <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wider mb-1">Rules Broken</p>
                  <p className="text-xl font-bold text-samarth-danger">{currentWeekly.tradingSummary.rulesBroken}</p>
                </div>
             </div>
          </div>
        </Card>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trading Review */}
          <Card>
             <h3 className="text-base font-bold text-samarth-text mb-4 pb-2 border-b border-samarth-border flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-samarth-primary" /> Trading Review
             </h3>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-samarth-bg p-3 border border-samarth-border rounded text-center">
                     <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-widest">Total Trades</p>
                     <p className="text-xl font-bold text-samarth-text mt-1">{currentWeekly.tradingSummary.totalTrades}</p>
                  </div>
                  <div className="bg-samarth-bg p-3 border border-samarth-border rounded text-center">
                     <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-widest">Live Days</p>
                     <p className="text-xl font-bold text-samarth-text mt-1">{currentWeekly.tradingSummary.liveDays}</p>
                  </div>
                </div>
                <div className="space-y-2">
                   <div>
                     <p className="text-xs text-samarth-success font-bold uppercase tracking-widest">Best Trade</p>
                     <p className="text-sm text-samarth-text">{currentWeekly.tradingSummary.bestTrade}</p>
                   </div>
                   <div>
                     <p className="text-xs text-samarth-danger font-bold uppercase tracking-widest">Worst Trade</p>
                     <p className="text-sm text-samarth-text">{currentWeekly.tradingSummary.worstTrade}</p>
                   </div>
                   <div className="pt-2 border-t border-samarth-border border-dashed">
                     <p className="text-xs text-samarth-warning font-bold uppercase tracking-widest">Main Mistake</p>
                     <p className="text-sm text-samarth-text">{currentWeekly.tradingSummary.mainEmotionalMistake}</p>
                   </div>
                </div>
             </div>
          </Card>

          {/* Business Review */}
          <Card>
             <h3 className="text-base font-bold text-samarth-text mb-4 pb-2 border-b border-samarth-border flex items-center gap-2">
               <Briefcase className="w-5 h-5 text-samarth-success" /> Business Review
             </h3>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-samarth-bg p-3 border border-samarth-border rounded text-center">
                     <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-widest">Weekly Sales</p>
                     <p className="text-xl font-bold text-samarth-success mt-1">${currentWeekly.businessSummary.weeklySales}</p>
                  </div>
                  <div className="bg-samarth-bg p-3 border border-samarth-border rounded text-center">
                     <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-widest">Net Profit</p>
                     <p className="text-xl font-bold text-samarth-primary mt-1">${currentWeekly.businessSummary.weeklyNetProfit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${currentWeekly.businessSummary.allEntriesUpdated ? 'bg-samarth-success' : 'bg-samarth-warning'}`}></div>
                  <span className="text-samarth-textSecondary">
                    {currentWeekly.businessSummary.allEntriesUpdated ? 'All data synced' : `Missing ${currentWeekly.businessSummary.missingDataCount} entry days`}
                  </span>
                </div>
             </div>
          </Card>

          {/* Study Review */}
          <Card>
             <h3 className="text-base font-bold text-samarth-text mb-4 pb-2 border-b border-samarth-border flex items-center gap-2">
               <BookOpen className="w-5 h-5 text-samarth-warning" /> Study Review
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-samarth-text">{currentWeekly.studySummary.assignmentsCompleted}</span>
                  <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wider mt-1">Assignments Done</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-samarth-text">{currentWeekly.studySummary.coursesCompleted}</span>
                  <p className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wider mt-1">Courses Done</p>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-samarth-border">
                <p className="text-xs text-samarth-primary font-bold uppercase tracking-widest mb-1">Backlog Priority</p>
                <p className="text-sm font-medium text-samarth-text">{currentWeekly.studySummary.backlogPriority}</p>
                <p className="text-xs text-samarth-danger mt-1">Pending tasks: {currentWeekly.studySummary.pendingTasks}</p>
             </div>
          </Card>

          {/* Health & Discipline Review */}
          <Card>
             <h3 className="text-base font-bold text-samarth-text mb-4 pb-2 border-b border-samarth-border flex items-center gap-2">
               <Activity className="w-5 h-5 text-samarth-danger" /> Health & Discipline
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-samarth-textSecondary">Gym Days Completed</span>
                  <span className="font-bold text-samarth-text">{currentWeekly.disciplineSummary.gymDaysCompleted} / 7</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-samarth-textSecondary">No Afternoon Sleep</span>
                  <span className="font-bold text-samarth-text">{currentWeekly.disciplineSummary.daysNoAfternoonSleep} / 7</span>
                </div>
                <div className="mt-4 p-3 bg-samarth-bg border border-samarth-danger/30 rounded">
                   <p className="text-xs text-samarth-danger font-bold uppercase tracking-widest mb-1">Biggest Distraction</p>
                   <p className="text-sm font-medium text-samarth-text">{currentWeekly.disciplineSummary.biggestDistraction}</p>
                </div>
             </div>
          </Card>
        </div>

        {/* Next Week Target */}
        <Card className="border-samarth-primary/30 shadow-lg shadow-samarth-primary/5">
           <h3 className="text-xl font-bold text-samarth-text mb-6">Execution Focus For Next Week</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-samarth-success uppercase tracking-widest mb-2 border-b border-samarth-border pb-1">Money Focus</p>
                <p className="text-sm font-medium text-samarth-text">{currentWeekly.nextWeekFocus.mainMoneyFocus}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-samarth-warning uppercase tracking-widest mb-2 border-b border-samarth-border pb-1">Study Focus</p>
                <p className="text-sm font-medium text-samarth-text">{currentWeekly.nextWeekFocus.mainStudyFocus}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-samarth-primary uppercase tracking-widest mb-2 border-b border-samarth-border pb-1">Discipline Focus</p>
                <p className="text-sm font-medium text-samarth-text">{currentWeekly.nextWeekFocus.mainDisciplineFocus}</p>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
