import type { DailyOS, Trade, BusinessEntry, StudyEntry, WeeklyReset } from './types';

export const mockDailyOS: Record<string, DailyOS> = {
  '2026-03-25': {
    date: '2026-03-25',
    moneyTask: 'Review trading journal and log 2 trades',
    studyTask: 'Complete Coursera React Module 3',
    bodyTask: 'Chest & Triceps workout, 45 mins',
    checklistItems: {
      wakeOnTime: true,
      noPhoneInMorning: true,
      collegeAttended: false, // Weekend/Day off
      noAfternoonSleep: true,
      gymDone: true,
      moneyTaskDone: true,
      studyTaskDone: false,
      bodyTaskDone: true,
      tradingRulesFollowed: true,
      tomorrowTop3Written: false,
    },
    disciplineScore: 8,
    mood: 'Focused',
    energy: 'High',
    reflectionRight: 'Followed trading rules strictly, no emotional trades.',
    reflectionBroke: 'Missed my study block.',
    reflectionFix: 'Use the Pomodoro technique tomorrow for study.',
  }
};

export const mockTrades: Trade[] = [
  {
    id: 't-1',
    date: '2026-03-24',
    day: 'Tuesday',
    session: 'Main',
    instrument: 'XAUUSD',
    bias: 'Bullish',
    setupType: 'Liquidity sweep + FVG',
    entryTF: '5M',
    entryPrice: 2025.50,
    sl: 2020.00,
    tp: 2040.00,
    riskPercent: 1.0,
    plannedRR: 2.63,
    resultR: 2.63,
    pnl: 150.00,
    outcome: 'Win',
    isAPlus: true,
    followedRules: true,
    emotional: false,
    mistakeType: 'None',
    screenshotUrl: '',
    notes: 'Textbook setup during NY open.',
    lesson: 'Patience pays off. Waited for the 5m confirmation before executing.',
    disciplineScore: 10,
  },
  {
    id: 't-2',
    date: '2026-03-24',
    day: 'Tuesday',
    session: 'Main',
    instrument: 'XAUUSD',
    bias: 'Bearish',
    setupType: 'Structure confirmation',
    entryTF: '5M',
    entryPrice: 2045.00,
    sl: 2050.00,
    tp: 2035.00,
    riskPercent: 1.0,
    plannedRR: 2.0,
    resultR: -1.0,
    pnl: -50.00,
    outcome: 'Loss',
    isAPlus: false,
    followedRules: true,
    emotional: false,
    mistakeType: 'Impatient Entry',
    screenshotUrl: '',
    notes: 'Entered slightly early before structure break confirmed.',
    lesson: 'Wait for candle close.',
    disciplineScore: 8,
  },
  {
    id: 't-3',
    date: '2026-03-23',
    day: 'Monday',
    session: 'Pre-market',
    instrument: 'XAUUSD',
    bias: 'Bullish',
    setupType: 'FVG mitigation',
    entryTF: '5M',
    entryPrice: 2010.00,
    sl: 2005.00,
    tp: 2025.00,
    riskPercent: 1.0,
    plannedRR: 3.0,
    resultR: 3.0,
    pnl: 180.00,
    outcome: 'Win',
    isAPlus: true,
    followedRules: true,
    emotional: false,
    mistakeType: 'None',
    screenshotUrl: '',
    notes: '',
    lesson: 'Good mitigation play.',
    disciplineScore: 9,
  },
  {
    id: 't-4',
    date: '2026-03-22',
    day: 'Sunday',
    session: 'Main',
    instrument: 'XAUUSD',
    bias: 'Bearish',
    setupType: 'Liquidity sweep',
    entryTF: '5M',
    entryPrice: 2030.00,
    sl: 2035.00,
    tp: 2020.00,
    riskPercent: 1.5,
    plannedRR: 2.0,
    resultR: -1.0,
    pnl: -75.00,
    outcome: 'Loss',
    isAPlus: false,
    followedRules: false,
    emotional: true,
    mistakeType: 'Revenge Trade',
    screenshotUrl: '',
    notes: 'Traded late evening due to FOMO.',
    lesson: 'Do not trade after 8 PM.',
    disciplineScore: 3,
  },
  {
    id: 't-5',
    date: '2026-03-21',
    day: 'Saturday',
    session: 'Main',
    instrument: 'XAUUSD',
    bias: 'Bullish',
    setupType: 'Structure confirmation',
    entryTF: '5M',
    entryPrice: 2000.00,
    sl: 1995.00,
    tp: 2012.00,
    riskPercent: 1.0,
    plannedRR: 2.4,
    resultR: 0,
    pnl: 0.00,
    outcome: 'BE',
    isAPlus: true,
    followedRules: true,
    emotional: false,
    mistakeType: 'Break Even Stop',
    screenshotUrl: '',
    notes: 'Moved to BE after 1R. Price reversed.',
    lesson: 'Good risk management.',
    disciplineScore: 9,
  }
];

export const mockBusinessEntries: BusinessEntry[] = [
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `b-${i}`,
    date: `2026-03-${18 + i}`,
    salesEntered: true,
    totalSales: 450 + (Math.random() * 200),
    totalPieces: Math.floor(10 + Math.random() * 5),
    expense: 50 + (Math.random() * 20),
    netProfit: 0, // calculate below
    cashCollected: 200,
    upiCollected: 0, // calc below
    pendingEntry: false,
    customerFollowUp: 'None',
    notes: 'Regular day sales'
  })).map(entry => {
    entry.netProfit = entry.totalSales - entry.expense;
    entry.upiCollected = entry.totalSales - entry.cashCollected;
    return entry;
  })
];

export const mockStudyEntries: StudyEntry[] = [
  {
    id: 's-1',
    date: '2026-03-24',
    subjectOrCourse: 'React OS',
    type: 'Coding',
    topicOrModule: 'Dashboard Setup',
    durationMinutes: 90,
    completed: true,
    notes: 'Built the sidebar layout.',
    nextStep: 'Build the data store.'
  },
  {
    id: 's-2',
    date: '2026-03-24',
    subjectOrCourse: 'College Math',
    type: 'Assignment',
    topicOrModule: 'Calculus Ch 4',
    durationMinutes: 45,
    completed: false,
    notes: 'Stuck on integration by parts.',
    nextStep: 'Review lecture notes.'
  },
  {
    id: 's-3',
    date: '2026-03-23',
    subjectOrCourse: 'Coursera CS50',
    type: 'Coursera',
    topicOrModule: 'Week 1 Pset',
    durationMinutes: 120,
    completed: true,
    notes: 'Finished Mario challenge.',
    nextStep: 'Start Week 2.'
  },
  {
    id: 's-4',
    date: '2026-03-22',
    subjectOrCourse: 'Business Admin',
    type: 'Revision',
    topicOrModule: 'Accounting Basics',
    durationMinutes: 60,
    completed: true,
    notes: 'Revised P&L statement structure.',
    nextStep: 'Practice test.'
  },
  {
    id: 's-5',
    date: '2026-03-21',
    subjectOrCourse: 'React OS',
    type: 'Coding',
    topicOrModule: 'UI Design',
    durationMinutes: 180,
    completed: true,
    notes: 'Designed the mockups.',
    nextStep: 'Implement.'
  }
];

export const mockWeeklyResets: WeeklyReset[] = [
  {
    id: 'w-1',
    weekStart: '2026-03-16',
    tradingSummary: {
      liveDays: 5,
      totalTrades: 8,
      rulesBroken: 1,
      bestTrade: 'XAUUSD Long +3R',
      worstTrade: 'Revenge short -1.5R',
      mainEmotionalMistake: 'Trading past 8 PM',
      improvementFocus: 'Strict timezone cutoffs'
    },
    businessSummary: {
      allEntriesUpdated: true,
      weeklySales: 3500,
      weeklyExpenses: 800,
      weeklyNetProfit: 2700,
      missingDataCount: 0
    },
    studySummary: {
      assignmentsCompleted: 3,
      coursesCompleted: 0,
      pendingTasks: 2,
      backlogPriority: 'Calculus Assignment'
    },
    disciplineSummary: {
      gymDaysCompleted: 5,
      daysNoAfternoonSleep: 6,
      biggestDistraction: 'Instagram Reels',
      averageDisciplineScore: 8.5
    },
    nextWeekFocus: {
      mainMoneyFocus: 'Secure 1:2 RR setups only',
      mainStudyFocus: 'Finish CS50 Week 2',
      mainDisciplineFocus: 'Zero afternoon sleep'
    }
  }
];
