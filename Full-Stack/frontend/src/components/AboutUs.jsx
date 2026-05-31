import aboutUsBg from '../assets/about-us-bg.png';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AboutUs() {
  const { t } = useLanguage();

  const descParts = t.aboutDesc.split('early screening');

  return (
    <section id="about-us" className="bg-[#F8FDFF] overflow-hidden select-none">
      <div
        className="relative pt-24 pb-48 bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url(${aboutUsBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#146178]/90 to-[#0a313d]/96 backdrop-blur-xs" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-montserrat font-bold text-4xl md:text-[64px] tracking-tight mb-8 leading-none">
              {t.aboutUs}
            </h2>
            <p className="font-poppins text-lg md:text-[24px] text-white/90 leading-relaxed md:leading-[1.6]">
              {descParts[0]}
              <span className="text-brand-accent font-semibold">early screening</span>
              {descParts[1]}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-full h-[60px] md:h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,30 C300,100 600,110 1200,90 L1200,120 L0,120 Z" fill="#F8FDFF"></path>
          </svg>
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pb-24 z-20 -mt-28 md:-mt-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="group bg-[#F8FDFF] text-slate-800 p-8 md:p-10 rounded-[10px] border border-[#AFAFAF] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#146178] mb-8 transition-transform duration-500 group-hover:scale-105 shadow-md">
              <div className="absolute inset-0 rounded-full bg-[#77F9D0]/30 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-10 h-10 text-[#77F9D0] relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <h3 className="font-montserrat font-bold text-[24px] text-[#146178] mb-4 capitalize leading-normal">
              {t.aboutHipaaTitle}
            </h3>

            <p className="font-sans text-[18px] text-black leading-[27.9px] tracking-[0.27px]">
              {t.aboutHipaaDesc}
            </p>
          </div>

          <div className="group bg-[#F8FDFF] text-slate-800 p-8 md:p-10 rounded-[10px] border border-[#AFAFAF] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#146178] mb-8 transition-transform duration-500 group-hover:scale-105 shadow-md">
              <div className="absolute inset-0 rounded-full bg-[#77F9D0]/30 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-10 h-10 text-[#77F9D0] relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 12h2l1.5-3 2 6 1.5-4 1 1h2"
                />
              </svg>
            </div>

            <h3 className="font-montserrat font-bold text-[24px] text-[#146178] mb-4 capitalize leading-normal">
              {t.aboutGeneticTitle}
            </h3>

            <p className="font-sans text-[18px] text-black leading-[27.9px] tracking-[0.27px]">
              {t.aboutGeneticDesc}
            </p>
          </div>

          <div className="group bg-[#F8FDFF] text-slate-800 p-8 md:p-10 rounded-[10px] border border-[#AFAFAF] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#146178] mb-8 transition-transform duration-500 group-hover:scale-105 shadow-md">
              <div className="absolute inset-0 rounded-full bg-[#77F9D0]/30 filter blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg
                className="w-10 h-10 text-[#77F9D0] relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v4m-2-2h4" />
              </svg>
            </div>

            <h3 className="font-montserrat font-bold text-[24px] text-[#146178] mb-4 capitalize leading-normal">
              {t.aboutClinicalTitle}
            </h3>

            <p className="font-sans text-[18px] text-black leading-[27.9px] tracking-[0.27px]">
              {t.aboutClinicalDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
