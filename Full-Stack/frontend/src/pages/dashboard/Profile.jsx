import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Profile() {
  const { language } = useLanguage();
  const context = useOutletContext();
  
  // Use context variables if available, otherwise read from localStorage or defaults
  const username = context?.username || localStorage.getItem('userName') || 'Jati Sri Pamungkas';
  const email = context?.email || localStorage.getItem('userEmail') || 'jatispamungkas357@gmail.com';
  const setUsernameState = context?.setUsername;
  const setEmailState = context?.setEmail;
  const avatar = context?.avatar;
  const setAvatarState = context?.setAvatar;

  // Local state for personal information
  const [fullnameVal, setFullnameVal] = useState(username);
  const [emailVal, setEmailVal] = useState(email);
  const [ageVal, setAgeVal] = useState(() => localStorage.getItem('userAge') || '20');
  const [genderVal, setGenderVal] = useState(() => localStorage.getItem('userGender') || 'Perempuan');

  // Local state for security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Success / error alerts
  const [infoSuccess, setInfoSuccess] = useState('');
  const [infoError, setInfoError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

  // Translations object
  const txt = language === 'id' ? {
    title: 'Profil',
    subtitle: 'Kelola informasi pribadi, foto profil, dan keamanan akun Anda.',
    personalInfo: 'Informasi Pribadi',
    fullName: 'Nama Lengkap',
    email: 'Email',
    age: 'Umur',
    gender: 'Jenis Kelamin',
    saveChanges: 'Simpan Perubahan',
    accountSecurity: 'Keamanan Akun',
    currentPassword: 'Password Sekarang',
    newPassword: 'Password Baru',
    confirmNewPassword: 'Konfirmasi Password Baru',
    changePassword: 'Ubah Password',
    uploadPhoto: 'Ubah Foto Profil',
    successSave: 'Perubahan berhasil disimpan!',
    successPassword: 'Password berhasil diperbarui!',
    errorPasswordMatch: 'Konfirmasi password tidak cocok.',
    errorAllRequired: 'Semua kolom wajib diisi.',
    male: 'Laki-laki',
    female: 'Perempuan'
  } : {
    title: 'Profile',
    subtitle: 'Manage your personal information, profile photo, and account security.',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    email: 'Email',
    age: 'Age',
    gender: 'Gender',
    saveChanges: 'Save Changes',
    accountSecurity: 'Account Security',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    changePassword: 'Change Password',
    uploadPhoto: 'Change Profile Photo',
    successSave: 'Changes successfully saved!',
    successPassword: 'Password successfully updated!',
    errorPasswordMatch: 'New password and confirmation do not match.',
    errorAllRequired: 'All fields are required.',
    male: 'Male',
    female: 'Female'
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setInfoSuccess('');
    setInfoError('');

    if (!fullnameVal || !emailVal || !ageVal || !genderVal) {
      setInfoError(txt.errorAllRequired);
      return;
    }

    // Save to localStorage
    localStorage.setItem('userName', fullnameVal);
    localStorage.setItem('userEmail', emailVal);
    localStorage.setItem('userAge', ageVal);
    localStorage.setItem('userGender', genderVal);

    // Update parent states to sync sidebar
    if (setUsernameState) setUsernameState(fullnameVal);
    if (setEmailState) setEmailState(emailVal);

    setInfoSuccess(txt.successSave);
    setTimeout(() => setInfoSuccess(''), 3000);
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    setSecuritySuccess('');
    setSecurityError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityError(txt.errorAllRequired);
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError(txt.errorPasswordMatch);
      return;
    }

    // Simulate password change success
    setSecuritySuccess(txt.successPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecuritySuccess(''), 3000);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        localStorage.setItem('userAvatar', base64Data);
        if (setAvatarState) {
          setAvatarState(base64Data);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 animate-fade-in text-[#262626]">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h1 className="font-montserrat font-bold text-3xl md:text-[32px] text-brand-primary tracking-tight mb-2">
          {txt.title}
        </h1>
        <p className="font-sans text-[14px] text-slate-500">
          {txt.subtitle}
        </p>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8 text-[13px] text-slate-500">
        <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>&gt;</span>
        <span className="font-medium text-brand-primary">{txt.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar Card */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[20px] shadow-xl shadow-brand-primary/5 border border-brand-primary/5 flex flex-col items-center justify-center text-center">
          <div className="relative">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#EDFBFF] shadow-lg shadow-brand-primary/10"
            />
          </div>
          <h2 className="font-montserrat font-bold text-[22px] text-brand-primary mt-5 leading-tight truncate w-full max-w-[220px]">
            {username}
          </h2>
          <p className="font-sans text-[13px] text-slate-500 mt-1 truncate w-full max-w-[220px]">
            {email}
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload-file"
            onChange={handleAvatarUpload}
          />
          <label
            htmlFor="avatar-upload-file"
            className="mt-6 px-5 py-2.5 bg-brand-primary text-white font-sans font-semibold text-sm rounded-lg hover:bg-[#0f4859] active:scale-95 transition-all shadow-md hover:shadow-lg hover:shadow-brand-primary/15 cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {txt.uploadPhoto}
          </label>
        </div>

        {/* Right Column: Info & Security Forms */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Card 1: Personal Information */}
          <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-xl shadow-brand-primary/5 border border-brand-primary/5">
            <h2 className="font-montserrat font-bold text-lg text-brand-primary mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {txt.personalInfo}
            </h2>

            {infoError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg text-xs font-sans flex items-center gap-2">
                <span>{infoError}</span>
              </div>
            )}

            {infoSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-sans flex items-center gap-2 animate-pulse">
                <span>{infoSuccess}</span>
              </div>
            )}

            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="relative">
                  <label
                    htmlFor="profile-fullname"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.fullName}
                  </label>
                  <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center">
                    <input
                      type="text"
                      id="profile-fullname"
                      value={fullnameVal}
                      onChange={(e) => setFullnameVal(e.target.value)}
                      className="w-full bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="profile-email"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.email}
                  </label>
                  <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center">
                    <input
                      type="email"
                      id="profile-email"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      className="w-full bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Age */}
                <div className="relative">
                  <label
                    htmlFor="profile-age"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.age}
                  </label>
                  <div className="w-full h-[38px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center">
                    <input
                      type="number"
                      id="profile-age"
                      value={ageVal}
                      onChange={(e) => setAgeVal(e.target.value)}
                      className="w-full bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                      required
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="relative">
                  <label
                    htmlFor="profile-gender"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.gender}
                  </label>
                  <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center pr-10">
                    <select
                      id="profile-gender"
                      value={genderVal}
                      onChange={(e) => setGenderVal(e.target.value)}
                      className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none cursor-pointer appearance-none"
                      required
                    >
                      <option value="Laki-laki">{txt.male}</option>
                      <option value="Perempuan">{txt.female}</option>
                    </select>
                    <div className="absolute right-3.5 pointer-events-none text-[#146178]/60">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-primary text-white font-sans font-semibold text-sm rounded-lg hover:bg-[#0f4859] active:scale-95 transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center cursor-pointer"
                >
                  {txt.saveChanges}
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Account Security */}
          <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-xl shadow-brand-primary/5 border border-brand-primary/5">
            <h2 className="font-montserrat font-bold text-lg text-brand-primary mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {txt.accountSecurity}
            </h2>

            {securityError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg text-xs font-sans flex items-center gap-2">
                <span>{securityError}</span>
              </div>
            )}

            {securitySuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-sans flex items-center gap-2 animate-pulse">
                <span>{securitySuccess}</span>
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="space-y-5">
              {/* Current Password */}
              <div className="relative">
                <label
                  htmlFor="profile-current-pass"
                  className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                >
                  {txt.currentPassword}
                </label>
                <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center pr-10">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    id="profile-current-pass"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                  >
                    {showCurrentPass ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" x2="22" y1="2" y2="22"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* New Password */}
                <div className="relative">
                  <label
                    htmlFor="profile-new-pass"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.newPassword}
                  </label>
                  <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center pr-10">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      id="profile-new-pass"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                    >
                      {showNewPass ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                          <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                          <line x1="2" x2="22" y1="2" y2="22"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <label
                    htmlFor="profile-confirm-pass"
                    className="block text-brand-primary text-[13px] font-sans font-semibold mb-1.5"
                  >
                    {txt.confirmNewPassword}
                  </label>
                  <div className="relative w-full h-[38px] bg-[#EDFBFF] border border-[#8C8C8C]/30 rounded-[5px] flex items-center pr-10">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      id="profile-confirm-pass"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-full px-[14px] bg-transparent text-[#146178] font-sans text-[13px] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3.5 text-[#146178]/60 hover:text-[#146178] focus:outline-none flex items-center justify-center"
                    >
                      {showConfirmPass ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                          <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                          <line x1="2" x2="22" y1="2" y2="22"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-primary text-white font-sans font-semibold text-sm rounded-lg hover:bg-[#0f4859] active:scale-95 transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center cursor-pointer"
                >
                  {txt.changePassword}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
