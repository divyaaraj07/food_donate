import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const {
    loginUser,
    authNotice,
    postLoginRedirect
  } = useApp();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [orgName, setOrgName] = useState('Sri Meenakshi Mahal Kalyana Mandapam');
  const [contactName, setContactName] = useState('Sundaram Chettiar');
  const [email, setEmail] = useState('sundaram@meenakshimahal.tn');
  const [phone, setPhone] = useState('+91 94432 18920');
  const [city, setCity] = useState('Madurai, Tamil Nadu');
  const [fssai, setFssai] = useState('FSSAI #12419008000412');
  const [password, setPassword] = useState('AnnaDaan2026#');
  const [confirmPassword, setConfirmPassword] = useState('AnnaDaan2026#');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const tamilNaduDistricts = [
    'Madurai, Tamil Nadu',
    'Chennai (T. Nagar), Tamil Nadu',
    'Chennai (Anna Nagar), Tamil Nadu',
    'Chennai (Mylapore), Tamil Nadu',
    'Coimbatore (RS Puram), Tamil Nadu',
    'Tiruchirappalli (Srirangam), Tamil Nadu',
    'Salem, Tamil Nadu',
    'Tirunelveli, Tamil Nadu'
  ];

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, orgName, selectedRole, city);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, orgName || 'Tamil Nadu Food Donor', selectedRole, city);
  };

  const handleQuickDemo = (demoType: 'donor' | 'ngo') => {
    if (demoType === 'donor') {
      loginUser(
        'sundaram@meenakshimahal.tn',
        'Sri Meenakshi Kalyana Mandapam',
        'donor',
        'Madurai, Tamil Nadu'
      );
    } else {
      loginUser(
        'director@agarafoundation.org',
        'Agara Foundation Chennai Shelter',
        'recipient',
        'Chennai, Tamil Nadu'
      );
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-12 animate-in fade-in duration-200">
      {/* Protected Route Gate Notice if attempting to donate */}
      {postLoginRedirect === 'donate' && (
        <div className="mb-4 bg-[#ffdcbb] border border-[#a96700] rounded-2xl p-4 shadow-sm flex items-start gap-3">
          <span className="material-symbols-outlined text-[#875100] text-[22px] shrink-0 mt-0.5">
            lock
          </span>
          <div className="flex-1">
            <h4 className="font-headline font-bold text-[14px] text-[#2b1700]">
              Donor Verification Required
            </h4>
            <p className="text-[12px] text-[#653e00] mt-0.5 leading-relaxed">
              {authNotice ||
                'To maintain FSSAI food hygiene and safety standards, only authenticated donors can publish surplus food listings. Please sign in or register below.'}
            </p>
          </div>
        </div>
      )}

      {/* Community Impact Header Card with Tamil Nadu context */}
      <section className="bg-[#ecf6ee] rounded-2xl p-4 shadow-xs border border-[#e1ebe3] mb-4 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 rounded-2xl overflow-hidden shrink-0 shadow-xs bg-[#e6f0e8] border border-[#bec9c0]">
            <img
              src="https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=400&q=80"
              alt="Community volunteer handing food"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#006b45] animate-pulse"></span>
              <span className="text-[11px] text-[#006b45] font-bold uppercase tracking-wide">
                18,420 kg Rescued Across Tamil Nadu
              </span>
            </div>
            <h2 className="font-headline text-[18px] sm:text-[20px] font-bold text-[#151d19] truncate">
              Vanakkam! Join AnnaSeva Table
            </h2>
          </div>
        </div>
      </section>

      {/* Quick Demo Test Buttons */}
      <div className="mb-4 bg-white p-3.5 rounded-2xl border border-[#e1ebe3] flex flex-col gap-2 shadow-xs">
        <span className="text-[11px] font-bold text-[#615e57] uppercase tracking-wider">
          Instant 1-Click Demo Login
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleQuickDemo('donor')}
            className="btn-3d btn-3d-secondary h-11 text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006b45]">storefront</span>
            <span>Madurai Donor Demo</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('ngo')}
            className="btn-3d btn-3d-white h-11 text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#875100]">volunteer_activism</span>
            <span>Chennai NGO Demo</span>
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e1ebe3]">
        {/* Top Segmented Switcher */}
        <div className="bg-[#ecf6ee] p-1 rounded-2xl flex items-center mb-6 border border-[#e1ebe3]">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === 'signin'
                ? 'bg-white text-[#006b45] shadow-xs'
                : 'text-[#3e4942] hover:text-[#151d19]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2.5 text-center rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-white text-[#006b45] shadow-xs'
                : 'text-[#3e4942] hover:text-[#151d19]'
            }`}
          >
            Register New User
          </button>
        </div>

        {/* Sign In Panel */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#151d19] uppercase tracking-wider">
                  Registered Email or Mobile
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. sundaram@meenakshimahal.tn or +91 94432..."
                  className="w-full h-12 px-4 rounded-xl bg-[#ecf6ee] text-[#151d19] text-[14px] outline-none border border-[#e1ebe3] focus:border-[#006b45]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#151d19] uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 px-4 rounded-xl bg-[#ecf6ee] text-[#151d19] text-[14px] outline-none border border-[#e1ebe3] focus:border-[#006b45]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-3d btn-3d-primary w-full h-12 mt-3 font-bold text-[14px] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In & Continue to FoodShare</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        ) : (
          /* Sign Up Form for New Users */
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {/* Role Selection */}
            <div>
              <label className="block text-[12px] font-bold text-[#615e57] uppercase tracking-wider mb-2">
                Select Your Community Role
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {/* Food Donor */}
                <label
                  onClick={() => setSelectedRole('donor')}
                  className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    selectedRole === 'donor'
                      ? 'bg-[#ecf6ee] border-[#006b45] shadow-xs'
                      : 'bg-white border-[#e1ebe3] hover:bg-[#f2fcf4]'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'donor'}
                    onChange={() => setSelectedRole('donor')}
                    className="mt-1 accent-[#006b45] w-4 h-4 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="material-symbols-outlined text-[#006b45] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        storefront
                      </span>
                      <span className="font-headline font-bold text-[15px] text-[#151d19]">
                        Food Donor
                      </span>
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-[#97f6c2] text-[#002112] text-[10px] font-bold">
                        Donor
                      </span>
                    </div>
                    <p className="text-[12px] text-[#615e57] truncate">
                      Kalyana Mandapam, Restaurant, Caterer, Sweet Stall
                    </p>
                    <p className="text-[11px] text-[#006b45] font-semibold mt-1">
                      "I want to donate surplus feast & kitchen food"
                    </p>
                  </div>
                </label>

                {/* NGO / Recipient */}
                <label
                  onClick={() => setSelectedRole('recipient')}
                  className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    selectedRole === 'recipient'
                      ? 'bg-[#ecf6ee] border-[#006b45] shadow-xs'
                      : 'bg-white border-[#e1ebe3] hover:bg-[#f2fcf4]'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'recipient'}
                    onChange={() => setSelectedRole('recipient')}
                    className="mt-1 accent-[#006b45] w-4 h-4 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="material-symbols-outlined text-[#875100] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        volunteer_activism
                      </span>
                      <span className="font-headline font-bold text-[15px] text-[#151d19]">
                        NGO / Charity / Orphanage
                      </span>
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[10px] font-bold">
                        Community
                      </span>
                    </div>
                    <p className="text-[12px] text-[#615e57] truncate">
                      Food Bank, Shelter, Ashram, Trust, Community Kitchen
                    </p>
                    <p className="text-[11px] text-[#875100] font-semibold mt-1">
                      "I want to request and distribute food to those in need"
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Registration Fields */}
            <div className="flex flex-col gap-2.5">
              {/* Organization Name */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <input
                  type="text"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  placeholder=" "
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none"
                />
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  Organization / Mandapam Name
                </span>
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-[#615e57] text-[18px]">
                  business
                </span>
              </div>

              {/* City / District */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  aria-label="City or Tamil Nadu District"
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none appearance-none cursor-pointer"
                >
                  {tamilNaduDistricts.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  Tamil Nadu District / Town
                </span>
                <span className="material-symbols-outlined absolute right-3.5 top-3 pointer-events-none text-[#615e57] text-[18px]">
                  location_city
                </span>
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder=" "
                    className="w-full h-12 px-3 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none"
                  />
                  <span className="absolute left-3 top-1 text-[9px] font-bold text-[#615e57] uppercase tracking-wider">
                    Contact Person
                  </span>
                </div>
                <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder=" "
                    className="w-full h-12 px-3 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none"
                  />
                  <span className="absolute left-3 top-1 text-[9px] font-bold text-[#615e57] uppercase tracking-wider">
                    Mobile (+91)
                  </span>
                </div>
              </div>

              {/* FSSAI or Trust Registration */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <input
                  type="text"
                  value={fssai}
                  onChange={e => setFssai(e.target.value)}
                  placeholder=" "
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none"
                />
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  FSSAI License or Trust Reg #
                </span>
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-[#006b45] text-[18px]">
                  verified
                </span>
              </div>

              {/* Email Address */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none pr-10"
                />
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  Email Address
                </span>
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-[#006b45] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>

              {/* Password */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder=" "
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none pr-10"
                />
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  Password
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#615e57] hover:text-[#151d19]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative bg-[#ecf6ee] rounded-xl border border-[#e1ebe3] focus-within:border-[#006b45]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  className="w-full h-12 px-3.5 pt-4 pb-1 bg-transparent text-[#151d19] text-[13px] outline-none pr-10"
                />
                <span className="absolute left-3.5 top-1 text-[10px] font-bold text-[#615e57] uppercase tracking-wider">
                  Confirm Password
                </span>
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-[#006b45] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
            </div>

            {/* Food Safety & Good Samaritan Disclaimer */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#006b45] accent-[#006b45] shrink-0"
              />
              <span className="text-[12px] text-[#615e57] leading-relaxed">
                I agree to the <span className="text-[#006b45] font-bold">AnnaSeva Terms of Service</span> and comply with FSSAI Surplus Food Regulations 2019 and the Good Samaritan food safety norms.
              </span>
            </label>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="btn-3d btn-3d-primary w-full h-12 mt-2 font-bold text-[14px] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Account & Continue</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}
      </div>

      {/* Trust & Transparency Footer Pill */}
      <footer className="mt-4 flex items-center justify-center gap-1.5 text-[#615e57] text-[12px]">
        <span className="material-symbols-outlined text-[16px] text-[#006b45]" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified
        </span>
        <span>FSSAI Compliant • Anna Daan Good Samaritan Safe Donation Network</span>
      </footer>
    </div>
  );
};
