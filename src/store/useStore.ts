import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyOS, Trade, BusinessEntry, StudyEntry, WeeklyReset } from './types';
import { mockDailyOS, mockTrades, mockBusinessEntries, mockStudyEntries, mockWeeklyResets } from './mockData';

interface AppState {
  dailyOS: Record<string, DailyOS>;
  trades: Trade[];
  businessEntries: BusinessEntry[];
  studyEntries: StudyEntry[];
  weeklyResets: WeeklyReset[];
  
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  updateDailyOS: (date: string, data: Partial<DailyOS>) => void;
  addTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  updateBusinessEntry: (id: string, data: Partial<BusinessEntry>) => void;
  addBusinessEntry: (entry: BusinessEntry) => void;
  addStudyEntry: (entry: StudyEntry) => void;
  toggleStudyCompletion: (id: string) => void;
  addWeeklyReset: (reset: WeeklyReset) => void;
  
  resetData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      dailyOS: mockDailyOS,
      trades: mockTrades,
      businessEntries: mockBusinessEntries,
      studyEntries: mockStudyEntries,
      weeklyResets: mockWeeklyResets,
      isSidebarOpen: false,

      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      updateDailyOS: (date: string, data: Partial<DailyOS>) => set((state) => ({
        dailyOS: {
          ...state.dailyOS,
          [date]: { ...state.dailyOS[date], ...data } as DailyOS
        }
      })),
      
      addTrade: (trade: Trade) => set((state) => ({
        trades: [trade, ...state.trades]
      })),

      deleteTrade: (id: string) => set((state) => ({
        trades: state.trades.filter(t => t.id !== id)
      })),

      updateBusinessEntry: (id: string, data: Partial<BusinessEntry>) => set((state) => ({
        businessEntries: state.businessEntries.map(e => 
          e.id === id ? { ...e, ...data } : e
        )
      })),

      addBusinessEntry: (entry: BusinessEntry) => set((state) => ({
        businessEntries: [entry, ...state.businessEntries]
      })),

      addStudyEntry: (entry: StudyEntry) => set((state) => ({
        studyEntries: [entry, ...state.studyEntries]
      })),

      toggleStudyCompletion: (id: string) => set((state) => ({
        studyEntries: state.studyEntries.map(s => 
          s.id === id ? { ...s, completed: !s.completed } : s
        )
      })),

      addWeeklyReset: (reset: WeeklyReset) => set((state) => ({
        weeklyResets: [reset, ...state.weeklyResets]
      })),

      resetData: () => set(() => ({
        dailyOS: { ...mockDailyOS },
        trades: [...mockTrades],
        businessEntries: [...mockBusinessEntries],
        studyEntries: [...mockStudyEntries],
        weeklyResets: [...mockWeeklyResets],
        isSidebarOpen: false,
      }))
    }),
    {
      name: 'samarth-os-storage',
      partialize: (state) => ({
        dailyOS: state.dailyOS,
        trades: state.trades,
        businessEntries: state.businessEntries,
        studyEntries: state.studyEntries,
        weeklyResets: state.weeklyResets,
      }),
    }
  )
);
