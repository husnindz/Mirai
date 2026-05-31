import joinUsImg from '../assets/join-us.png';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function JoinUs() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-brand-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            
            <div className="absolute top-4 left-4 w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[608px] h-[335px] sm:h-[500px] lg:h-[635px] bg-brand-primary rounded-[37px] -rotate-2 hidden sm:block transition-transform duration-500 hover:rotate-0" />
            
            
            <div className="relative w-full max-w-[320px] sm:max-w-[480px] lg:max-w-[608px] h-[335px] sm:h-[500px] lg:h-[635px] rounded-[34px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] border border-brand-primary/10">
              <img 
                src={joinUsImg} 
                alt="Konsultasi Medis Mirai" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/30 flex items-center gap-3 shadow-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-sans font-semibold text-sm text-brand-primary">{t.joinActiveText}</span>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right order-1 lg:order-2">
            
            <div className="mb-4 text-brand-primary/60 font-jakarta font-bold text-sm tracking-wider uppercase">
              {t.joinBadge}
            </div>
            
            
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[52px] text-brand-primary leading-tight lg:leading-[62.40px] text-capitalize">
              {t.joinTitle}
            </h2>
            
            
            <div className="w-[209px] h-[6.17px] bg-brand-primary -rotate-1 self-center lg:self-end mt-4 mb-8" />

            
            <p className="font-poppins text-base sm:text-lg lg:text-[24px] text-brand-primary/80 leading-relaxed lg:leading-[36px] max-w-xl mb-10">
              {t.joinDesc}
            </p>

            
            <a 
              href="#register" 
              className="px-[22.50px] py-[18px] bg-brand-primary rounded-[15px] hover:bg-[#0f4859] transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span className="text-center text-brand-accent text-lg lg:text-[20px] font-poppins font-semibold leading-[31px] tracking-[0.30px]">
                {t.joinBtn}
              </span>
              <svg className="w-6 h-6 text-brand-accent transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
