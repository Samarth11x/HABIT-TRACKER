export interface DailyOS {
  date: string; // YYYY-MM-DD
  moneyTask: string;
  studyTask: string;
  bodyTask: string;
  checklistItems: {
    wakeOnTime: boolean;
    noPhoneInMorning: boolean;
    collegeAttended: boolean;
    noAfternoonSleep: boolean;
    gymDone: boolean;
    moneyTaskDone: boolean;
    studyTaskDone: boolean;
    bodyTaskDone: boolean;
    tradingRulesFollowed: boolean;
    tomorrowTop3Written: boolean;
  };
  disciplineScore: number; // /10
  mood: string;
  energy: string;
  reflectionRight: string;
  reflectionBroke: string;
  reflectionFix: string;
}

export interface Trade {
  id: string;
  date: string;
  day?: string;
  session?: string;
  instrument: string;
  bias?: string;
  setupType: string;
  entryTF?: string;
  entryPrice?: number;
  sl?: number;
  tp?: number;
  riskPercent?: number;
  plannedRR?: number;
  resultR: number;
  pnl: number;
  outcome: 'Win' | 'Loss' | 'Break-even' | 'BE';
  isAPlus?: boolean;
  followedRules: boolean;
  emotional?: boolean;
  mistakeType?: string;
  screenshotUrl?: string;
  notes: string;
  lesson?: string;
  disciplineScore?: number;
}

export interface BusinessEntry {
  id: string;
  date: string; // YYYY-MM-DD
  salesEntered: boolean;
  totalSales: number;
  totalPieces: number;
  expense: number;
  netProfit: number;
  cashCollected: number;
  upiCollected: number;
  pendingEntry: boolean;
  customerFollowUp: string;
  notes: string;
}

export interface StudyEntry {
  id: string;
  date: string; // YYYY-MM-DD
  subjectOrCourse: string;
  type: 'Assignment' | 'Coursera' | 'Revision' | 'Coding';
  topicOrModule: string;
  durationMinutes: number;
  completed: boolean;
  notes: string;
  nextStep: string;
}

export interface WeeklyReset {
  id: string;
  weekStart: string; // YYYY-MM-DD
  tradingSummary: {
    liveDays: number;
    totalTrades: number;
    rulesBroken: number;
    bestTrade: string;
    worstTrade: string;
    mainEmotionalMistake: string;
    improvementFocus: string;
  };
  businessSummary: {
    allEntriesUpdated: boolean;
    weeklySales: number;
    weeklyExpenses: number;
    weeklyNetProfit: number;
    missingDataCount: number;
  };
  studySummary: {
    assignmentsCompleted: number;
    coursesCompleted: number;
    pendingTasks: number;
    backlogPriority: string;
  };
  disciplineSummary: {
    gymDaysCompleted: number;
    daysNoAfternoonSleep: number;
    biggestDistraction: string;
    averageDisciplineScore: number;
  };
  nextWeekFocus: {
    mainMoneyFocus: string;
    mainStudyFocus: string;
    mainDisciplineFocus: string;
  };
}
