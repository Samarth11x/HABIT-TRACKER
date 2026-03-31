import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Checkbox } from '../components/Checkbox';
import { useStore } from '../store/useStore';
import { Plus, Clock, BookOpen, Code, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

const TYPE_ICONS = {
  'Assignment': BookOpen,
  'Coursera': GraduationCap,
  'Coding': Code,
  'Revision': Clock
};

export function StudyTracker() {
  const studyEntries = useStore(state => state.studyEntries);
  const toggleStudyCompletion = useStore(state => state.toggleStudyCompletion);
  const addStudyEntry = useStore(state => state.addStudyEntry);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    subjectOrCourse: '',
    topicOrModule: '',
    type: 'Assignment' as 'Assignment' | 'Coursera' | 'Coding' | 'Revision',
    durationMinutes: 60,
    notes: '',
    nextStep: ''
  });

  const handleAddTask = () => {
    addStudyEntry({
      id: crypto.randomUUID(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...newTask,
      completed: false
    });
    setIsModalOpen(false);
    setNewTask({
      subjectOrCourse: '',
      topicOrModule: '',
      type: 'Assignment',
      durationMinutes: 60,
      notes: '',
      nextStep: ''
    });
  };

  const totalMinutes = studyEntries.reduce((sum, e) => sum + e.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const completedCount = studyEntries.filter(e => e.completed).length;
  const assignmentsDone = studyEntries.filter(e => e.completed && e.type === 'Assignment').length;
  const backlogCount = studyEntries.filter(e => !e.completed).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Study Tracker" subtitle="Manage assignments, Coursera, and continuous learning." action={
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-samarth-primary hover:bg-samarth-primaryHover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-samarth-primary/20"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      } />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add Study Task"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Subject / Course</label>
            <input 
              type="text" 
              value={newTask.subjectOrCourse}
              onChange={(e) => setNewTask({...newTask, subjectOrCourse: e.target.value})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              placeholder="e.g. Computer Networks"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Topic / Module</label>
            <input 
              type="text" 
              value={newTask.topicOrModule}
              onChange={(e) => setNewTask({...newTask, topicOrModule: e.target.value})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              placeholder="e.g. TCP/IP Layer Deep Dive"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Type</label>
              <select 
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value as any})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              >
                <option value="Assignment">Assignment</option>
                <option value="Coursera">Coursera</option>
                <option value="Coding">Coding</option>
                <option value="Revision">Revision</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Duration (Min)</label>
              <input 
                type="number" 
                value={newTask.durationMinutes}
                onChange={(e) => setNewTask({...newTask, durationMinutes: Number(e.target.value)})}
                className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-samarth-textSecondary uppercase mb-1">Next Step</label>
            <input 
              type="text" 
              value={newTask.nextStep}
              onChange={(e) => setNewTask({...newTask, nextStep: e.target.value})}
              className="w-full bg-samarth-bg border border-samarth-border text-samarth-text rounded-lg px-3 py-2 text-sm focus:border-samarth-primary outline-none"
              placeholder="e.g. Complete exercise 2.1"
            />
          </div>
          
          <button 
            onClick={handleAddTask}
            className="w-full py-3 bg-samarth-primary text-white font-bold rounded-lg hover:bg-samarth-primaryHover transition-colors mt-2"
          >
            ADD TO STUDY LOG
          </button>
        </div>
      </Modal>

      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Total Study Hours</span>
            <span className="text-2xl font-bold text-samarth-primary mt-1">{totalHours}h</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Assignments Done</span>
            <span className="text-2xl font-bold text-samarth-success mt-1">{assignmentsDone}</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide">Completion Rate</span>
            <span className="text-2xl font-bold text-samarth-text mt-1">{Math.round((completedCount/studyEntries.length)*100) || 0}%</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center border-samarth-danger/30">
            <span className="text-xs text-samarth-textSecondary font-semibold uppercase tracking-wide text-samarth-danger">Backlog / Pending</span>
            <span className="text-2xl font-bold text-samarth-danger mt-1">{backlogCount}</span>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden" noPadding>
            <div className="p-4 border-b border-samarth-border bg-samarth-bg/50">
              <h3 className="font-semibold text-samarth-text">Study Log</h3>
            </div>
            <div className="divide-y divide-samarth-border overflow-y-auto max-h-[500px]">
              {studyEntries.map(entry => {
                const Icon = TYPE_ICONS[entry.type];
                return (
                  <div key={entry.id} className={clsx("p-4 flex items-start gap-4 hover:bg-samarth-bg/30 transition-colors", entry.completed && "opacity-60")}>
                    <Checkbox 
                      checked={entry.completed} 
                      onChange={() => toggleStudyCompletion(entry.id)} 
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-samarth-text">{entry.subjectOrCourse}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-samarth-bg border border-samarth-border text-samarth-textSecondary flex items-center gap-1">
                          <Icon className="w-3 h-3" /> {entry.type}
                        </span>
                        <span className="text-xs text-samarth-textSecondary ml-auto flex items-center gap-1">
                           <Clock className="w-3 h-3" /> {entry.durationMinutes}m
                        </span>
                      </div>
                      <p className="text-sm text-samarth-textSecondary mb-2">{entry.topicOrModule}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                         {entry.notes && <span className="px-2 py-1 bg-samarth-card rounded border border-samarth-border text-samarth-textSecondary font-medium">Note: {entry.notes}</span>}
                         {!entry.completed && entry.nextStep && <span className="px-2 py-1 bg-samarth-primary/10 text-samarth-primary rounded font-medium">Next: {entry.nextStep}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-samarth-warning/30 bg-samarth-warning/5">
              <h3 className="text-sm font-semibold text-samarth-warning mb-4 uppercase tracking-wider">Weekly Focus</h3>
              <ul className="space-y-3">
                <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-warning">•</span> Clear pending Assignments</li>
                <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-warning">•</span> 2 hrs of focused Coding</li>
                <li className="text-sm text-samarth-text font-medium flex gap-2"><span className="text-samarth-warning">•</span> Coursera Week 2 Module</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-samarth-text mb-4 uppercase tracking-wider">Distribution</h3>
              <div className="space-y-3">
                {['Assignment', 'Coursera', 'Coding', 'Revision'].map((type) => {
                  const count = studyEntries.filter(e => e.type === type).length;
                  const pct = Math.round((count / (studyEntries.length || 1)) * 100);
                  
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-samarth-textSecondary font-medium uppercase">{type}</span>
                        <span className="text-samarth-text">{pct}%</span>
                      </div>
                      <div className="w-full bg-samarth-bg h-1.5 rounded-full overflow-hidden">
                        <div className="bg-samarth-primary h-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
