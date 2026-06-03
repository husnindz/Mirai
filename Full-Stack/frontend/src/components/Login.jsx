import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import dnaBg from '../assets/dna-login-bg.png';
import logoIcon from '../assets/logo-icon.png';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Login({ initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setFullname('');
    setConfirmPassword('');
    setAge('');
    setGender('Laki-laki');
    setShowPassword(false);
    setShowConfirmPassword(false);

    if (location.pathname === '/forgot' || location.hash === '#forgot') {
      setActiveTab('forgot');
    } else if (location.pathname === '/register') {
      setActiveTab('register');
    } else if (location.pathname === '/login') {
      setActiveTab('login');
    }
  }, [location.pathname, location.hash]);

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (activeTab === 'login') {
      if (!email || !password) {
        setError(t.errorFillFields);
        return;
      }

      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (res) => {
          let data = {};
          const text = await res.text();
          try {
            data = text ? JSON.parse(text) : {};
          } catch (e) {
            data = { message: text || 'Login failed!' };
          }
          if (!res.ok) {
            throw new Error(data.message || 'Login failed!');
          }
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('userEmail', data.data?.email || email);
          localStorage.setItem('userName', data.data?.name || 'Jati Sri Pamungkas');
          setSuccess(t.successLogin);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (activeTab === 'forgot') {
      if (!email || !password || !confirmPassword) {
        setError(language === 'id' ? 'Semua kolom wajib diisi.' : 'All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMatch || 'Password confirmation does not match.');
        return;
      }

      // Simulate API call for resetting password
      setSuccess(
        language === 'id'
          ? 'Password berhasil diperbarui! Silakan masuk.'
          : 'Password successfully updated! Please login.'
      );
      
      setTimeout(() => {
        setActiveTab('login');
        navigate('/login');
      }, 1000);
    } else {
      if (!fullname || !email || !password || !confirmPassword || !age || !gender) {
        setError(t.errorAllRequired || 'All fields are required');
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMatch);
        return;
      }

      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: fullname,
          age: parseInt(age),
          gender: gender,
        }),
      })
        .then(async (res) => {
          let data = {};
          const text = await res.text();
          try {
            data = text ? JSON.parse(text) : {};
          } catch (e) {
            data = { message: text || 'Registration failed!' };
          }
          if (!res.ok) {
            throw new Error(data.message || 'Registration failed!');
          }
          setSuccess(t.successRegister);
          setTimeout(() => {
            setActiveTab('login');
            navigate('/login');
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const renderForm = () => {
    if (activeTab === 'login') {
      return (
        <div className="w-full max-w-[401px] bg-brand-light p-[29px] rounded-xl border border-white/60 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
              {t.login}
            </h2>
            <p className="font-sans font-normal text-[12px] text-[#5C7076] leading-relaxed">
              {t.loginWelcome}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[15px]">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelEmail || 'Email'}
              </label>
              <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder={t.labelEmail || 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelPassword || 'Password'}
              </label>
              <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder={t.labelPassword || 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-brand-primary text-white font-sans font-semibold text-[15px] rounded-[5px] flex items-center justify-center transition-all duration-300 hover:bg-[#0f4859] hover:shadow-md cursor-pointer mt-6"
            >
              {t.login}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[12px] font-sans">
            <span className="text-[#5C7076]">{t.dontHaveAccount}</span>
            <Link
              to="/register"
              onClick={() => {
                setActiveTab('register');
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className="text-brand-primary font-semibold ml-1 hover:text-[#0f4859] transition-colors"
            >
              {t.register}
            </Link>
          </div>
        </div>
      );
    } else if (activeTab === 'forgot') {
      return (
        <div className="w-full max-w-[401px] bg-brand-light p-[29px] rounded-xl border border-white/60 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
              {language === 'id' ? 'Password Baru' : 'New Password'}
            </h2>
            <p className="font-sans font-normal text-[12px] text-[#5C7076] leading-relaxed">
              {language === 'id'
                ? 'Masukkan email terdaftar dan buat password baru Anda.'
                : 'Enter your registered email and create your new password.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[15px]">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelEmail || 'Email'}
              </label>
              <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder={t.labelEmail || 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {language === 'id' ? 'Password Baru' : 'New Password'}
              </label>
              <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder={language === 'id' ? 'Password Baru' : 'New Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelConfirmPassword || 'Konfirmasi Password'}
              </label>
              <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder={t.labelConfirmPassword || 'Konfirmasi Password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-brand-primary text-white font-sans font-semibold text-[15px] rounded-[5px] flex items-center justify-center transition-all duration-300 hover:bg-[#0f4859] hover:shadow-md cursor-pointer mt-6"
            >
              {language === 'id' ? 'Simpan Password' : 'Save Password'}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[12px] font-sans">
            <Link
              to="/login"
              onClick={() => {
                setActiveTab('login');
              }}
              className="text-brand-primary font-semibold underline hover:text-[#0f4859] transition-colors"
            >
              {language === 'id' ? 'Kembali ke Masuk' : 'Back to Login'}
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-[401px] bg-brand-light p-[29px] rounded-xl border border-white/60 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
              {t.register}
            </h2>
            <p className="font-sans font-normal text-[12px] text-[#5C7076] leading-relaxed">
              {t.registerWelcome}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-poppins flex items-center gap-2">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[15px]">
            <div className="relative">
              <label
                htmlFor="fullname"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelFullname}
              </label>
              <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center">
                <input
                  type="text"
                  id="fullname"
                  placeholder={t.labelFullname}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelEmail || 'Email'}
              </label>
              <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder={t.labelEmail || 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="age"
                  className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                >
                  {language === 'id' ? 'Umur' : 'Age'}
                </label>
                <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center">
                  <input
                    type="number"
                    id="age"
                    placeholder={language === 'id' ? 'Umur' : 'Age'}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                    required
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="gender"
                  className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                >
                  {language === 'id' ? 'Jenis Kelamin' : 'Gender'}
                </label>
                <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none cursor-pointer appearance-none"
                    required
                  >
                    <option value="Laki-laki">{language === 'id' ? 'Laki-laki' : 'Male'}</option>
                    <option value="Perempuan">{language === 'id' ? 'Perempuan' : 'Female'}</option>
                  </select>
                  <div className="absolute right-3.5 pointer-events-none text-[#146178]/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelPassword || 'Password'}
              </label>
              <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder={t.labelPassword || 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
              >
                {t.labelConfirmPassword}
              </label>
              <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/50 rounded-[5px] flex items-center pr-10">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder={t.labelConfirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] placeholder:text-[#5C7076]/50 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-brand-primary text-white font-sans font-semibold text-[15px] rounded-[5px] flex items-center justify-center transition-all duration-300 hover:bg-[#0f4859] hover:shadow-md cursor-pointer mt-6"
            >
              {t.register}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[12px] font-sans">
            <span className="text-[#5C7076]">{t.alreadyHaveAccount}</span>
            <Link
              to="/login"
              onClick={() => {
                setActiveTab('login');
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className="text-brand-primary font-semibold ml-1 hover:text-[#0f4859] transition-colors"
            >
              {t.login}
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-brand-light flex items-center justify-center overflow-hidden font-sans select-none">
      <div className="absolute top-6 left-6 md:left-12 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoIcon}
            alt="Mirai Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-montserrat font-bold text-2xl tracking-wide text-brand-primary">
            Mirai
          </span>
        </Link>
      </div>

      <div className="absolute top-6 right-6 md:right-12 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full font-montserrat font-semibold text-sm text-brand-primary bg-brand-soft border border-brand-primary/10 hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t.backToHome}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen">
        {activeTab === 'login' ? (
          <>
            <div className="relative hidden lg:block lg:col-span-7 h-full overflow-hidden bg-white select-none">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-12000 hover:scale-105"
                style={{
                  backgroundImage: `url(${dnaBg})`,
                  clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
                }}
              />
              <div
                className="absolute inset-0 bg-linear-to-tr from-brand-primary/10 via-brand-cyan/5 to-transparent pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
                }}
              />
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center items-center px-6 md:px-16 lg:px-12 xl:px-20 py-20 bg-brand-light z-10">
              {renderForm()}
            </div>
          </>
        ) : (
          <>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center items-center px-6 md:px-16 lg:px-12 xl:px-20 py-20 bg-brand-light z-10 order-2 lg:order-1">
              {renderForm()}
            </div>

            <div className="relative hidden lg:block lg:col-span-7 h-full overflow-hidden bg-white select-none order-1 lg:order-2">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-12000 hover:scale-105"
                style={{
                  backgroundImage: `url(${dnaBg})`,
                  clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)',
                }}
              />
              <div
                className="absolute inset-0 bg-linear-to-tl from-brand-primary/10 via-brand-cyan/5 to-transparent pointer-events-none"
                style={{
                  clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
