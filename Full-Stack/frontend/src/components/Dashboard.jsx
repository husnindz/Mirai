import { useState, useEffect } from 'react';
import logoFull from '../assets/logo-full.png';
import userAvatar from '../assets/user-avatar.png';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ChevronRight } from 'lucide-react';

export default function Dashboard({
  username = 'Jati Sri Pamungkas',
  email = 'jatispamungkas357@gmail.com',
}) {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const { language, setLanguage, t } = useLanguage();

  const formatCheckUpDate = (dateStr) => {
    if (language === 'id') return dateStr;
    return dateStr
      .replace('Januari', 'January')
      .replace('Februari', 'February')
      .replace('Maret', 'March')
      .replace('April', 'April')
      .replace('Mei', 'May')
      .replace('Juni', 'June')
      .replace('Juli', 'July')
      .replace('Agustus', 'August')
      .replace('September', 'September')
      .replace('Oktober', 'October')
      .replace('November', 'November')
      .replace('Desember', 'December');
  };

  const translateCategory = (cat) => {
    if (cat === 'Penyakit Dalam') return language === 'id' ? 'Penyakit Dalam' : 'Internal Disease';
    if (cat === 'Jantung') return language === 'id' ? 'Penyakit Jantung' : 'Heart Disease';
    if (cat === 'Paru-paru') return language === 'id' ? 'Penyakit Paru-paru' : 'Lung Disease';
    return cat;
  };

  const translateRisk = (rsk) => {
    if (rsk === 'Tinggi' || rsk === 'High') return t.riskHigh;
    if (rsk === 'Sedang' || rsk === 'Medium') return t.riskMedium;
    if (rsk === 'Rendah' || rsk === 'Low') return t.riskLow;
    return rsk;
  };

  const translateStatus = (stat) => {
    if (stat === 'Tinggi' || stat === 'High') return t.statusHigh;
    if (stat === 'Rendah' || stat === 'Low') return t.statusLow;
    if (stat === 'Normal') return t.statusNormal;
    return stat;
  };

  const translateAbnormalText = (text) => {
    if (!text) return '';
    if (language === 'id') return text;
    return text
      .replace('RBS (Gula Darah Sewaktu)', 'RBS (Random Blood Sugar)')
      .replace('Lymfosit', 'Lymphocytes')
      .replace('Kreatinin', 'Creatinine')
      .replace('Ureum', 'Urea')
      .replace('tinggi', 'high')
      .replace('rendah', 'low')
      .replace('Ditemukan', 'Found')
      .replace('parameter abnormal', 'abnormal parameters')
      .replace('Pola hasil paling mendekati kategori', 'The result pattern is closest to')
      .replace('dengan tingkat risiko', 'with a risk level of')
      .replace('penyakit dalam', 'internal disease')
      .replace('jantung', 'heart disease')
      .replace('paru-paru', 'lung disease')
      .replace('sedang', 'medium')
      .replace('Semua parameter dalam rentang normal.', 'All parameters are within normal range.');
  };

  const getTranslatedParamName = (name) => {
    if (name === 'FBS (Gula Darah Puasa)')
      return language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)';
    if (name === 'RBS (Gula Darah Sewaktu)')
      return language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS (Random Blood Sugar)';
    if (name === 'Lymfosit') return language === 'id' ? 'Lymfosit' : 'Lymphocytes';
    if (name === 'Ureum') return language === 'id' ? 'Ureum' : 'Urea';
    return name;
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCheckUpOpen, setIsCheckUpOpen] = useState(false);
  const [checkUpStep, setCheckUpStep] = useState(1);
  const [previousMenu, setPreviousMenu] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [historyPage, setHistoryPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const [historyList, setHistoryList] = useState([
    {
      id: 1,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 82,

      parameters: {
        cholesterol: {
          value: '150',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0 - 200',
        },
        creatinine: {
          value: '0.9',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0.6 - 1.1',
        },
        fbs: {
          value: '90',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '70 - 100',
        },
        rbs: {
          value: '115',
          status: 'Tinggi',
          color: 'bg-[#EB5050] text-[#890909]',
          unit: 'mg/dL',
          range: '70 - 110',
        },
        hgb: {
          value: '14',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '12 - 16',
        },
        lymphocyte: {
          value: '35.8',
          status: 'Tinggi',
          color: 'bg-[#EB5050] text-[#890909]',
          unit: '%',
          range: '20 - 35',
        },
        mch: {
          value: '26.1',
          status: 'Rendah',
          color: 'bg-[#F2C039] text-[#836512]',
          unit: 'pg',
          range: '27 - 34',
        },
        mchc: {
          value: '34',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '32 - 36',
        },
        mcv: {
          value: '79.5',
          status: 'Rendah',
          color: 'bg-[#F2C039] text-[#836512]',
          unit: 'fL',
          range: '80 - 100',
        },
        ureum: {
          value: '28',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '17 - 43',
        },
        wbc: {
          value: '9',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: '10³/µL',
          range: '4 - 11',
        },
      },
      abnormalText:
        'RBS (Gula Darah Sewaktu) (tinggi), Lymfosit (tinggi), MCH (rendah), MCV (rendah)',
      scores: { penyakitDalam: 0.82, paruParu: 0.65, jantung: 0.74 },
    },
    {
      id: 2,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
      parameters: {
        cholesterol: {
          value: '165',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0 - 200',
        },
        creatinine: {
          value: '0.8',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0.6 - 1.1',
        },
        fbs: {
          value: '92',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '70 - 100',
        },
        rbs: {
          value: '105',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '70 - 110',
        },
        hgb: {
          value: '13',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '12 - 16',
        },
        lymphocyte: {
          value: '36.5',
          status: 'Tinggi',
          color: 'bg-[#EB5050] text-[#890909]',
          unit: '%',
          range: '20 - 35',
        },
        mch: {
          value: '28.5',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'pg',
          range: '27 - 34',
        },
        mchc: {
          value: '33',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '32 - 36',
        },
        mcv: {
          value: '82',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'fL',
          range: '80 - 100',
        },
        ureum: {
          value: '30',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '17 - 43',
        },
        wbc: {
          value: '8.5',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: '10³/µL',
          range: '4 - 11',
        },
      },
      abnormalText: 'Lymfosit (tinggi)',
      scores: { penyakitDalam: 0.67, paruParu: 0.45, jantung: 0.35 },
    },
    {
      id: 3,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 4,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 5,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 6,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 7,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 8,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 9,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 10,
      category: 'Penyakit Dalam',
      date: '16 Mei 2026, 13.21',
      risk: 'Sedang',
      riskColor: 'bg-[#F2C039] text-[#836512]',
      score: 67,
    },
    {
      id: 11,
      category: 'Jantung',
      date: '15 Mei 2026, 10.45',
      risk: 'Rendah',
      riskColor: 'bg-[#17ADB4] text-[#084F63]',
      score: 23,
    },
    {
      id: 12,
      category: 'Paru-paru',
      date: '14 Mei 2026, 16.30',
      risk: 'Rendah',
      riskColor: 'bg-[#17ADB4] text-[#084F63]',
      score: 18,
    },
  ]);

  const [cholesterol, setCholesterol] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [fbs, setFbs] = useState('');

  const [rbs, setRbs] = useState('');
  const [hgb, setHgb] = useState('');
  const [lymphocyte, setLymphocyte] = useState('');

  const [mch, setMch] = useState('');
  const [mchc, setMchc] = useState('');
  const [mcv, setMcv] = useState('');

  const [ureum, setUreum] = useState('');
  const [wbc, setWbc] = useState('');

  useEffect(() => {
    const syncHashToMenu = () => {
      const hash = window.location.hash;
      if (hash === '#check-up') {
        setActiveMenu('Check-Up');
        setIsCheckUpOpen(true);
      } else if (hash === '#history') {
        setActiveMenu('History');
        setIsCheckUpOpen(false);
      } else if (hash === '#about') {
        setActiveMenu('About');
        setIsCheckUpOpen(false);
      } else if (hash === '#dashboard' || hash === '') {
        setActiveMenu('Dashboard');
        setIsCheckUpOpen(false);
      }
    };

    syncHashToMenu();
    window.addEventListener('hashchange', syncHashToMenu);
    return () => window.removeEventListener('hashchange', syncHashToMenu);
  }, []);

  const isStepValid = () => {
    if (checkUpStep === 1) {
      return cholesterol.trim() !== '' && creatinine.trim() !== '' && fbs.trim() !== '';
    }
    if (checkUpStep === 2) {
      return rbs.trim() !== '' && hgb.trim() !== '' && lymphocyte.trim() !== '';
    }
    if (checkUpStep === 3) {
      return mch.trim() !== '' && mchc.trim() !== '' && mcv.trim() !== '';
    }
    if (checkUpStep === 4) {
      return ureum.trim() !== '' && wbc.trim() !== '';
    }
    return true;
  };

  const handleLogout = () => {
    window.location.hash = '#';
  };

  const handleOpenCheckUp = () => {
    if (window.location.hash !== '#check-up' && window.location.hash !== '') {
      const currentPath = window.location.hash.replace('#', '');
      if (['dashboard', 'history', 'about'].includes(currentPath)) {
        const formattedMenu =
          currentPath === 'dashboard'
            ? 'Dashboard'
            : currentPath === 'history'
              ? 'History'
              : 'About';
        setPreviousMenu(formattedMenu);
      }
    }
    window.location.hash = '#check-up';
    setCheckUpStep(1);
  };

  const handleCloseCheckUp = () => {
    setIsCheckUpOpen(false);
    const targetHash = '#' + previousMenu.toLowerCase();
    window.location.hash = targetHash;
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      setCheckUpStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setCheckUpStep((prev) => prev - 1);
  };

  const handleDeleteHistory = (id) => {
    setHistoryList(historyList.filter((item) => item.id !== id));
    if (selectedHistoryItem && selectedHistoryItem.id === id) {
      setSelectedHistoryItem(null);
    }
  };

  const handleDrillDownResult = (item) => {
    if (!item.parameters) {
      const isHigh = item.score > 70;
      item.parameters = {
        cholesterol: {
          value: isHigh ? '245' : '172',
          status: isHigh ? 'Tinggi' : 'Normal',
          color: isHigh ? 'bg-[#EB5050] text-[#890909]' : 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0 - 200',
        },
        creatinine: {
          value: '0.8',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '0.6 - 1.1',
        },
        fbs: {
          value: isHigh ? '130' : '88',
          status: isHigh ? 'Tinggi' : 'Normal',
          color: isHigh ? 'bg-[#EB5050] text-[#890909]' : 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '70 - 100',
        },
        rbs: {
          value: '95',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '70 - 110',
        },
        hgb: {
          value: '14',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '12 - 16',
        },
        lymphocyte: {
          value: '28',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: '%',
          range: '20 - 35',
        },
        mch: {
          value: '29',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'pg',
          range: '27 - 34',
        },
        mchc: {
          value: '34',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'g/dL',
          range: '32 - 36',
        },
        mcv: {
          value: '88',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'fL',
          range: '80 - 100',
        },
        ureum: {
          value: '25',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: 'mg/dL',
          range: '17 - 43',
        },
        wbc: {
          value: '7',
          status: 'Normal',
          color: 'bg-[#17ADB4] text-[#084F63]',
          unit: '10³/µL',
          range: '4 - 11',
        },
      };
      item.abnormalText = isHigh
        ? 'Cholesterol Total (tinggi), FBS (tinggi)'
        : 'Semua parameter dalam rentang normal';
      item.scores = {
        penyakitDalam: isHigh ? 0.81 : 0.2,
        paruParu: isHigh ? 0.4 : 0.15,
        jantung: isHigh ? 0.56 : 0.23,
      };
    }

    setSelectedHistoryItem(item);
    setActiveMenu('History');
  };

  const handleFinishCheckUp = () => {
    const cholVal = parseFloat(cholesterol) || 150;
    const creatinineVal = parseFloat(creatinine) || 0.9;
    const fbsVal = parseFloat(fbs) || 90;
    const rbsVal = parseFloat(rbs) || 115;
    const hgbVal = parseFloat(hgb) || 14;
    const lymphocyteVal = parseFloat(lymphocyte) || 35.8;
    const mchVal = parseFloat(mch) || 26.1;
    const mchcVal = parseFloat(mchc) || 34;
    const mcvVal = parseFloat(mcv) || 79.5;
    const ureumVal = parseFloat(ureum) || 28;
    const wbcVal = parseFloat(wbc) || 9;

    let score = 52;
    let category = 'Paru-paru';
    let risk = 'Rendah';
    let riskColor = 'bg-[#17ADB4] text-[#084F63]';

    if (cholVal > 240 || fbsVal > 125) {
      score = 82;
      category = 'Penyakit Dalam';
      risk = 'Tinggi';
      riskColor = 'bg-[#EB5050] text-[#530505]';
    } else if (cholVal > 200 || fbsVal > 100 || hgbVal < 11 || lymphocyteVal > 35) {
      score = 82;
      category = 'Penyakit Dalam';
      risk = 'Sedang';
      riskColor = 'bg-[#F2C039] text-[#836512]';
    }

    const today = new Date();
    const formattedDate =
      today.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) +
      `, ${today.getHours().toString().padStart(2, '0')}.${today.getMinutes().toString().padStart(2, '0')}`;

    const checkStatus = (val, min, max) => {
      const num = parseFloat(val);
      if (num < min) return { status: 'Rendah', color: 'bg-[#F2C039] text-[#836512]' };
      if (num > max) return { status: 'Tinggi', color: 'bg-[#EB5050] text-[#890909]' };
      return { status: 'Normal', color: 'bg-[#17ADB4] text-[#084F63]' };
    };

    const paramResults = {
      cholesterol: {
        value: String(cholVal),
        ...checkStatus(cholVal, 0, 200),
        unit: 'mg/dL',
        range: '0 - 200',
      },
      creatinine: {
        value: String(creatinineVal),
        ...checkStatus(creatinineVal, 0.6, 1.1),
        unit: 'mg/dL',
        range: '0.6 - 1.1',
      },
      fbs: {
        value: String(fbsVal),
        ...checkStatus(fbsVal, 70, 100),
        unit: 'mg/dL',
        range: '70 - 100',
      },
      rbs: {
        value: String(rbsVal),
        ...checkStatus(rbsVal, 70, 110),
        unit: 'mg/dL',
        range: '70 - 110',
      },
      hgb: {
        value: String(hgbVal),
        ...checkStatus(hgbVal, 12, 16),
        unit: 'g/dL',
        range: '12 - 16',
      },
      lymphocyte: {
        value: String(lymphocyteVal),
        ...checkStatus(lymphocyteVal, 20, 35),
        unit: '%',
        range: '20 - 35',
      },
      mch: { value: String(mchVal), ...checkStatus(mchVal, 27, 34), unit: 'pg', range: '27 - 34' },
      mchc: {
        value: String(mchcVal),
        ...checkStatus(mchcVal, 32, 36),
        unit: 'g/dL',
        range: '32 - 36',
      },
      mcv: {
        value: String(mcvVal),
        ...checkStatus(mcvVal, 80, 100),
        unit: 'fL',
        range: '80 - 100',
      },
      ureum: {
        value: String(ureumVal),
        ...checkStatus(ureumVal, 17, 43),
        unit: 'mg/dL',
        range: '17 - 43',
      },
      wbc: {
        value: String(wbcVal),
        ...checkStatus(wbcVal, 4, 11),
        unit: '10³/µL',
        range: '4 - 11',
      },
    };

    const abnormals = [];
    Object.entries(paramResults).forEach(([key, param]) => {
      if (param.status !== 'Normal') {
        const displayName =
          key === 'cholesterol'
            ? 'Cholesterol Total'
            : key === 'creatinine'
              ? 'Creatinin'
              : key === 'fbs'
                ? 'FBS (Gula Darah Puasa)'
                : key === 'rbs'
                  ? 'RBS (Gula Darah Sewaktu)'
                  : key === 'hgb'
                    ? 'Hgb (Hemoglobin)'
                    : key === 'lymphocyte'
                      ? 'Lymfosit'
                      : key.toUpperCase();
        abnormals.push(`${displayName} (${param.status.toLowerCase()})`);
      }
    });

    const abnormalText =
      abnormals.length > 0
        ? `Ditemukan ${abnormals.length} parameter abnormal: ${abnormals.join(', ')}. Pola hasil paling mendekati kategori ${category.toLowerCase()} dengan tingkat risiko ${risk.toLowerCase()}.`
        : 'Semua parameter dalam rentang normal.';

    const newRecord = {
      id: Date.now(),
      category,
      date: formattedDate,
      risk,
      riskColor,
      score,
      parameters: paramResults,
      abnormalText,
      scores: {
        penyakitDalam: category === 'Penyakit Dalam' ? score / 100 : 0.35,
        paruParu: category === 'Paru-paru' ? score / 100 : 0.2,
        jantung: category === 'Jantung' ? score / 100 : 0.4,
      },
    };

    setHistoryList([newRecord, ...historyList]);
    setIsCheckUpOpen(false);

    handleDrillDownResult(newRecord);

    setCholesterol('');
    setCreatinine('');
    setFbs('');
    setRbs('');
    setHgb('');
    setLymphocyte('');
    setMch('');
    setMchc('');
    setMcv('');
    setUreum('');
    setWbc('');
  };

  const totalPages = Math.ceil(historyList.length / itemsPerPage);
  const indexOfLastItem = historyPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistoryItems = historyList.slice(indexOfFirstItem, indexOfLastItem);

  const parametersReference = [
    { name: 'Cholesterol Total', range: '0 - 200', unit: 'mg/dL' },
    { name: 'Creatinin', range: '0.6 - 1.1', unit: 'mg/dL' },
    { name: 'FBS (Gula Darah Puasa)', range: '70 - 100', unit: 'mg/dL' },
    { name: 'RBS (Gula Darah Sewaktu)', range: '70 - 110', unit: 'mg/dL' },
    { name: 'Hgb (Hemoglobin)', range: '12 - 16', unit: 'g/dL' },
    { name: 'Lymfosit', range: '20 - 35', unit: '%' },
    { name: 'MCH', range: '27 - 34', unit: 'pg' },
    { name: 'MCHC', range: '32 - 36', unit: 'g/dL' },
    { name: 'MCV', range: '80 - 100', unit: 'fL' },
    { name: 'Ureum', range: '17 - 43', unit: 'mg/dL' },
    { name: 'WBC', range: '4 - 11', unit: '10³/µL' },
  ];

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#EDFBFF] font-sans text-slate-800 flex flex-col lg:flex-row select-none relative lg:overflow-hidden">
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#D9F6FF] border-b border-brand-primary/10 w-full z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-primary p-1 rounded-md focus:outline-none hover:bg-brand-primary/10"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <img
            src={logoFull}
            alt="Mirai Logo"
            className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => {
              window.location.hash = '#dashboard';
              setSelectedHistoryItem(null);
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-brand-primary/20"
            />
            <span className="font-semibold text-xs text-brand-primary truncate max-w-[80px]">
              {username}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-10 bg-white border border-brand-primary/10 rounded-lg shadow-lg py-1 w-36 z-50 animate-fade-in">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-[#F8FDFF]/80 backdrop-blur-[4px] transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-[280px] max-w-xs h-full bg-[#D9F6FF] shadow-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between pb-6 border-b border-brand-primary/10">
              <img
                src={logoFull}
                alt="Mirai Logo"
                className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                onClick={() => {
                  window.location.hash = '#dashboard';
                  setSelectedHistoryItem(null);
                  setIsMobileMenuOpen(false);
                }}
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-primary p-1 rounded-md hover:bg-brand-primary/10 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-3">
              <button
                onClick={() => {
                  window.location.hash = '#dashboard';
                  setSelectedHistoryItem(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  activeMenu === 'Dashboard'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${activeMenu === 'Dashboard' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuDashboard}</span>
              </button>

              <button
                onClick={() => {
                  handleOpenCheckUp();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  activeMenu === 'Check-Up'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${activeMenu === 'Check-Up' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuCheckUp}</span>
              </button>

              <button
                onClick={() => {
                  window.location.hash = '#history';
                  setSelectedHistoryItem(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  activeMenu === 'History'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${activeMenu === 'History' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuHistory}</span>
              </button>

              <button
                onClick={() => {
                  window.location.hash = '#about';
                  setSelectedHistoryItem(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full h-[45px] px-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  activeMenu === 'About'
                    ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                    : 'text-[#262626] hover:bg-brand-primary/10'
                }`}
              >
                <svg
                  className={`w-[20px] h-[20px] shrink-0 ${activeMenu === 'About' ? 'text-brand-accent' : 'text-[#262626]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-montserrat font-semibold text-[20px]">{t.menuAbout}</span>
              </button>

              <div className="px-4 py-2 border-t border-brand-primary/10 mt-2 select-none">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-semibold text-[15px] text-[#262626]">
                    {t.languageToggleLabel || 'Language'}
                  </span>
                  <div className="flex bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-full p-0.5 select-none">
                    <button
                      onClick={() => setLanguage('id')}
                      className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                        language === 'id'
                          ? 'bg-[#146178] text-white shadow-sm'
                          : 'text-slate-500 hover:text-[#146178]'
                      }`}
                    >
                      ID
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 text-xs font-bold font-sans rounded-full transition-all duration-300 ${
                        language === 'en'
                          ? 'bg-[#146178] text-white shadow-sm'
                          : 'text-slate-500 hover:text-[#146178]'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="w-full p-4 bg-brand-primary rounded-xl flex items-center justify-between border-t border-white/10 shrink-0 text-white mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div className="text-left leading-tight">
                  <div className="text-[14px] font-poppins font-semibold truncate max-w-[120px] text-white">
                    {username}
                  </div>
                  <div className="text-white/75 text-[10px] font-poppins truncate max-w-[120px]">
                    {email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 hover:bg-white/10 rounded text-rose-300"
                title="Log Out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:flex flex-col w-[341px] lg:h-screen p-6 bg-transparent shrink-0 animate-fade-in">
        <div className="flex justify-center mb-8 mt-4 shrink-0">
          <div
            style={{ width: '191px', height: '191px' }}
            className="cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
            onClick={() => {
              window.location.hash = '#dashboard';
              setSelectedHistoryItem(null);
            }}
            title={language === 'id' ? 'Kembali ke Dashboard' : 'Back to Dashboard'}
          >
            <img
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              src={logoFull}
              alt="Mirai Logo"
            />
          </div>
        </div>

        <div className="flex flex-col h-full bg-[#D9F6FF] rounded-[20px] shadow-xl shadow-brand-primary/5 relative overflow-hidden flex-1">
          <nav className="flex-1 px-6 py-6 space-y-4">
            <button
              onClick={() => {
                window.location.hash = '#dashboard';
                setSelectedHistoryItem(null);
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                activeMenu === 'Dashboard'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${activeMenu === 'Dashboard' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuDashboard}</span>
            </button>

            <button
              onClick={handleOpenCheckUp}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                activeMenu === 'Check-Up'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${activeMenu === 'Check-Up' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuCheckUp}</span>
            </button>

            <button
              onClick={() => {
                window.location.hash = '#history';
                setSelectedHistoryItem(null);
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                activeMenu === 'History'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${activeMenu === 'History' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                className={`font-montserrat font-semibold text-[26px] ${activeMenu === 'History' ? 'text-brand-accent' : ''}`}
              >
                {t.menuHistory}
              </span>
            </button>

            <button
              onClick={() => {
                window.location.hash = '#about';
                setSelectedHistoryItem(null);
              }}
              className={`w-full h-[49px] px-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                activeMenu === 'About'
                  ? 'bg-brand-primary text-brand-accent shadow-md shadow-brand-primary/20'
                  : 'text-[#262626] hover:bg-brand-primary/10'
              }`}
            >
              <svg
                className={`w-[24px] h-[24px] shrink-0 ${activeMenu === 'About' ? 'text-brand-accent' : 'text-[#262626]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-montserrat font-semibold text-[26px]">{t.menuAbout}</span>
            </button>
          </nav>

          <div className="w-full h-[86px] px-5 bg-brand-primary flex items-center justify-between border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full object-cover border border-white/20 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              <div className="text-left leading-tight">
                <div className="text-[#F8FDFF] text-[18px] font-poppins font-semibold truncate max-w-[150px]">
                  {username}
                </div>
                <div className="text-white/75 text-[12px] font-poppins font-semibold truncate max-w-[150px]">
                  {email}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-white flex items-center justify-center focus:outline-none transition-colors"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 bottom-12 bg-white border border-brand-primary/10 rounded-lg shadow-xl py-1.5 w-44 z-50 animate-fade-in text-left">
                  <div className="px-4 py-2 border-b border-slate-100 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.languageToggleLabel || 'Language'}
                    </span>
                    <div className="flex bg-slate-100 rounded-lg p-0.5 select-none">
                      <button
                        onClick={() => setLanguage('id')}
                        className={`flex-1 py-1 text-center text-xs font-bold font-sans rounded-md transition-all duration-200 ${
                          language === 'id'
                            ? 'bg-[#146178] text-white shadow-sm'
                            : 'text-slate-500 hover:text-[#146178]'
                        }`}
                      >
                        ID
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={`flex-1 py-1 text-center text-xs font-bold font-sans rounded-md transition-all duration-200 ${
                          language === 'en'
                            ? 'bg-[#146178] text-white shadow-sm'
                            : 'text-slate-500 hover:text-[#146178]'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeMenu === 'History' && selectedHistoryItem ? (
          <div className="w-full text-left animate-fade-in select-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 w-full">
              <div className="text-left">
                <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-none mb-2 tracking-tight">
                  {language === 'id' ? 'Hasil' : 'Result'}
                </h1>
                <p className="font-poppins font-normal text-[20px] text-[#262626]">
                  {formatCheckUpDate(selectedHistoryItem.date)}
                </p>

                <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
                  <a
                    href="#dashboard"
                    className="hover:text-brand-primary/80"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = '#dashboard';
                      setSelectedHistoryItem(null);
                    }}
                  >
                    <svg
                      className="w-5 h-5 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </a>
                  <span>
                    <ChevronRight />
                  </span>
                  <a
                    href="#history"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedHistoryItem(null);
                    }}
                  >
                    {t.menuHistory}
                  </a>
                  <span>
                    <ChevronRight />
                  </span>
                  <span className="text-slate-500">{language === 'id' ? 'Hasil' : 'Result'}</span>
                </nav>
              </div>

              <div className="flex flex-col items-end gap-2 self-center">
                <div className="w-[125px] h-[30px] bg-[#17ADB4] rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[#084F63] text-[14px] font-poppins font-medium">
                    {language === 'id' ? 'Selesai' : 'Completed'}
                  </span>
                </div>

                <button
                  onClick={() =>
                    alert(
                      language === 'id'
                        ? 'Laporan PDF berhasil diekspor!'
                        : 'PDF report exported successfully!',
                    )
                  }
                  className="w-[140px] h-[44px] bg-[#5BF2C2] text-[#146178] font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#4be0b1] active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-[30px] w-full mb-12">
              <div className="col-span-1 xl:col-span-7 bg-[#EDFBFF] border border-[#AFAFAF]/20 rounded-[20px] p-[24px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between sm:h-[250px] min-h-[220px] h-auto pb-16">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <span className="text-[#777777] text-[16px] font-poppins font-normal flex items-center gap-2">
                      <span className="w-5 h-5 bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-[#77F9D0]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                          />
                        </svg>
                      </span>
                      {language === 'id' ? 'Indikasi Utama' : 'Primary Indication'}
                    </span>
                    <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary leading-tight">
                      {translateCategory(selectedHistoryItem.category)}
                    </h2>
                  </div>

                  <div className="px-5 py-1 bg-[#F2C039] rounded-full text-[14px] font-poppins font-medium text-[#836512] shadow-sm">
                    {language === 'id' ? 'Risiko' : 'Risk'}{' '}
                    {translateRisk(selectedHistoryItem.risk)}
                  </div>
                </div>

                <div className="relative w-full h-[40px] mt-6 flex items-center">
                  <div className="w-full h-[20px] bg-gradient-to-r from-[#17ADB4] via-[#F1C039] to-[#EB5050] rounded-[30px]" />

                  <div
                    className="absolute w-[30px] h-[30px] bg-[#005868] rounded-full border-2 border-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-1/2 -translate-y-1/2"
                    style={{ left: `calc(${selectedHistoryItem.score}% - 15px)` }}
                  />

                  <div
                    className="absolute transform -translate-x-1/2 text-center font-poppins font-semibold text-[20px] text-[#146178] top-[36px]"
                    style={{ left: `${selectedHistoryItem.score}%` }}
                  >
                    {selectedHistoryItem.score}%
                  </div>
                </div>
              </div>

              <div className="col-span-1 xl:col-span-5 bg-[#EDFBFF] border border-[#AFAFAF]/20 rounded-[20px] p-[24px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between sm:h-[250px] min-h-[220px] h-auto pb-4 text-left">
                <span className="text-[#777777] text-[16px] font-poppins font-normal flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[#77F9D0]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                      />
                    </svg>
                  </span>
                  {language === 'id' ? 'Skor per Kategori' : 'Score per Category'}
                </span>

                <div className="space-y-[15px] flex-1 flex flex-col justify-center">
                  <div className="space-y-1">
                    <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
                      <span>{translateCategory('Penyakit Dalam')}</span>
                      <span>{selectedHistoryItem.scores.penyakitDalam.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
                      <div
                        className="h-full bg-brand-primary rounded-[30px] transition-all"
                        style={{ width: `${selectedHistoryItem.scores.penyakitDalam * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
                      <span>{translateCategory('Paru-paru')}</span>
                      <span>{selectedHistoryItem.scores.paruParu.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
                      <div
                        className="h-full bg-brand-primary rounded-[30px] transition-all"
                        style={{ width: `${selectedHistoryItem.scores.paruParu * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
                      <span>{translateCategory('Jantung')}</span>
                      <span>{selectedHistoryItem.scores.jantung.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
                      <div
                        className="h-full bg-brand-primary rounded-[30px] transition-all"
                        style={{ width: `${selectedHistoryItem.scores.jantung * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-[#005868] mb-6">
                {language === 'id' ? 'Parameter & Rentang Normal' : 'Parameters & Normal Ranges'}
              </h2>

              <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-[#D9F6FF] h-[61px] border-b border-[#AFAFAF]">
                        <th className="w-[35%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                          Parameter
                        </th>
                        <th className="w-[20%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-right">
                          {language === 'id' ? 'Nilai' : 'Value'}
                        </th>
                        <th className="w-[25%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8">
                          {language === 'id' ? 'Rentang' : 'Range'}
                        </th>
                        <th className="w-[20%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-center">
                          {language === 'id' ? 'Status' : 'Status'}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(selectedHistoryItem.parameters).map(([key, param]) => {
                        const displayName =
                          key === 'cholesterol'
                            ? language === 'id'
                              ? 'Kolesterol Total'
                              : 'Total Cholesterol'
                            : key === 'creatinine'
                              ? language === 'id'
                                ? 'Kreatinin'
                                : 'Creatinine'
                              : key === 'fbs'
                                ? language === 'id'
                                  ? 'FBS (Gula Darah Puasa)'
                                  : 'FBS (Fasting Blood Sugar)'
                                : key === 'rbs'
                                  ? language === 'id'
                                    ? 'RBS (Gula Darah Sewaktu)'
                                    : 'RBS (Random Blood Sugar)'
                                  : key === 'hgb'
                                    ? language === 'id'
                                      ? 'Hgb (Hemoglobin)'
                                      : 'Hgb (Hemoglobin)'
                                    : key === 'lymphocyte'
                                      ? language === 'id'
                                        ? 'Lymfosit %'
                                        : 'Lymphocytes %'
                                      : key === 'mch'
                                        ? 'MCH'
                                        : key === 'mchc'
                                          ? 'MCHC'
                                          : key === 'mcv'
                                            ? 'MCV'
                                            : key === 'ureum'
                                              ? language === 'id'
                                                ? 'Ureum'
                                                : 'Urea'
                                              : key === 'wbc'
                                                ? 'WBC'
                                                : key.toUpperCase();

                        return (
                          <tr
                            key={key}
                            className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                          >
                            <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                              {displayName}
                            </td>
                            <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8 text-right">
                              {param.value}{' '}
                              <span className="text-[#777777] font-poppins font-normal text-[10px]">
                                {param.unit}
                              </span>
                            </td>
                            <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8">
                              {param.range}
                            </td>
                            <td className="py-1.5 px-2 sm:py-2.5 sm:px-8 text-center">
                              <div
                                className={`sm:w-[125px] w-[80px] sm:h-[30px] h-[22px] rounded-full flex items-center justify-center font-poppins font-semibold sm:text-[14px] text-[10px] mx-auto shadow-sm ${
                                  param.status === 'Tinggi' || param.status === 'High'
                                    ? 'bg-[#EB5050] text-[#890909]'
                                    : param.status === 'Rendah' || param.status === 'Low'
                                      ? 'bg-[#F2C039] text-[#836512]'
                                      : 'bg-[#17ADB4] text-[#084F63]'
                                }`}
                              >
                                {translateStatus(param.status)}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full mb-12">
              <div className="bg-[#EDFBFF] border border-[#AFAFAF]/30 rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
                <h4 className="font-montserrat font-bold text-[24px] text-[#262626] mb-3">
                  {language === 'id' ? 'Ringkasan' : 'Summary'}
                </h4>
                <p className="font-montserrat font-medium text-[16px] text-[#262626] leading-relaxed">
                  {translateAbnormalText(selectedHistoryItem.abnormalText)}
                </p>
              </div>

              <div className="bg-[#EDFBFF] border-2 border-brand-accent rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
                <h4 className="font-montserrat font-bold text-[24px] text-brand-primary mb-3">
                  {language === 'id' ? 'Rekomendasi Tindak Lanjut' : 'Follow-Up Recommendations'}
                </h4>
                <p className="font-montserrat font-medium text-[16px] text-slate-800 leading-relaxed">
                  {selectedHistoryItem.category === 'Penyakit Dalam'
                    ? language === 'id'
                      ? 'Disarankan kontrol ke dokter umum dalam 1-2 minggu, jaga pola makan rendah lemak & gula, perbanyak minum air putih, dan lakukan pemeriksaan ulang dalam 1 bulan.'
                      : 'It is recommended to consult a general practitioner within 1-2 weeks, maintain a low-fat & low-sugar diet, drink plenty of water, and repeat the examination in 1 month.'
                    : language === 'id'
                      ? 'Lakukan olahraga kardio ringan secara teratur, kurangi konsumsi garam dan makanan kolesterol tinggi, kelola stress, dan periksakan tekanan darah rutin.'
                      : 'Perform light cardio exercise regularly, reduce intake of salt and high-cholesterol foods, manage stress, and check blood pressure routinely.'}
                </p>
              </div>
            </div>

            <div className="w-full bg-brand-primary p-8 rounded-[20px] text-left text-white shadow-xl shadow-brand-primary/10 select-none">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-montserrat font-bold text-[32px] text-[#77F9D0]">Disclaimer</h3>
                <div className="w-[38px] h-[38px] bg-[#F2C039] rounded-[5px] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-[#836512]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <p className="font-montserrat font-medium text-[16px] leading-[21.6px] text-[#F8FDFF] leading-relaxed w-full">
                {language === 'id'
                  ? 'Mirai merupakan alat bantu skrining awal berbasis kecerdasan buatan dan aturan medis (rule-based system) yang dirancang untuk membantu pengguna dalam memperoleh gambaran awal terkait kondisi kesehatan berdasarkan data dan gejala yang dimasukkan. Sistem ini dikembangkan sebagai media pendukung analisis awal dan edukasi kesehatan, bukan sebagai alat diagnosis utama maupun pengganti tenaga medis profesional.'
                  : 'Mirai is an early screening tool based on artificial intelligence and medical rules designed to help users obtain an initial overview of health conditions based on the data and symptoms entered. This system was developed as a support medium for initial analysis and health education, not as a primary diagnostic tool nor as a substitute for professional medical personnel.'}
              </p>
            </div>
          </div>
        ) : activeMenu === 'History' ? (
          <div className="w-full text-left">
            <div className="mb-10">
              <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
                {t.historyTitle || 'History'}
              </h1>
              <p className="font-poppins font-normal text-[20px] text-[#262626]">
                {language === 'id'
                  ? 'Pantau semua riwayat pemeriksaan Anda di sini.'
                  : 'Track all of your check-ups here.'}
              </p>

              <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
                <a
                  href="#dashboard"
                  className="hover:text-brand-primary/80"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '#dashboard';
                    setActiveMenu('Dashboard');
                  }}
                >
                  <svg
                    className="w-5 h-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
                <span>
                  <ChevronRight />
                </span>
                <span className="text-slate-500">{t.menuHistory}</span>
              </nav>
            </div>

            <div className="w-full bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[601px] justify-between mb-8 select-none">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-[#D9F6FF] h-[60px] border-b border-[#AFAFAF]">
                      <th className="w-[10%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'No' : 'No'}
                      </th>
                      <th className="w-[28%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'Tanggal' : 'Date'}
                      </th>
                      <th className="w-[24%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'Indikasi' : 'Indication'}
                      </th>
                      <th className="w-[14%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'Probabilitas' : 'Probability'}
                      </th>
                      <th className="w-[12%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'Risiko' : 'Risk'}
                      </th>
                      <th className="w-[12%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
                        {language === 'id' ? 'Aksi' : 'Action'}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentHistoryItems.map((item, index) => {
                      const rowNum = indexOfFirstItem + index + 1;
                      return (
                        <tr
                          key={item.id}
                          className="h-[49px] border-b border-[#AFAFAF]/40 hover:bg-[#F2C039]/20 transition-colors cursor-pointer"
                          onClick={() => handleDrillDownResult(item)}
                        >
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                            {rowNum}
                          </td>
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                            {formatCheckUpDate(item.date)}
                          </td>

                          <td className="py-1.5 px-1.5 sm:py-2 sm:px-4">
                            <span className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-normal whitespace-nowrap">
                              {translateCategory(item.category)}
                            </span>
                          </td>

                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                            {item.score}%
                          </td>
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                            {translateRisk(item.risk)}
                          </td>

                          <td className="py-1.5 px-1.5 sm:py-2 sm:px-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(item.id);
                              }}
                              className="sm:w-[30px] sm:h-[30px] w-[24px] h-[24px] bg-[#EB5050] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-sm cursor-pointer mx-auto"
                              title={language === 'id' ? 'Hapus riwayat' : 'Delete history'}
                            >
                              <svg
                                className="w-4 h-4 text-[#530505]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {currentHistoryItems.length < 10 &&
                      Array.from({ length: 10 - currentHistoryItems.length }).map((_, idx) => (
                        <tr key={`empty-${idx}`} className="h-[49px] border-b border-[#AFAFAF]/10">
                          <td colSpan={6} className="py-2">
                            &nbsp;
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="px-8 py-5 border-t border-[#AFAFAF]/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setHistoryPage((prev) => Math.max(prev - 1, 1))}
                  disabled={historyPage === 1}
                  className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                >
                  <svg
                    className="w-4 h-4 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {t.backBtn || 'Back'}
                </button>

                <div className="flex items-center gap-2 font-arimo">
                  {Array.from({ length: totalPages }).map((_, pageIdx) => {
                    const pageNum = pageIdx + 1;
                    const isActive = historyPage === pageNum;

                    if (totalPages > 5 && pageNum > 2 && pageNum < totalPages - 1) {
                      if (pageNum === 3) {
                        return (
                          <span
                            key="dots"
                            className="w-[21px] text-center text-brand-primary text-[16px] font-normal leading-[17px]"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setHistoryPage(pageNum)}
                        className={`w-[30px] h-[30px] rounded-[5px] text-[16px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#77F9D0] text-[#005868]'
                            : 'text-brand-primary hover:bg-brand-primary/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setHistoryPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={historyPage === totalPages || totalPages === 0}
                  className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
                >
                  {t.nextBtn || 'Next'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : activeMenu === 'About' ? (
          <div className="w-full text-left animate-fade-in select-none">
            <div className="mb-10">
              <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-[#005868] leading-tight mb-2 tracking-tight">
                {t.menuAbout}
              </h1>
              <p className="font-poppins font-normal text-[20px] text-[#262626]">
                {language === 'id'
                  ? 'Informasi tentang bagaimana aplikasi kami bekerja.'
                  : 'Information about how our application works.'}
              </p>

              <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
                <a
                  href="#dashboard"
                  className="hover:text-brand-primary/80"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '#dashboard';
                    setActiveMenu('Dashboard');
                  }}
                >
                  <svg
                    className="w-5 h-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
                <span>
                  <ChevronRight />
                </span>
                <span className="text-slate-500">{t.menuAbout}</span>
              </nav>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-[28px] w-full mb-12">
              <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-[100px] h-[100px] bg-[#146178] rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
                  <svg
                    className="w-12 h-12 text-[#77F9D0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                    <path d="M12 5v14" />
                    <path d="M12 9h4a2 2 0 0 0 2-2V6" />
                    <path d="M12 9H8a2 2 0 0 1-2-2V6" />
                    <path d="M12 13h4a2 2 0 0 1 2 2v1" />
                    <path d="M12 13H8a2 2 0 0 0-2 2v1" />
                  </svg>
                </div>
                <div className="text-left leading-normal">
                  <h4 className="font-montserrat font-bold text-[16px] text-[#146178] mb-[6px]">
                    {language === 'id' ? 'Algoritma ML' : 'ML Algorithm'}
                  </h4>
                  <p className="font-montserrat font-medium text-[12px] text-[#262626] break-words leading-relaxed">
                    {language === 'id'
                      ? 'Klasifikasi multi-kategori berdasarkan skoring tertimbang dari 11 parameter lab. Setiap parameter berkontribusi pada 3 kategori penyakit sesuai relevansinya.'
                      : 'Multi-category classification based on weighted scoring of 11 lab parameters. Each parameter contributes to 3 disease categories according to its relevance.'}
                  </p>
                </div>
              </div>

              <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-[100px] h-[100px] bg-[#146178] rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
                  <svg
                    className="w-12 h-12 text-[#77F9D0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75"
                    />
                  </svg>
                </div>
                <div className="text-left leading-normal">
                  <h4 className="font-montserrat font-bold text-[16px] text-[#146178] mb-[6px]">
                    Preprocessing
                  </h4>
                  <p className="font-montserrat font-medium text-[12px] text-[#262626] break-words leading-relaxed">
                    {language === 'id'
                      ? 'Validasi rentang normal, deteksi nilai abnormal, normalisasi terhadap batas referensi, dan kalkulasi severity factor sebelum scoring.'
                      : 'Validation of normal ranges, detection of abnormal values, normalization against reference limits, and calculation of severity factors before scoring.'}
                  </p>
                </div>
              </div>

              <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-[100px] h-[100px] bg-[#146178] rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
                  <svg
                    className="w-12 h-12 text-[#77F9D0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div className="text-left leading-normal">
                  <h4 className="font-montserrat font-bold text-[16px] text-[#146178] mb-[6px]">
                    {language === 'id' ? 'Privasi Data' : 'Data Privacy'}
                  </h4>
                  <p className="font-montserrat font-medium text-[12px] text-[#262626] break-words leading-relaxed">
                    {language === 'id'
                      ? 'Setiap pengguna hanya dapat mengakses datanya sendiri. Row-Level Security memastikan data pasien tidak bocor antar akun.'
                      : 'Each user can only access their own data. Row-Level Security ensures patient data does not leak between accounts.'}
                  </p>
                </div>
              </div>

              <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-[100px] h-[100px] bg-[#146178] rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
                  <svg
                    className="w-12 h-12 text-[#77F9D0]"
                    fill="none"
                    viewBox="0 0 32 32"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 2.67 16 h 5.33 L 12 26.66 L 20 2.67 L 24 16 h 5.34" />
                  </svg>
                </div>
                <div className="text-left leading-normal">
                  <h4 className="font-montserrat font-bold text-[16px] text-[#146178] mb-[6px]">
                    {language === 'id' ? 'Output Lengkap' : 'Complete Output'}
                  </h4>
                  <p className="font-montserrat font-medium text-[12px] text-[#262626] break-words leading-relaxed">
                    {language === 'id'
                      ? 'Indikasi penyakit utama, probabilitas, tingkat risiko, status tiap parameter, ringkasan, rekomendasi, dan export PDF.'
                      : 'Indication of main disease, probability, risk level, status of each parameter, summary, recommendations, and PDF export.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
                {language === 'id' ? 'Parameter & Rentang Normal' : 'Parameters & Normal Ranges'}
              </h2>

              <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-[#D9F6FF] h-[61px] border-b border-[#AFAFAF]">
                        <th className="w-[40%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                          {language === 'id' ? 'Parameter' : 'Parameter'}
                        </th>
                        <th className="w-[35%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8">
                          {t.normalRange || 'Rentang Normal'}
                        </th>
                        <th className="w-[25%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-center">
                          {t.unit || 'Satuan'}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {parametersReference.map((param, pIdx) => (
                        <tr
                          key={pIdx}
                          className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                        >
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                            {getTranslatedParamName(param.name)}
                          </td>
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8">
                            {param.range}
                          </td>
                          <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-center">
                            {param.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="w-full bg-brand-primary p-8 rounded-[20px] text-left text-white shadow-xl shadow-brand-primary/10 select-none">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-montserrat font-bold text-[32px] text-[#77F9D0]">Disclaimer</h3>
                <div className="w-[38px] h-[38px] bg-[#F2C039] rounded-[5px] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-[#836512]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <p className="font-montserrat font-medium text-[16px] leading-[21.6px] text-[#F8FDFF] leading-relaxed w-full">
                {language === 'id'
                  ? 'Mirai merupakan alat bantu skrining awal berbasis kecerdasan buatan dan aturan medis (rule-based system) yang dirancang untuk membantu pengguna dalam memperoleh gambaran awal terkait kondisi kesehatan berdasarkan data dan gejala yang dimasukkan. Sistem ini dikembangkan sebagai media pendukung analisis awal dan edukasi kesehatan, bukan sebagai alat diagnosis utama maupun pengganti tenaga medis profesional.'
                  : 'Mirai is an early screening tool based on artificial intelligence and medical rules designed to help users obtain an initial overview of health conditions based on the data and symptoms entered. This system was developed as a support medium for initial analysis and health education, not as a primary diagnostic tool nor as a substitute for professional medical personnel.'}
              </p>
            </div>
          </div>
        ) : activeMenu === 'Check-Up' ? (
          <div className="w-full text-left animate-fade-in select-none">
            <div className="mb-10">
              <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
                {t.menuCheckUp}
              </h1>
              <p className="font-poppins font-normal text-[20px] text-[#262626]">
                {language === 'id'
                  ? 'Mohon lengkapi kuesioner medis di bawah ini untuk memulai skrining risiko penyakit.'
                  : 'Please complete the medical questionnaire below to start the disease risk screening.'}
              </p>

              <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
                <a
                  href="#dashboard"
                  className="hover:text-brand-primary/80"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = '#dashboard';
                  }}
                >
                  <svg
                    className="w-5 h-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
                <span>
                  <ChevronRight />
                </span>
                <span className="text-slate-500">{t.menuCheckUp}</span>
              </nav>
            </div>

            <div className="w-full min-h-[480px] bg-[#D9F6FF]/20 border border-brand-primary/10 rounded-[20px] shadow-lg flex flex-col items-center justify-center p-8 text-center backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EDFBFF]/40 to-[#77F9D0]/5 opacity-30 pointer-events-none" />

              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-brand-primary"
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
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-brand-primary mb-2">
                {language === 'id' ? 'Formulir Skrining Kesehatan' : 'Health Screening Form'}
              </h3>
              <p className="font-poppins text-slate-500 text-sm max-w-[450px] leading-relaxed">
                {language === 'id'
                  ? 'Silakan isi data hasil laboratorium medis Anda pada formulir interaktif di layar. Data Anda aman dan hanya digunakan untuk analisis probabilitas risiko kesehatan.'
                  : 'Please fill in your medical laboratory results on the interactive form on screen. Your data is secure and only used for health risk probability analysis.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 text-left select-none animate-fade-in">
              <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] leading-tight mb-2 tracking-tight">
                <span className="text-[#262626]">{t.profileGreeting}, </span>
                <span className="text-[#146178]">{username}</span>
              </h1>
              <p className="font-poppins font-normal sm:text-[20px] text-[16px] text-[#262626]">
                {t.profileSubtitle}
              </p>

              <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
                <a
                  href="#dashboard"
                  className="hover:text-brand-primary/80"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg
                    className="w-5 h-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
                <span>
                  <ChevronRight />
                </span>
                <span className="text-slate-500">{t.menuDashboard}</span>
              </nav>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
              <div className="col-span-1 xl:col-span-8 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
                    {t.trackCheckupTitle}
                  </h3>
                </div>

                <div className="w-full flex-1 min-h-[200px] flex items-center justify-center relative select-none">
                  <svg viewBox="0 0 524 218" className="w-full h-auto">
                    <defs>
                      <linearGradient id="dalamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#146178" stopOpacity="0.40" />
                        <stop offset="100%" stopColor="#146178" stopOpacity="0.00" />
                      </linearGradient>
                      <linearGradient id="jantungGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1F78B4" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#1F78B4" stopOpacity="0.00" />
                      </linearGradient>
                      <linearGradient id="paruGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#17ADB4" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#17ADB4" stopOpacity="0.00" />
                      </linearGradient>
                    </defs>

                    <line x1="42" y1="172" x2="512" y2="172" stroke="#E2E8F0" strokeWidth="1" />
                    <text
                      x="30"
                      y="176"
                      textAnchor="end"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      0
                    </text>

                    <line
                      x1="42"
                      y1="129"
                      x2="512"
                      y2="129"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text
                      x="30"
                      y="133"
                      textAnchor="end"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      25
                    </text>

                    <line
                      x1="42"
                      y1="86"
                      x2="512"
                      y2="86"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text
                      x="30"
                      y="90"
                      textAnchor="end"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      50
                    </text>

                    <line
                      x1="42"
                      y1="43"
                      x2="512"
                      y2="43"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text
                      x="30"
                      y="47"
                      textAnchor="end"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      75
                    </text>

                    <line x1="42" y1="10" x2="512" y2="10" stroke="#E2E8F0" strokeWidth="1" />
                    <text
                      x="30"
                      y="14"
                      textAnchor="end"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      100
                    </text>

                    <text
                      x="42"
                      y="197"
                      textAnchor="middle"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      Jan
                    </text>
                    <text
                      x="160"
                      y="197"
                      textAnchor="middle"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      Feb
                    </text>
                    <text
                      x="278"
                      y="197"
                      textAnchor="middle"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      Mar
                    </text>
                    <text
                      x="396"
                      y="197"
                      textAnchor="middle"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      Apr
                    </text>
                    <text
                      x="512"
                      y="197"
                      textAnchor="middle"
                      className="fill-[#A3A3A3] text-[10px] font-sans"
                    >
                      {language === 'id' ? 'Mei' : 'May'}
                    </text>

                    <path
                      d="M 42.5 172 L 42.5 148.76 C 82.5 148.76, 120.5 43.84, 160.5 43.84 C 200.5 43.84, 238.5 119.52, 278.5 119.52 C 318.5 119.52, 356.5 12.88, 396.5 12.88 C 436.5 12.88, 472.5 83.4, 512.5 83.4 L 512.5 172 Z"
                      fill="url(#dalamGrad)"
                    />

                    <path
                      d="M 42.5 172 L 42.5 54.16 C 82.5 54.16, 120.5 124.68, 160.5 124.68 C 200.5 124.68, 238.5 78.24, 278.5 78.24 C 318.5 78.24, 356.5 14.6, 396.5 14.6 C 436.5 14.6, 472.5 93.72, 512.5 93.72 L 512.5 172 Z"
                      fill="url(#jantungGrad)"
                    />

                    <path
                      d="M 42.5 172 L 42.5 78.24 C 82.5 78.24, 120.5 31.8, 160.5 31.8 C 200.5 31.8, 238.5 140.16, 278.5 140.16 C 318.5 140.16, 356.5 55.88, 396.5 55.88 C 436.5 55.88, 472.5 74.8, 512.5 74.8 L 512.5 172 Z"
                      fill="url(#paruGrad)"
                    />

                    <path
                      d="M 42.5 148.76 C 82.5 148.76, 120.5 43.84, 160.5 43.84 C 200.5 43.84, 238.5 119.52, 278.5 119.52 C 318.5 119.52, 356.5 12.88, 396.5 12.88 C 436.5 12.88, 472.5 83.4, 512.5 83.4"
                      fill="none"
                      stroke="#146178"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="42.5"
                      cy="148.76"
                      r="4.5"
                      fill="#146178"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="160.5"
                      cy="43.84"
                      r="4.5"
                      fill="#146178"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="278.5"
                      cy="119.52"
                      r="4.5"
                      fill="#146178"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="396.5"
                      cy="12.88"
                      r="4.5"
                      fill="#146178"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="512.5"
                      cy="83.4"
                      r="4.5"
                      fill="#146178"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M 42.5 54.16 C 82.5 54.16, 120.5 124.68, 160.5 124.68 C 200.5 124.68, 238.5 78.24, 278.5 78.24 C 318.5 78.24, 356.5 14.6, 396.5 14.6 C 436.5 14.6, 472.5 93.72, 512.5 93.72"
                      fill="none"
                      stroke="#1F78B4"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="42.5"
                      cy="54.16"
                      r="4.5"
                      fill="#1F78B4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="160.5"
                      cy="124.68"
                      r="4.5"
                      fill="#1F78B4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="278.5"
                      cy="78.24"
                      r="4.5"
                      fill="#1F78B4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="396.5"
                      cy="14.6"
                      r="4.5"
                      fill="#1F78B4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="512.5"
                      cy="93.72"
                      r="4.5"
                      fill="#1F78B4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M 42.5 78.24 C 82.5 78.24, 120.5 31.8, 160.5 31.8 C 200.5 31.8, 238.5 140.16, 278.5 140.16 C 318.5 140.16, 356.5 55.88, 396.5 55.88 C 436.5 55.88, 472.5 74.8, 512.5 74.8"
                      fill="none"
                      stroke="#17ADB4"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="42.5"
                      cy="78.24"
                      r="4.5"
                      fill="#17ADB4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="160.5"
                      cy="31.8"
                      r="4.5"
                      fill="#17ADB4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="278.5"
                      cy="140.16"
                      r="4.5"
                      fill="#17ADB4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="396.5"
                      cy="55.88"
                      r="4.5"
                      fill="#17ADB4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="512.5"
                      cy="74.8"
                      r="4.5"
                      fill="#17ADB4"
                      stroke="#F8FDFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4 pl-10">
                  <div className="flex items-center gap-2">
                    <span className="w-[13px] h-[13px] bg-brand-primary rounded-[1px] inline-block" />
                    <span className="text-[12px] font-montserrat font-normal text-[#262626]">
                      {translateCategory('Penyakit Dalam')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-[13px] h-[13px] bg-[#1F78B4] rounded-[1px] inline-block" />
                    <span className="text-[12px] font-montserrat font-normal text-[#262626]">
                      {translateCategory('Jantung')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-[13px] h-[13px] bg-[#17ADB4] rounded-[1px] inline-block" />
                    <span className="text-[12px] font-montserrat font-normal text-[#262626]">
                      {translateCategory('Paru-paru')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 xl:col-span-4 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
                    {t.historyTitle}
                  </h3>
                  <button
                    onClick={() => {
                      setActiveMenu('History');
                      setHistoryPage(1);
                      setSelectedHistoryItem(null);
                    }}
                    className="text-xs text-brand-primary font-montserrat font-bold hover:underline"
                  >
                    {t.viewAllBtn}
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto flex-1 pr-1 max-h-[350px]">
                  {historyList.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#D9F6FF] rounded-xl p-4 flex justify-between items-start hover:scale-[1.01] transition-transform duration-200"
                    >
                      <div className="space-y-1 text-left">
                        <button
                          onClick={() => handleDrillDownResult(item)}
                          className="text-left font-poppins font-semibold text-[16px] text-brand-primary hover:text-[#0f4859] cursor-pointer whitespace-nowrap"
                        >
                          {translateCategory(item.category)}
                        </button>
                        <div className="text-[12px] font-poppins font-normal text-[#262626]">
                          {formatCheckUpDate(item.date.split(',')[0])}
                        </div>
                        <div
                          className={`inline-block px-3 py-0.5 mt-2 rounded-full text-[11px] font-poppins font-medium ${item.riskColor}`}
                        >
                          {translateRisk(item.risk)}
                        </div>
                      </div>
                      <div className="font-arimo font-bold text-[24px] text-brand-primary">
                        {item.score}
                        <span className="font-poppins font-semibold">%</span>
                      </div>
                    </div>
                  ))}
                  {historyList.length === 0 && (
                    <p className="text-slate-500 text-sm font-poppins py-6">{t.noRecordsText}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-left">
              <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
                {t.abnormalParametersTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
                <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-poppins font-medium text-[24px] text-black">
                      {language === 'id' ? 'Lymfosit' : 'Lymphocyte'}
                    </h4>
                    <div className="w-[30px] h-[30px] bg-[#EB5050] rounded-md flex items-center justify-center text-white font-bold">
                      <svg
                        className="w-5 h-5 text-[#890909]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-right my-2">
                    <span className="font-poppins font-semibold text-[64px] text-[#146178] leading-none">
                      52%
                    </span>
                  </div>

                  <p className="font-poppins font-normal text-[16px] text-black leading-snug">
                    {t.lymphocyteDesc}
                  </p>
                </div>

                <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-poppins font-medium text-[24px] text-black">
                      {language === 'id' ? 'Creatinin' : 'Creatinine'}
                    </h4>
                    <div className="w-[30px] h-[30px] bg-[#F2C039] rounded-md flex items-center justify-center text-white font-bold">
                      <svg
                        className="w-5 h-5 text-[#836512]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-right my-2">
                    <span className="font-poppins font-semibold text-[64px] text-[#146178] leading-none">
                      0.4
                    </span>
                  </div>

                  <p className="font-poppins font-normal text-[16px] text-black leading-snug">
                    {t.creatinineDesc}
                  </p>
                </div>

                <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-poppins font-medium text-[24px] text-black">MCHC</h4>
                    <div className="w-[30px] h-[30px] bg-[#F2C039] rounded-md flex items-center justify-center text-white font-bold">
                      <svg
                        className="w-5 h-5 text-[#836512]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-right my-2">
                    <span className="font-poppins font-semibold text-[64px] text-[#146178] leading-none">
                      30
                    </span>
                  </div>

                  <p className="font-poppins font-normal text-[16px] text-black leading-snug">
                    {t.mchcDesc}
                  </p>
                </div>

                <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
                  <div className="flex justify-between items-start">
                    <h4 className="font-poppins font-medium text-[24px] text-black">
                      {language === 'id' ? 'Kolesterol' : 'Cholesterol'}
                    </h4>
                    <div className="w-[30px] h-[30px] bg-[#EB5050] rounded-md flex items-center justify-center text-white font-bold">
                      <svg
                        className="w-5 h-5 text-[#890909]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="text-right my-2">
                    <span className="font-poppins font-semibold text-[64px] text-[#146178] leading-none">
                      245
                    </span>
                  </div>

                  <p className="font-poppins font-normal text-[16px] text-black leading-snug">
                    {t.cholesterolDesc}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {isCheckUpOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8FDFF]/76 backdrop-blur-[8px] flex items-center justify-center animate-fade-in p-4 overflow-y-auto">
          <div
            className={`w-full max-w-[507px] bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] p-8 relative shadow-2xl transition-all duration-300 ${
              checkUpStep === 4 ? 'min-h-[424px]' : 'min-h-[503px]'
            }`}
          >
            <button
              onClick={handleCloseCheckUp}
              className="absolute top-4 right-4 w-[50px] h-[50px] bg-[#EB5050] text-[#530505] font-poppins font-medium text-[24px] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-md cursor-pointer z-50"
              aria-label="Close modal"
            >
              X
            </button>

            <div className="mt-4 flex flex-col h-full justify-between">
              <div className="space-y-[24px] mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-brand-primary text-left border-b border-brand-primary/10 pb-2">
                  {t.stepTitle.replace('{step}', checkUpStep)}
                </h2>

                {checkUpStep === 1 && (
                  <div className="space-y-[15px] text-left">
                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id' ? 'Kolesterol' : 'Cholesterol'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 180`}
                          value={cholesterol}
                          onChange={(e) => setCholesterol(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id' ? 'Kreatinin' : 'Creatinine'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 0.7`}
                          value={creatinine}
                          onChange={(e) => setCreatinine(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 90`}
                          value={fbs}
                          onChange={(e) => setFbs(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {checkUpStep === 2 && (
                  <div className="space-y-[15px] text-left">
                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id'
                          ? 'RBS (Gula Darah Sewaktu)'
                          : 'RBS (Random Blood Sugar)'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 90`}
                          value={rbs}
                          onChange={(e) => setRbs(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        Hgb (Hemoglobin)
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 10`}
                          value={hgb}
                          onChange={(e) => setHgb(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id' ? 'Lymfosit %' : 'Lymphocytes %'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 30`}
                          value={lymphocyte}
                          onChange={(e) => setLymphocyte(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {checkUpStep === 3 && (
                  <div className="space-y-[15px] text-left">
                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        MCH
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 30`}
                          value={mch}
                          onChange={(e) => setMch(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        MCHC
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 35`}
                          value={mchc}
                          onChange={(e) => setMchc(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        MCV
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 90`}
                          value={mcv}
                          onChange={(e) => setMcv(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {checkUpStep === 4 && (
                  <div className="space-y-[15px] text-left">
                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        {language === 'id' ? 'Ureum' : 'Urea'}
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 28`}
                          value={ureum}
                          onChange={(e) => setUreum(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                        WBC
                      </label>
                      <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                        <input
                          type="text"
                          placeholder={`${t.ex}: 9`}
                          value={wbc}
                          onChange={(e) => setWbc(e.target.value)}
                          className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[#5C7076] text-[14px] font-poppins font-normal leading-relaxed text-left">
                  {language === 'id'
                    ? 'Pastikan input yang diberikan adalah nilai sebenarnya dari hasil pemeriksaan medis Anda untuk mendapatkan hasil analisis yang akurat.'
                    : 'Make sure the input provided is the actual value of your medical check-up to get accurate analysis results.'}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {checkUpStep > 1 ? (
                  <button
                    onClick={handleBackStep}
                    className="w-[120px] h-[44px] bg-transparent border border-brand-primary text-brand-primary font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-brand-primary/5 active:scale-95 transition-all cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 transform rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {t.backBtn || 'Back'}
                  </button>
                ) : (
                  <div />
                )}

                {checkUpStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid()}
                    className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md shadow-brand-primary/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                  >
                    {t.nextBtn || 'Next'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishCheckUp}
                    disabled={!isStepValid()}
                    className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                  >
                    {t.finishBtn || 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-[#F8FDFF]/86 backdrop-blur-[6px] flex items-center justify-center animate-fade-in p-4">
          <div className="w-full max-w-[400px] bg-white border border-[#AFAFAF]/30 rounded-[20px] p-6 text-center shadow-2xl relative">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <h3 className="font-montserrat font-bold text-xl text-slate-800 mb-2">
              {t.deleteTitle}
            </h3>
            <p className="font-poppins text-slate-500 text-sm leading-relaxed mb-6">
              {t.deleteBody}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-poppins font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                {t.deleteCancel}
              </button>
              <button
                onClick={() => {
                  handleDeleteHistory(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-poppins font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-md shadow-rose-600/10"
              >
                {t.deleteConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
