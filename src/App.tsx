import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { DailyOS } from './pages/DailyOS';
import { CommandCenter } from './pages/CommandCenter';
import { TradingJournal } from './pages/TradingJournal';
import { BusinessTracker } from './pages/BusinessTracker';
import { StudyTracker } from './pages/StudyTracker';
import { WeeklyReset } from './pages/WeeklyReset';
import { Rules } from './pages/Rules';
import { Distractions } from './pages/Distractions';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="daily-os" element={<DailyOS />} />
          <Route path="command-center" element={<CommandCenter />} />
          <Route path="trading-journal" element={<TradingJournal />} />
          <Route path="business-tracker" element={<BusinessTracker />} />
          <Route path="study-tracker" element={<StudyTracker />} />
          <Route path="weekly-reset" element={<WeeklyReset />} />
          <Route path="rules" element={<Rules />} />
          <Route path="distractions" element={<Distractions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
