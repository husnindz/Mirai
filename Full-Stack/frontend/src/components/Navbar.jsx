import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../assets/logo-icon.png';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-primary/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <img src={logoIcon} alt="Mirai Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="font-montserrat font-bold text-2xl tracking-wide text-white">
            Mirai
          </span>
        </Link>

        
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-montserrat font-semibold text-white/90 hover:text-brand-accent transition-colors duration-200">{t.home}</Link>
          <a href="#about-us" className="font-montserrat font-semibold text-white/90 hover:text-brand-accent transition-colors duration-200">{t.aboutUs}</a>
          <a href="#testimoni" className="font-montserrat font-semibold text-white/90 hover:text-brand-accent transition-colors duration-200">{t.testimoni}</a>
          <a href="#contact" className="font-montserrat font-semibold text-white/90 hover:text-brand-accent transition-colors duration-200">{t.contact}</a>
        </nav>

        
        <div className="hidden lg:flex items-center gap-6">
          
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 select-none">
            <button
              onClick={() => setLanguage('id')}
              className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                language === 'id'
                  ? 'bg-[#146178] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                language === 'en'
                  ? 'bg-[#146178] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-5 py-2 rounded-md font-sans font-semibold text-brand-accent bg-brand-primary border border-brand-primary/10 hover:bg-brand-primary/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-black/20"
            >
              {t.login}
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2 rounded-md font-sans font-semibold text-brand-cyan border border-brand-cyan hover:bg-brand-cyan/15 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            >
              {t.register}
            </Link>
          </div>
        </div>

        
        <div className="flex lg:hidden items-center gap-4">
          
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 select-none">
            <button
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-0.5 text-[10px] font-bold font-sans rounded-full transition-all duration-300 ${
                language === 'id'
                  ? 'bg-[#146178] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 text-[10px] font-bold font-sans rounded-full transition-all duration-300 ${
                language === 'en'
                  ? 'bg-[#146178] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-brand-accent focus:outline-none transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      
      <div 
        className={`fixed inset-0 bg-brand-primary/95 z-40 lg:hidden flex flex-col justify-center items-center gap-8 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white/70 hover:text-brand-accent focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-6">
          <Link onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} to="/" className="font-montserrat font-bold text-2xl text-white hover:text-brand-accent transition-colors">{t.home}</Link>
          <a onClick={() => setIsOpen(false)} href="#about-us" className="font-montserrat font-bold text-2xl text-white hover:text-brand-accent transition-colors">{t.aboutUs}</a>
          <a onClick={() => setIsOpen(false)} href="#testimoni" className="font-montserrat font-bold text-2xl text-white hover:text-brand-accent transition-colors">{t.testimoni}</a>
          <a onClick={() => setIsOpen(false)} href="#contact" className="font-montserrat font-bold text-2xl text-white hover:text-brand-accent transition-colors">{t.contact}</a>
        </nav>

        <div className="flex flex-col items-center gap-4 w-64 mt-6">
          <Link 
            onClick={() => setIsOpen(false)}
            to="/login" 
            className="w-full text-center px-6 py-3 rounded-md font-sans font-semibold text-brand-accent bg-[#0f4859] border border-brand-accent/20 hover:bg-brand-primary transition-colors"
          >
            {t.login}
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            to="/register" 
            className="w-full text-center px-6 py-3 rounded-md font-sans font-semibold text-brand-cyan border border-brand-cyan hover:bg-brand-cyan/20 transition-colors"
          >
            {t.register}
          </Link>
        </div>
      </div>
    </header>
  );
}
