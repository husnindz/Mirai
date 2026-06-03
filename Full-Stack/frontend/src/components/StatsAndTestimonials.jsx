import { useLanguage } from '../context/LanguageContext.jsx';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const difference = rating - i + 1;
    if (difference >= 1) {
      stars.push(
        <svg key={i} className="w-[18px] h-[17.25px] shrink-0" viewBox="0 0 20 20" fill="#FFC500">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    } else if (difference === 0.5) {
      stars.push(
        <div key={i} className="relative w-[18px] h-[17.25px] overflow-hidden shrink-0">
          <svg className="w-[18px] h-[17.25px]" viewBox="0 0 20 20" fill="#E0E8F1">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
            <svg className="w-[18px] h-[17.25px]" viewBox="0 0 20 20" fill="#FFC500">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>,
      );
    } else {
      stars.push(
        <svg key={i} className="w-[18px] h-[17.25px] shrink-0" viewBox="0 0 20 20" fill="#E0E8F1">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      );
    }
  }
  return <div className="flex gap-[4px]">{stars}</div>;
}

export default function StatsAndTestimonials() {
  const { language, t } = useLanguage();

  const testimonials =
    language === 'id'
      ? [
          {
            id: 1,
            name: 'Budi S. (42 Tahun)',
            role: 'Pengguna Mandiri',
            text: '"Awalnya iseng coba input hasil lab karena sering merasa dada sesak. Mirai mendeteksi ada parameter yang abnormal. Setelah saya bawa hasil ringkasan ini ke rumah sakit, dokter bilang untung cepat diperiksakan."',
            rating: 5,
            isDark: false,
          },
          {
            id: 2,
            name: 'Citra Amalia',
            role: 'Ibu Rumah Tangga',
            text: '"Aplikasi ini sangat membantu untuk memantau kesehatan keluarga. Fitur input parameter dasarnya mudah dipahami bahkan untuk orang awam, grafiknya bikin perkembangan kesehatan gampang dipantau."',
            rating: 4.5,
            isDark: true,
          },
          {
            id: 3,
            name: 'dr. Ahmad Fauzi',
            role: 'Praktisi Kesehatan',
            text: '"Sebagai referensi awal, Mirai sangat membantu pasien mengenali kondisi tubuh mereka secara objektif. Format ringkasannya standar medis, memudahkan kami melakukan diagnosis final di klinik."',
            rating: 5,
            isDark: false,
          },
          {
            id: 4,
            name: 'Siska Utami (34 Tahun)',
            role: 'Karyawan Swasta',
            text: '"Gak perlu nunggu lama buat sekadar tahu arti angka-angka di lembar lab. Lewat fitur skrining mandiri Mirai, saya bisa langsung dapet gambaran awal fungsi ginjal dan imun dalam hitungan detik dari rumah."',
            rating: 5,
            isDark: true,
          },
          {
            id: 5,
            name: 'Rian Utama (29 Tahun)',
            role: 'Pegawai Swasta',
            text: '"Saya sangat menyukai dasbor modern yang futuristik ini. Menerjemahkan hasil laboratorium yang rumit menjadi indikator visual yang bersih sangat mengurangi stres saya."',
            rating: 4.5,
            isDark: false,
          },
          {
            id: 6,
            name: 'Rian Utama (29 Tahun)',
            role: 'Pegawai Swasta',
            text: '"Suka banget sama transparansi aplikasinya. Selain bisa buat check-up mandiri untuk indikator ginjal dan gula darah, enkripsi datanya bikin saya merasa aman menyimpan riwayat medis di sini."',
            rating: 5,
            isDark: true,
          },
          {
            id: 7,
            name: 'Amanda Putri (22 Tahun)',
            role: 'Mahasiswi',
            text: '"Sering banget ngerasa lemas dan pusing akhir-akhir ini. Pas iseng input data lab ke bagian Ukuran Sel Darah di Mirai, ternyata indikator MCV saya di bawah normal. Deteksi anemianya ngebantu banget!"',
            rating: 4.5,
            isDark: false,
          },
          {
            id: 8,
            name: 'Hendra Wijaya (50 Tahun)',
            role: 'Wiraswasta',
            text: '"Sebagai orang dengan riwayat keluarga diabetes, saya harus rutin cek gula darah puasa. Aplikasi ini mempermudah saya membaca tren fluktuasi angka laboratorium tanpa harus bingung baca kertas dokumen."',
            rating: 5,
            isDark: true,
          },
        ]
      : [
          {
            id: 1,
            name: 'Budi S. (42 Years Old)',
            role: 'Self User',
            text: '"Initially just tried entering lab results because I often felt chest tightness. Mirai detected abnormal parameters. After I brought this summary report to the hospital, the doctor said it was lucky I had it checked early."',
            rating: 5,
            isDark: false,
          },
          {
            id: 2,
            name: 'Citra Amalia',
            role: 'Housewife',
            text: '"This application is extremely helpful for monitoring family health. The basic parameter input is easy to understand even for laypeople, and the graphs make tracking health trends effortless."',
            rating: 4.5,
            isDark: true,
          },
          {
            id: 3,
            name: 'dr. Ahmad Fauzi',
            role: 'Health Practitioner',
            text: '"As an initial reference, Mirai is incredibly helpful for patients to recognize their body condition objectively. The summary format conforms to medical standards, making final diagnosis easier at the clinic."',
            rating: 5,
            isDark: false,
          },
          {
            id: 4,
            name: 'Siska Utami (34 Years Old)',
            role: 'Private Employee',
            text: '"No need to wait long just to understand the numbers on a lab sheet. Through Mirai\'s self-screening, I can instantly get an initial overview of kidney and immune functions in seconds from home."',
            rating: 5,
            isDark: true,
          },
          {
            id: 5,
            name: 'Rian Utama (29 Years Old)',
            role: 'Office Worker',
            text: '"I love the sleek, modern dashboard. Translating laboratory results into clean indicators saves me so much stress and worry."',
            rating: 4.5,
            isDark: false,
          },
          {
            id: 6,
            name: 'Rian Utama (29 Years Old)',
            role: 'Office Worker',
            text: '"I really love the transparency of this app. Besides being able to run a self-check for kidney and blood sugar indicators, the data encryption makes me feel fully secure storing my medical history here."',
            rating: 5,
            isDark: true,
          },
          {
            id: 7,
            name: 'Amanda Putri (22 Years Old)',
            role: 'Student',
            text: '"I\'ve been feeling weak and dizzy lately. When I tried entering my lab data into the Red Blood Cell Size section in Mirai, it showed my MCV indicator was below normal. The anemia detection was extremely helpful!"',
            rating: 4.5,
            isDark: false,
          },
          {
            id: 8,
            name: 'Hendra Wijaya (50 Years Old)',
            role: 'Entrepreneur',
            text: '"As someone with a family history of diabetes, I must regularly check fasting blood sugar. This app makes it easy to read lab level fluctuations without getting confused by paper documents."',
            rating: 5,
            isDark: true,
          },
        ];

  return (
    <section id="testimoni" className="py-24 bg-[#F8FDFF] relative overflow-hidden select-none">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-soft/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 z-10 relative">
        <div className="relative max-w-4xl mx-auto mb-20 text-center">
          <div
            className="hidden lg:flex absolute left-[-220px] top-[-30px] w-[170px] h-[85px] p-4 bg-[#EDFBFF] shadow-[0px_5.22px_13.06px_rgba(0,0,0,0.15)] rounded-[5.22px] border border-[#757575]/10 -rotate-9 transform-gpu flex-col justify-center items-center text-center cursor-default z-20 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2.5 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.22)]"
            style={{ transformOrigin: 'top left' }}
          >
            <span
              className="font-jakarta font-bold text-[25.83px] text-black leading-none mb-1"
              style={{ textShadow: '0px 5px 52px rgba(0, 0, 0, 0.10)' }}
            >
              1000+
            </span>
            <span
              className="font-jakarta text-[10.45px] text-black font-normal tracking-wide leading-none"
              style={{ textShadow: '0px 5px 52px rgba(0, 0, 0, 0.10)' }}
            >
              {t.statsScreening}
            </span>
          </div>

          <div className="hidden lg:flex absolute left-[-170px] bottom-[-20px] w-[170px] h-[85px] p-4 bg-[#ECFAFE] shadow-[0px_5.01px_12.53px_rgba(0,0,0,0.15)] rounded-[5.01px] border border-[#757575]/10 -rotate-[4deg] transform-gpu flex-col justify-center items-center text-center cursor-default z-20 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2.5 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.22)]">
            <span
              className="font-jakarta font-bold text-[24.78px] text-black leading-none mb-1"
              style={{ textShadow: '0px 5px 50px rgba(0, 0, 0, 0.10)' }}
            >
              4.8/5
            </span>
            <span
              className="font-jakarta text-[10.02px] text-black font-normal tracking-wide leading-none"
              style={{ textShadow: '0px 5px 50px rgba(0, 0, 0, 0.10)' }}
            >
              {t.statsSatisfaction}
            </span>
          </div>

          <div
            className="hidden lg:flex absolute right-[-220px] top-[-30px] w-[170px] h-[85px] p-4 bg-[#EDFBFF] shadow-[0px_5.22px_13.06px_rgba(0,0,0,0.15)] rounded-[5.22px] border border-[#757575]/10 rotate-9 transform-gpu flex-col justify-center items-center text-center cursor-default z-20 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2.5 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.22)]"
            style={{ transformOrigin: 'top left' }}
          >
            <span
              className="font-jakarta font-bold text-[25.83px] text-black leading-none mb-1"
              style={{ textShadow: '0px 5px 52px rgba(0, 0, 0, 0.10)' }}
            >
              50+
            </span>
            <span
              className="font-jakarta text-[10.45px] text-black font-normal tracking-wide leading-none"
              style={{ textShadow: '0px 5px 52px rgba(0, 0, 0, 0.10)' }}
            >
              {t.statsReferrals}
            </span>
          </div>

          <div className="hidden lg:flex absolute right-[-170px] bottom-[-20px] w-[170px] h-[85px] p-4 bg-[#EDFBFF] shadow-[0px_5.01px_12.53px_rgba(0,0,0,0.15)] rounded-[5.01px] border border-[#757575]/10 rotate-[4deg] transform-gpu flex-col justify-center items-center text-center cursor-default z-20 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2.5 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.22)]">
            <span
              className="font-jakarta font-bold text-[24.78px] text-black leading-none mb-1"
              style={{ textShadow: '0px 5px 50px rgba(0, 0, 0, 0.10)' }}
            >
              100%
            </span>
            <span
              className="font-jakarta text-[10.02px] text-black font-normal tracking-wide leading-none"
              style={{ textShadow: '0px 5px 50px rgba(0, 0, 0, 0.10)' }}
            >
              {t.statsEncryption}
            </span>
          </div>

          <h2 className="font-montserrat font-bold text-4xl md:text-[64px] text-brand-primary mb-8 tracking-tight leading-none max-w-3xl mx-auto">
            {t.statsTitle}
          </h2>
          <p className="font-sans text-lg md:text-[17px] text-[#0D0D0D] leading-[28px] font-normal max-w-2xl mx-auto">
            {t.statsDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 lg:hidden">
          <div className="bg-[#EDFBFF] p-6 rounded-[5.22px] border border-[#757575]/10 shadow-[0px_5.22px_13.06px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center text-center">
            <span className="font-jakarta font-bold text-[25.83px] text-black leading-none mb-1">
              1000+
            </span>
            <span className="font-jakarta text-[10.45px] text-black font-normal leading-none">
              {t.statsScreening}
            </span>
          </div>

          <div className="bg-[#ECFAFE] p-6 rounded-[5.01px] border border-[#757575]/10 shadow-[0px_5.01px_12.53px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center text-center">
            <span className="font-jakarta font-bold text-[24.78px] text-black leading-none mb-1">
              4.8/5
            </span>
            <span className="font-jakarta text-[10.02px] text-black font-normal leading-none">
              {t.statsSatisfaction}
            </span>
          </div>

          <div className="bg-[#EDFBFF] p-6 rounded-[5.22px] border border-[#757575]/10 shadow-[0px_5.22px_13.06px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center text-center">
            <span className="font-jakarta font-bold text-[25.83px] text-black leading-none mb-1">
              50+
            </span>
            <span className="font-jakarta text-[10.45px] text-black font-normal leading-none">
              {t.statsReferralsShort}
            </span>
          </div>

          <div className="bg-[#EDFBFF] p-6 rounded-[5.01px] border border-[#757575]/10 shadow-[0px_5.01px_12.53px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center text-center">
            <span className="font-jakarta font-bold text-[24.78px] text-black leading-none mb-1">
              100%
            </span>
            <span className="font-jakarta text-[10.02px] text-black font-normal leading-none">
              {t.statsEncryptionShort}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-12">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className={`p-6 rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between min-h-[230px] h-full ${
                test.isDark
                  ? 'bg-[#146178] text-white border border-[#AFAFAF]/10'
                  : 'bg-[#EDFBFF] text-black border-[0.5px] border-[#AFAFAF]/10'
              }`}
            >
              <div className="flex justify-between items-start mb-3 border-b border-slate-200/10 pb-3">
                <div className="text-left leading-[20px] font-sans">
                  <h4
                    className={`text-[12px] font-bold ${test.isDark ? 'text-white' : 'text-black'}`}
                  >
                    {test.name}
                  </h4>
                  <span
                    className={`text-[12px] font-bold ${test.isDark ? 'text-white/80' : 'text-slate-700'}`}
                  >
                    {test.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={test.rating} />

                  <div
                    className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center select-none shrink-0"
                    title={test.name}
                  >
                    <span className="text-[12px] font-bold text-[#555555] uppercase">
                      {test.name.slice(0, 2)}
                    </span>
                  </div>
                </div>
              </div>

              <p
                className={`font-sans text-[12px] font-medium leading-[20px] text-left flex-1 ${
                  test.isDark ? 'text-white' : 'text-black'
                }`}
              >
                {test.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
