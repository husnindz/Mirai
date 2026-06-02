import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './pages/landing-page/LandingPage';
import ScrollToTop from './utils/ScrollToTop.js';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import CheckUp from './pages/dashboard/CheckUp';
import History from './pages/dashboard/History';
import HistoryDetails from './pages/dashboard/HistoryDetails';
import About from './pages/dashboard/About';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login initialTab="login" />} />
        <Route path="/register" element={<Login initialTab="register" />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="checkup" element={<CheckUp />} />
          <Route path="history" element={<History />} />
          <Route path="history/:id" element={<HistoryDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}
