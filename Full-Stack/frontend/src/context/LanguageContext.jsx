import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    home: 'Beranda',
    aboutUs: 'Tentang Kami',
    testimoni: 'Testimoni',
    contact: 'Kontak',
    login: 'Masuk',
    register: 'Daftar',
    backToHome: 'Kembali ke Beranda',

    heroBadge: 'Prediksi Risiko Penyakit Dini',
    heroTitle: 'Mirai',
    heroDesc:
      'Mirai membantu Anda melakukan early screening mandiri melalui analisis parameter klinis secara digital. Cukup masukkan data laboratorium Anda untuk mendeteksi potensi risiko kesehatan pada organ dalam seperti jantung dan paru-paru secara cepat, aman, dan tepercaya.',
    heroDescBold: 'early screening mandiri',
    heroMoreInfo: 'Informasi Lebih Lanjut',

    joinBadge: 'Mulai Perjalanan Anda',
    joinTitle: 'Bergabung Bersama Mirai',
    joinDesc:
      'Buat akun baru untuk mulai cek kesehatan mandiri, memantau kondisi tubuh, dan mendapatkan akses layanan kesehatan yang praktis dan terpercaya.',
    joinBtn: 'Gabung Sekarang',
    joinActiveText: 'Layanan Aktif 24/7',

    aboutDesc:
      'Mirai hadir sebagai langkah awal (early screening) digital untuk membantu Anda mendeteksi kondisi organ dalam seperti jantung dan paru-paru secara mandiri, cepat, dan praktis. Bukan sebagai pengganti diagnosis dokter, melainkan sebagai asisten personal yang memberi peringatan dini sebelum Anda melakukan pemeriksaan lebih lanjut ke fasilitas kesehatan.',
    aboutHipaaTitle: 'Terverifikasi HIPAA',
    aboutHipaaDesc:
      'Data pemantauan organ dalam Anda dienkripsi penuh dengan standar internasional HIPAA demi privasi total.',
    aboutGeneticTitle: 'Analisis Genetik & Risiko',
    aboutGeneticDesc:
      'Laporan dirancang sesuai standar medis, siap dibawa ke rumah sakit untuk validasi dan diagnosis final dokter.',
    aboutClinicalTitle: 'Integrasi Klinis',
    aboutClinicalDesc:
      'Data pemantauan organ dalam Anda dienkripsi penuh dengan standar internasional HIPAA demi privasi total.',

    statsTitle: 'Ribuan Pengguna Telah Memulai Langkah Sehat Bersama Mirai',
    statsDesc:
      'Dari deteksi dini organ dalam hingga pemantauan kesehatan harian, simak bagaimana Mirai membantu mereka mendapatkan referensi awal yang akurat sebelum berkonsultasi ke rumah sakit.',
    statsScreening: 'Skrining Berhasil',
    statsSatisfaction: 'Kepuasan Pengguna',
    statsReferrals: 'Rujukan Rumah Sakit',
    statsReferralsShort: 'Rujukan RS',
    statsEncryption: 'Data Terenkripsi (HIPAA)',
    statsEncryptionShort: 'Terenkripsi HIPAA',
    testimonialsRole1: 'Pengguna Mandiri',
    testimonialsRole2: 'Ibu Rumah Tangga',
    testimonialsRole3: 'Praktisi Kesehatan',
    testimonialsRole4: 'Karyawan Swasta',
    testimonialsRole5: 'Pegawai Swasta',
    testimonialsRole6: 'Mahasiswi',
    testimonialsRole7: 'Wiraswasta',

    footerDesc:
      'Membantu deteksi dini risiko organ dalam secara mandiri, digital, cepat, dan tepercaya untuk langkah hidup yang lebih sehat.',
    footerQuickLinks: 'Tautan Langsung',
    footerContact: 'Hubungi Kami',
    footerLocation: 'UGM Cabang Condong Catur Yogyakarta',
    footerRights: 'Semua hak dilindungi undang-undang. Asisten skrining risiko penyakit dini.',

    loginWelcome: 'Selamat datang kembali. Semoga hari Anda menyenangkan, hari ini dan selamanya.',
    registerWelcome:
      'Selamat datang. Semoga ini menjadi awal dari sesuatu yang luar biasa, hari ini dan nanti.',
    labelFullname: 'Nama Lengkap',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelConfirmPassword: 'Konfirmasi Password',
    forgotPassword: 'Lupa Password?',
    dontHaveAccount: 'Belum punya akun?',
    alreadyHaveAccount: 'Sudah punya akun?',
    errorFillFields: 'Silakan isi email dan password Anda.',
    errorAllRequired: 'Semua kolom wajib diisi.',
    errorPasswordMatch: 'Konfirmasi password tidak cocok.',
    successLogin: 'Selamat datang kembali! Mengalihkan ke dashboard...',
    successRegister: 'Pendaftaran berhasil! Silakan masuk.',

    menuDashboard: 'Dashboard',
    menuCheckUp: 'Check-Up',
    menuHistory: 'Riwayat',
    menuAbout: 'Tentang',
    profileGreeting: 'Selamat Pagi',
    profileSubtitle: 'Tetap sehat hari ini.',
    languageToggleLabel: 'Bahasa',

    trackCheckupTitle: 'Tren Check-Up',
    historyTitle: 'Riwayat',
    viewAllBtn: 'Lihat Semua',
    noRecordsText: 'Belum ada catatan check-up.',
    abnormalParametersTitle: 'Parameter Abnormal',

    lymphocyteDesc: 'Kadar limfosit di atas batas normal. Kemungkinan indikasi infeksi virus.',
    creatinineDesc:
      'Kreatinin di bawah batas normal dapat berhubungan dengan massa otot yang rendah atau ketidakseimbangan nutrisi.',
    mchcDesc: 'Konsentrasi hemoglobin rendah terdeteksi, kemungkinan berhubungan dengan anemia.',
    cholesterolDesc:
      'Kadar kolesterol total di atas batas normal. Tingginya kadar kolesterol meningkatkan risiko penyakit kardiovaskular.',

    deleteTitle: 'Hapus Riwayat Skrining?',
    deleteBody:
      'Apakah Anda yakin ingin menghapus data skrining ini secara permanen? Tindakan ini tidak dapat dibatalkan.',
    deleteCancel: 'Batal',
    deleteConfirm: 'Ya, Hapus',

    stepTitle: 'Check-Up (Langkah {step} dari 4)',
    validationAlert:
      'Silakan isi semua parameter skrining wajib untuk melanjutkan ke langkah berikutnya.',
    backBtn: 'Kembali',
    nextBtn: 'Lanjut',
    finishBtn: 'Selesai',
    calculating: 'Menganalisis Hasil Medis...',
    formRequiredWarning: 'wajib diisi',
    ex: 'contoh',

    aboutTabTitle: 'Tentang Deteksi Risiko Medis Mirai',
    aboutTabIntro:
      'Hasil deteksi risiko kesehatan yang disajikan oleh asisten skrining digital Mirai dirancang sepenuhnya berbasis algoritma parameter klinis laboratorium standar medis.',
    aboutTabWarningTitle: 'Peringatan Medis Penting:',
    aboutTabWarning1:
      'Hasil skrining ini HANYA merupakan referensi probabilitas awal dan BUKAN merupakan diagnosis medis final.',
    aboutTabWarning2:
      'Tindakan pencegahan dini sangat disarankan sebelum gejala berkembang menjadi lebih serius.',
    aboutTabWarning3:
      'Konsultasikan selalu hasil laporan klinis digital ini ke dokter spesialis atau fasilitas rumah sakit terdekat untuk penanganan dan diagnosis profesional.',
    aboutTabParamTitle: 'Panduan Parameter Uji Klinis Medis',
    aboutTabParamIntro:
      'Berikut adalah panduan standar medis untuk membantu Anda memahami rentang normal laboratorium dan kegunaannya dalam analisis skrining Mirai:',
    normalRange: 'Rentang Normal',
    unit: 'Satuan',

    statusHigh: 'Tinggi',
    statusNormal: 'Normal',
    statusLow: 'Rendah',
    riskMedium: 'Sedang',
    riskLow: 'Rendah',
    riskHigh: 'Tinggi',
  },
  en: {
    home: 'Home',
    aboutUs: 'About us',
    testimoni: 'Testimonials',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    backToHome: 'Back to Home',

    heroBadge: 'Early Disease Risk Prediction',
    heroTitle: 'Mirai',
    heroDesc:
      'Mirai helps you perform self early screening through digital analysis of clinical parameters. Simply enter your laboratory data to detect potential health risks in internal organs such as the heart and lungs quickly, safely, and reliably.',
    heroDescBold: 'self early screening',
    heroMoreInfo: 'More Info',

    joinBadge: 'Start Your Journey',
    joinTitle: 'Join With Mirai',
    joinDesc:
      'Create a new account to start self health checks, monitor your body condition, and get access to practical and reliable health services.',
    joinBtn: 'Join Now',
    joinActiveText: 'Active Service 24/7',

    aboutDesc:
      "Mirai is here as a digital early screening step to help you detect internal organ conditions such as the heart and lungs independently, quickly, and practically. Not as a substitute for a doctor's diagnosis, but as a personal assistant that provides an early warning before you perform further check-ups at healthcare facilities.",
    aboutHipaaTitle: 'HIPAA Verified',
    aboutHipaaDesc:
      'Your internal organ monitoring data is fully encrypted with international HIPAA standards for total privacy.',
    aboutGeneticTitle: 'Genetic & Risk Analysis',
    aboutGeneticDesc:
      'The report is designed according to medical standards, ready to be brought to the hospital for doctor validation and final diagnosis.',
    aboutClinicalTitle: 'Clinical Integration',
    aboutClinicalDesc:
      'Your internal organ monitoring data is fully encrypted with international HIPAA standards for total privacy.',

    statsTitle: 'Thousands of Users Have Started a Healthy Journey with Mirai',
    statsDesc:
      'From early detection of internal organs to daily health monitoring, see how Mirai helps them get an accurate initial reference before consulting a hospital.',
    statsScreening: 'Successful Screenings',
    statsSatisfaction: 'User Satisfaction',
    statsReferrals: 'Hospital Referrals',
    statsReferralsShort: 'RS Referrals',
    statsEncryption: 'Encrypted Data (HIPAA)',
    statsEncryptionShort: 'HIPAA Encrypted',
    testimonialsRole1: 'Self User',
    testimonialsRole2: 'Housewife',
    testimonialsRole3: 'Health Practitioner',
    testimonialsRole4: 'Private Employee',
    testimonialsRole5: 'Office Worker',
    testimonialsRole6: 'Student',
    testimonialsRole7: 'Entrepreneur',

    footerDesc:
      'Helping self early detection of internal organ risks, digitally, quickly, and reliably for a healthier step in life.',
    footerQuickLinks: 'Quick Links',
    footerContact: 'Contact Us',
    footerLocation: 'UGM Cabang Condong Catur Yogyakarta',
    footerRights: 'All rights reserved. Early disease risk screening assistant.',

    loginWelcome:
      'Welcome back. May your days continue to shine brightly, today and forever after.',
    registerWelcome: 'Welcome. May this be the start of something extraordinary, today and beyond.',
    labelFullname: 'Fullname',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelConfirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: 'Don’t have an account?',
    alreadyHaveAccount: 'Already have an account?',
    errorFillFields: 'Please fill in your email and password.',
    errorAllRequired: 'All fields are required.',
    errorPasswordMatch: 'Password confirmation does not match.',
    successLogin: 'Welcome back! Redirecting to dashboard...',
    successRegister: 'Registration successful! Please login.',

    menuDashboard: 'Dashboard',
    menuCheckUp: 'Check-Up',
    menuHistory: 'History',
    menuAbout: 'About',
    profileGreeting: 'Good Morning',
    profileSubtitle: 'Stay healthy today.',
    languageToggleLabel: 'Language',

    trackCheckupTitle: 'Track Check-Up',
    historyTitle: 'History',
    viewAllBtn: 'View All',
    noRecordsText: 'No check-up records yet.',
    abnormalParametersTitle: 'Abnormal Parameters',

    lymphocyteDesc: 'Lymphocyte is above normal range. Possible indication of viral infection.',
    creatinineDesc:
      'Creatinine below normal range may be associated with low muscle mass or nutritional imbalance.',
    mchcDesc: 'Low hemoglobin concentration detected, possibly associated with anemia.',
    cholesterolDesc:
      'Total cholesterol is above normal range. High cholesterol levels increase the risk of cardiovascular disease.',

    deleteTitle: 'Delete Screening History?',
    deleteBody:
      'Are you sure you want to permanently delete this screening data? This action cannot be undone.',
    deleteCancel: 'Cancel',
    deleteConfirm: 'Yes, Delete',

    stepTitle: 'Check-Up (Step {step} of 4)',
    validationAlert:
      'Please fill in all required screening parameters to proceed to the next step.',
    backBtn: 'Back',
    nextBtn: 'Next',
    finishBtn: 'Finish',
    calculating: 'Analyzing Medical Results...',
    formRequiredWarning: 'required',
    ex: 'ex',

    aboutTabTitle: 'About Mirai Medical Risk Detection',
    aboutTabIntro:
      'The health risk detection results presented by the Mirai digital screening assistant are fully designed based on medical standard laboratory clinical parameter algorithms.',
    aboutTabWarningTitle: 'Important Medical Warning:',
    aboutTabWarning1:
      'This screening result is ONLY an initial probability reference and NOT a final medical diagnosis.',
    aboutTabWarning2:
      'Early preventive action is highly recommended before symptoms develop into something more serious.',
    aboutTabWarning3:
      'Always consult this digital clinical report with a specialist or the nearest hospital facility for professional management and diagnosis.',
    aboutTabParamTitle: 'Medical Clinical Test Parameter Guide',
    aboutTabParamIntro:
      'Here is a medical standard guide to help you understand laboratory normal ranges and their uses in Mirai screening analysis:',
    normalRange: 'Normal Range',
    unit: 'Unit',

    statusHigh: 'High',
    statusNormal: 'Normal',
    statusLow: 'Low',
    riskMedium: 'Medium',
    riskLow: 'Low',
    riskHigh: 'High',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('mirai_lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const setLanguage = (lang) => {
    const newLang = lang === 'en' ? 'en' : 'id';
    setLanguageState(newLang);
    localStorage.setItem('mirai_lang', newLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
