import AboutUs from '../../components/AboutUs';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import JoinUs from '../../components/JoinUs';
import Navbar from '../../components/Navbar';
import StatsAndTestimonials from '../../components/StatsAndTestimonials';

export default function LandingPage() {
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
