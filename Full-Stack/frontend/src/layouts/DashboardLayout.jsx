import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import logoFull from '../assets/logo-full.png';
import userAvatar from '../assets/user-avatar.png';
import { useLanguage } from '../context/LanguageContext.jsx';
import { fetchWithAuth } from '../utils/api.js';
import { useFormatCheckUpDate } from '../utils/FormatCheckUpDate.jsx';
import { useTranslateCheckUp } from '../utils/TranslateCheckUp.jsx';

export default function DashboardLayout() {
  const username = localStorage.getItem('userName') || 'Jati Sri Pamungkas';
  const email = localStorage.getItem('userEmail') || 'jatispamungkas357@gmail.com';

  const { language, t, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const { formatCheckUpDate } = useFormatCheckUpDate();
  const { translateCategory, translateRisk, translateStatus, translateAbnormalText } =
    useTranslateCheckUp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const hasToken = !!(accessToken || refreshToken);

  useEffect(() => {
    if (!hasToken) {
      navigate('/login', { replace: true });
    }
  }, [hasToken, navigate]);

  // Helper untuk parsing ISO date ke format Indonesia (DD Month YYYY, HH.MM)
  const parseAndFormatDate = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const monthsId = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthsId[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}.${minutes}`;
  };

  useEffect(() => {
    async function loadPredictions() {
      try {
        const response = await fetchWithAuth('/predictions/history');
        if (response.ok) {
          const result = await response.json();
          // Map data ke format yang diharapkan UI frontend
          const mapped = result.data.map((item) => {
            const mainPrediction = item.predictions && item.predictions.length > 0
              ? item.predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current)
              : { disease_name: 'Penyakit Dalam', probability: 0, risk: 'Low' };

            const mapClassIdToName = (classVal) => {
              if (!classVal) return 'Penyakit Dalam';
              const strVal = String(classVal).trim().toLowerCase();
              if (strVal === '1' || strVal === 'jantung' || strVal === 'penyakit jantung' || strVal === 'heart disease') return 'Jantung';
              if (strVal === '2' || strVal === 'penyakit dalam' || strVal === 'internal disease' || strVal === 'internal medicine') return 'Penyakit Dalam';
              if (strVal === '3' || strVal === 'paru-paru' || strVal === 'paru' || strVal === 'penyakit paru-paru' || strVal === 'lung disease') return 'Paru-paru';
              
              // Fallback jika berupa mainPrediction.disease_id
              const mainPredId = String(mainPrediction.disease_id || '').trim();
              if (mainPredId === '1') return 'Jantung';
              if (mainPredId === '2') return 'Penyakit Dalam';
              if (mainPredId === '3') return 'Paru-paru';
              return classVal || 'Penyakit Dalam';
            };

            const scores = { penyakitDalam: 0, jantung: 0, paruParu: 0 };
            if (item.predictions) {
              item.predictions.forEach((pred) => {
                const name = mapClassIdToName(pred.disease_name);
                const probVal = pred.probability;
                if (name === 'Penyakit Dalam') scores.penyakitDalam = probVal;
                else if (name === 'Jantung') scores.jantung = probVal;
                else if (name === 'Paru-paru') scores.paruParu = probVal;
              });
            }

            return {
              id: item.check_up_id,
              category: mapClassIdToName(mainPrediction.disease_name),
              date: parseAndFormatDate(item.created_at),
              risk: mainPrediction.risk === 'High' ? 'Tinggi' : mainPrediction.risk === 'Medium' ? 'Sedang' : 'Rendah',
              riskColor: mainPrediction.risk === 'High'
                ? 'bg-[#EB5050] text-[#530505]'
                : mainPrediction.risk === 'Medium'
                  ? 'bg-[#F2C039] text-[#836512]'
                  : 'bg-[#17ADB4] text-[#084F63]',
              score: Math.round(mainPrediction.probability * 100),
              scores
            };
          });
          const sorted = mapped.sort((a, b) => b.id - a.id);
          setHistoryList(sorted);
        }
      } catch (err) {
        console.error('Failed to load predictions history:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPredictions();
  }, []);

  if (!hasToken) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#EDFBFF] flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-brand-primary animate-spin"></div>
          </div>
          <p className="text-brand-primary font-montserrat font-semibold text-[16px] animate-pulse">
            {language === 'id' ? 'Memverifikasi sesi...' : 'Verifying session...'}
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken })
        });
      }
    } catch (error) {
      console.error('Error logging out from server:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#EDFBFF] font-sans text-slate-800 flex flex-col lg:flex-row select-none relative lg:overflow-hidden">
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#D9F6FF] border-b border-brand-primary/10 w-full z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-primary p-1 rounded-md focus:outline-none hover:bg-brand-primary/10"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <img
            src={logoFull}
            alt="Mirai Logo"
            className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => {
              navigate('/dashboard');
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-brand-primary/20"
            />
            <span className="font-semibold text-xs text-brand-primary truncate max-w-[80px]">
              {username}
            </span>
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 top-10 bg-white border border-brand-primary/10 rounded-lg shadow-lg py-1 w-36 z-50 animate-fade-in">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-[#F8FDFF]/80 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-[280px] max-w-xs h-full bg-[#D9F6FF] shadow-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between pb-6 border-b border-brand-primary/10">
              <img
                src={logoFull}
                alt="Mirai Logo"
                className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                onClick={() => {
                  navigate('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-primary p-1 rounded-md hover:bg-brand-primary/10 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-3">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  location.pathname === '/dashboard'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${location.pathname === '/dashboard' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuDashboard}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/dashboard/checkup');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  location.pathname === '/dashboard/checkup'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${location.pathname === '/dashboard/checkup' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuCheckUp}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/dashboard/history');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  location.pathname.startsWith('/dashboard/history')
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${location.pathname.startsWith('/dashboard/history') ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuHistory}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/dashboard/about');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  location.pathname === '/dashboard/about'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${location.pathname === '/dashboard/about' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuAbout}</span>
              </button>

              <div className="px-4 py-2 border-t border-brand-primary/10 mt-2 select-none">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-semibold text-[15px] text-[#262626]">
                    {t.languageToggleLabel || 'Language'}
                  </span>
                  <div className="flex bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-full p-0.5 select-none">
                    <button
                      onClick={() => setLanguage('id')}
                      className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                        language === 'id'
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'text-slate-500 hover:text-brand-primary'
                      }`}
                    >
                      ID
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                        language === 'en'
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'text-slate-500 hover:text-brand-primary'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="w-full p-4 bg-brand-primary rounded-xl flex items-center justify-between border-t border-white/10 shrink-0 text-white mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div className="text-left leading-tight">
                  <div className="text-[14px] font-poppins font-semibold truncate max-w-[120px] text-white">
                    {username}
                  </div>
                  <div className="text-white/75 text-[10px] font-poppins truncate max-w-[120px]">
                    {email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 hover:bg-white/10 rounded text-rose-300"
                title="Log Out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:flex flex-col w-[341px] lg:h-screen p-6 bg-transparent shrink-0 animate-fade-in">
        <div className="flex justify-center mb-8 mt-4 shrink-0">
          <div
            style={{ width: '191px', height: '191px' }}
            className="cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
            onClick={() => {
              navigate('/dashboard');
            }}
            title={language === 'id' ? 'Kembali ke Dashboard' : 'Back to Dashboard'}
          >
            <img
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              src={logoFull}
              alt="Mirai Logo"
            />
          </div>
        </div>

        <div className="flex flex-col h-full bg-[#D9F6FF] rounded-[20px] shadow-xl shadow-brand-primary/5 relative overflow-hidden flex-1">
          <nav className="flex-1 px-6 py-6 space-y-4">
            <button
              onClick={() => {
                navigate('/dashboard');
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                location.pathname === '/dashboard'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${location.pathname === '/dashboard' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuDashboard}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard/checkup')}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                location.pathname === '/dashboard/checkup'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${location.pathname === '/dashboard/checkup' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuCheckUp}</span>
            </button>

            <button
              onClick={() => {
                navigate('/dashboard/history');
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                location.pathname.startsWith('/dashboard/history')
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${location.pathname.startsWith('/dashboard/history') ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                className={`font-montserrat font-semibold text-[26px] ${location.pathname.startsWith('/dashboard/history') ? 'text-brand-accent' : ''}`}
              >
                {t.menuHistory}
              </span>
            </button>

            <button
              onClick={() => {
                navigate('/dashboard/about');
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                location.pathname === '/dashboard/about'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${location.pathname === '/dashboard/about' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuAbout}</span>
            </button>
          </nav>

          <div className="w-full h-[86px] px-5 bg-brand-primary flex items-center justify-between border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full object-cover border border-white/20 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              <div className="text-left leading-tight">
                <div className="text-[#F8FDFF] text-[18px] font-poppins font-semibold truncate max-w-[150px]">
                  {username}
                </div>
                <div className="text-white/75 text-[12px] font-poppins font-semibold truncate max-w-[150px]">
                  {email}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-white flex items-center justify-center focus:outline-none transition-colors"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 bottom-12 bg-white border border-brand-primary/10 rounded-lg shadow-xl py-1.5 w-44 z-50 animate-fade-in text-left">
                    <div className="px-4 py-2 border-b border-slate-100 flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t.languageToggleLabel || 'Language'}
                      </span>
                      <div className="flex bg-slate-100 rounded-lg p-0.5 select-none">
                        <button
                          onClick={() => setLanguage('id')}
                          className={`flex-1 py-1 text-center text-xs font-bold font-sans rounded-md transition-all duration-200 ${
                            language === 'id'
                              ? 'bg-brand-primary text-white shadow-sm'
                              : 'text-slate-500 hover:text-brand-primary'
                          }`}
                        >
                          ID
                        </button>
                        <button
                          onClick={() => setLanguage('en')}
                          className={`flex-1 py-1 text-center text-xs font-bold font-sans rounded-md transition-all duration-200 ${
                            language === 'en'
                              ? 'bg-brand-primary text-white shadow-sm'
                              : 'text-slate-500 hover:text-brand-primary'
                          }`}
                        >
                          EN
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet
          context={{
            historyList,
            setHistoryList,
            formatCheckUpDate,
            translateCategory,
            translateRisk,
            translateStatus,
            translateAbnormalText,
          }}
        />
      </main>
    </div>
  );
}
