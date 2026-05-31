import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JoinUs from './components/JoinUs';
import AboutUs from './components/AboutUs';
import StatsAndTestimonials from './components/StatsAndTestimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      
      const isFullPage = ['#login', '#register', '#dashboard', '#check-up', '#history', '#about'].includes(hash);
      if (isFullPage) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  
  useEffect(() => {
    const hash = currentHash;
    if (hash && ['#about-us', '#testimoni', '#contact'].includes(hash)) {
      const id = hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    } else if (hash === '' || hash === '#') {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentHash]);

  const isLoginPage = currentHash === '#login';
  const isRegisterPage = currentHash === '#register';
  const isDashboardPage = ['#dashboard', '#check-up', '#history', '#about'].includes(currentHash);

  if (isLoginPage || isRegisterPage) {
    return <Login initialTab={isRegisterPage ? 'register' : 'login'} />;
  }

  if (isDashboardPage) {
    return <Dashboard />;
  }

  return (
    <>
      
      <Navbar />
      
      
      <main>
        
        <Hero />
        
        
        <JoinUs />
        
        
        <AboutUs />
        
        
        <StatsAndTestimonials />
      </main>
      
      
      <Footer />
    </>
  );
}

export default App;
