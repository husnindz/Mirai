import heroBg from '../assets/hero-bg.png';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLanguage();

  const descParts = t.heroDesc.split(t.heroDescBold);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-scale duration-[10000ms] hover:scale-105"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#146178]/60 via-slate-900/60 to-[#F8FDFF]" />

      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-24 text-center z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-6 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-white font-poppins font-semibold text-sm tracking-wider uppercase animate-fade-in">
          {t.heroBadge}
        </div>

        <h1 className="font-montserrat font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none mb-8 filter drop-shadow-lg select-none">
          {t.heroTitle}
        </h1>

        <div className="max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/30 mb-10 transition-transform duration-500 hover:scale-[1.01]">
          <p className="font-poppins text-lg md:text-2xl text-white/95 leading-relaxed md:leading-loose">
            {descParts[0]}
            <span className="text-brand-accent font-semibold">{t.heroDescBold}</span>
            {descParts[1]}
          </p>
        </div>

        <a
          href="#about-us"
          className="group relative flex items-center gap-3 px-8 py-5 rounded-xl font-sans font-bold text-xl text-brand-accent bg-brand-primary border border-brand-accent/20 shadow-xl shadow-brand-primary/30 transition-all duration-300 hover:bg-[#0f4859] hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-primary/50 active:translate-y-0 active:scale-95"
        >
          <span>{t.heroMoreInfo}</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            &rarr;
          </span>

          <span className="absolute inset-0 rounded-xl border border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </a>
      </div>
    </section>
  );
}
