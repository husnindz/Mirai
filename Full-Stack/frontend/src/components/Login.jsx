import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  if (initialTab !== prevInitialTab) {
    setActiveTab(initialTab);
    setPrevInitialTab(initialTab);
    setError('');
    setSuccess('');
    setAge('');
    setGender('Laki-laki');
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

      fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Login failed!');
          }
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('userEmail', data.data.email);
          localStorage.setItem('userName', data.data.name || 'Jati Sri Pamungkas');
          setSuccess(t.successLogin);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      if (!fullname || !email || !password || !confirmPassword || !age || !gender) {
        setError(t.errorAllRequired || 'All fields are required');
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMatch);
        return;
      }

      fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
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
          const data = await res.json();
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
        <div className="w-full max-w-[401px] min-h-[469px] bg-brand-light p-[29px] rounded-xl border border-white/60 shadow-xl shadow-brand-primary/5 transition-all duration-300">
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-[36px] text-brand-primary leading-tight mb-2 tracking-tight">
              {t.login}
            </h2>
            <p className="font-montserrat font-normal text-[15px] text-black leading-relaxed">
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
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {t.labelEmail || 'Email'}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder={t.labelEmail || 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="text-brand-primary text-[20px] font-montserrat font-normal"
                >
                  {t.labelPassword || 'Password'}
                </label>
              </div>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="password"
                  id="password"
                  placeholder={t.labelPassword || 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
              <div className="text-right mt-1.5">
                <a
                  href="#forgot"
                  className="text-brand-primary text-[12px] font-montserrat font-normal hover:underline"
                >
                  {t.forgotPassword}
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[35px] bg-brand-primary text-brand-accent font-montserrat font-semibold text-[20px] rounded-[5px] flex items-center justify-center transition-all duration-300 hover:bg-[#0f4859] hover:shadow-md cursor-pointer mt-6"
            >
              {t.login}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[12px] font-montserrat">
            <span className="text-black">{t.dontHaveAccount}</span>
            <Link
              to="/register"
              onClick={() => {
                setActiveTab('register');
              }}
              className="text-brand-primary underline ml-1 hover:text-brand-primary/80 transition-colors"
            >
              {t.register}
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-[401px] min-h-[730px] bg-brand-light p-[29px] rounded-xl border border-white/60 shadow-[0px_4px_4px_rgba(0,0,0,0.25),0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300">
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-[36px] text-brand-primary leading-tight mb-2 tracking-tight">
              {t.register}
            </h2>
            <p className="font-montserrat font-normal text-[15px] text-black leading-relaxed">
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
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {t.labelFullname}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="text"
                  id="fullname"
                  placeholder={t.labelFullname}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {t.labelEmail || 'Email'}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder={t.labelEmail || 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="age"
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {language === 'id' ? 'Umur' : 'Age'}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="number"
                  id="age"
                  placeholder={language === 'id' ? 'Umur (Tahun)' : 'Age (Years)'}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                  min="1"
                  max="120"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="gender"
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {language === 'id' ? 'Jenis Kelamin' : 'Gender'}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#EDFBFF] text-[#5C7076] font-poppins text-[13px] focus:outline-none cursor-pointer"
                  required
                >
                  <option value="Laki-laki">{language === 'id' ? 'Laki-laki' : 'Male'}</option>
                  <option value="Perempuan">{language === 'id' ? 'Perempuan' : 'Female'}</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {t.labelPassword || 'Password'}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="password"
                  id="password"
                  placeholder={t.labelPassword || 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1"
              >
                {t.labelConfirmPassword}
              </label>
              <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder={t.labelConfirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[35px] bg-brand-primary text-brand-accent font-montserrat font-semibold text-[20px] rounded-[5px] flex items-center justify-center transition-all duration-300 hover:bg-[#0f4859] hover:shadow-md cursor-pointer mt-6"
            >
              {t.register}
            </button>
          </form>

          <div className="mt-[22px] text-center text-[12px] font-montserrat">
            <span className="text-black">{t.alreadyHaveAccount}</span>
            <Link
              to="/login"
              onClick={() => {
                setActiveTab('login');
              }}
              className="text-brand-primary underline ml-1 hover:text-brand-primary/80 transition-colors"
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
