import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppPage, UserRole } from '../types';

export const Header: React.FC = () => {
  const { page, setPage, role, setRole, showToast, isLoggedIn, userOrg, logoutUser } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getPageTitle = (p: AppPage) => {
    switch (p) {
      case 'home':
        return 'Home';
      case 'browse':
        return 'Browse Surplus';
      case 'details':
        return 'Batch Details';
      case 'donate':
        return 'Donate Food';
      case 'reviews':
        return 'Community Reviews & Trust';
      case 'activity':
        return 'Tamil Nadu Dispatches';
      case 'dashboard':
        return 'Donor Dashboard';
      case 'admin':
        return 'Platform & Firewall';
      case 'auth':
        return 'Account & Verification';
      default:
        return 'FoodShare';
    }
  };

  const navLinks: Array<{ label: string; page: AppPage; icon: string }> = [
    { label: 'Home', page: 'home', icon: 'home' },
    { label: 'Browse', page: 'browse', icon: 'search' },
    { label: 'Donate', page: 'donate', icon: 'volunteer_activism' },
    { label: 'Reviews', page: 'reviews', icon: 'rate_review' },
    { label: 'Activity', page: 'activity', icon: 'receipt_long' },
    { label: 'Dashboard', page: 'dashboard', icon: 'dashboard' },
    { label: 'Admin & Firewall', page: 'admin', icon: 'shield_person' }
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'donor') setPage('dashboard');
    else if (newRole === 'recipient') setPage('activity');
    else if (newRole === 'admin') setPage('admin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#f2fcf4]/95 backdrop-blur-xl border-b border-[#e1ebe3] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left Section: Logo, Title, and generous space before DONOR badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          {page === 'details' ? (
            <button
              onClick={() => setPage('browse')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#151d19] hover:bg-[#e6f0e8] transition-colors cursor-pointer"
              aria-label="Go back to browse"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <img
                alt="FoodShare Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpchK_2VlIkKkn_nHJm29vEOmhBlFY4iHqXamxmd6RoMKmopkvBs2Gd016mtFCc1enE-AT-xb8oJZYX5cUxGgzTavrTy0FFC3ODEsSx2ZSwy7UdpxHCSWteRYs5ejOzbt2PC8IR-TDGDvdBeF39Tt0KRdYTwdUt0mu7TVNABAcVUJJEGYrsq0GuNla_SNtLzxFIiSlXrsArsWPvjdBBpbJs7wLxIQ8voKXTduLHTJ_wBzGLYjGj9w"
              />
              <div className="flex flex-col">
                <span className="font-headline font-extrabold text-[18px] text-[#006b45] leading-none tracking-tight">
                  FoodShare
                </span>
                <span className="text-[10px] text-[#875100] font-semibold mt-0.5">
                  Tamil Nadu AnnaSeva
                </span>
              </div>
            </button>

            {/* Generous space before role chip as explicitly requested ("home is on donar leave lil space") */}
            <div className="ml-3 sm:ml-4 pl-2 border-l border-[#bec9c0]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e7e2d8] text-[#1d1b16] font-bold text-[10px] uppercase tracking-wider inline-block">
                {role === 'donor' ? 'DONOR' : role === 'recipient' ? 'RECIPIENT' : 'ADMIN'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => {
            const isActive = page === link.page;
            return (
              <button
                key={link.page}
                onClick={() => setPage(link.page)}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#006b45] text-white shadow-xs'
                    : 'text-[#3e4942] hover:text-[#151d19] hover:bg-[#e6f0e8]'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section Actions & Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-3 relative">
          {/* Firewall WAF Badge Indicator */}
          <button
            onClick={() => {
              setPage('admin');
              showToast('Firewall WAF status: ACTIVE. 0 active intrusions.', 'security', 'success');
            }}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecf6ee] text-[#006b45] text-[11px] font-bold border border-[#97f6c2] hover:bg-[#e6f0e8] cursor-pointer"
            title="Firewall & WAF Protection Active"
          >
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>Firewall Active</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#006b45] animate-pulse"></span>
          </button>

          {/* Perspective selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#e6f0e8] hover:bg-[#dbe5dd] text-[#006b45] text-[12px] font-semibold transition-all active:scale-95 cursor-pointer"
              title="Switch user perspective"
            >
              <span className="material-symbols-outlined text-[16px]">
                {role === 'donor'
                  ? 'storefront'
                  : role === 'recipient'
                  ? 'volunteer_activism'
                  : 'shield_person'}
              </span>
              <span className="hidden sm:inline">
                {role === 'donor' ? 'Donor Mode' : role === 'recipient' ? 'NGO Mode' : 'Super Admin'}
              </span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 top-11 w-60 bg-white rounded-2xl shadow-xl border border-[#e1ebe3] p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#615e57] uppercase tracking-wider">
                  Switch Active Perspective
                </div>
                <button
                  onClick={() => handleRoleSelect('donor')}
                  className={`w-full p-2.5 rounded-xl text-left text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer ${
                    role === 'donor' ? 'bg-[#f2fcf4] text-[#006b45] font-semibold' : 'text-[#151d19] hover:bg-[#ecf6ee]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006b45]">storefront</span>
                  <div>
                    <p className="leading-tight font-bold">Kalyana Mandapam (Donor)</p>
                    <p className="text-[11px] text-[#615e57]">List wedding feast surplus</p>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('recipient')}
                  className={`w-full p-2.5 rounded-xl text-left text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer ${
                    role === 'recipient' ? 'bg-[#f2fcf4] text-[#006b45] font-semibold' : 'text-[#151d19] hover:bg-[#ecf6ee]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#a96700]">volunteer_activism</span>
                  <div>
                    <p className="leading-tight font-bold">Agara Foundation (NGO)</p>
                    <p className="text-[11px] text-[#615e57]">Tamil Nadu dispatch network</p>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full p-2.5 rounded-xl text-left text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer ${
                    role === 'admin' ? 'bg-[#f2fcf4] text-[#006b45] font-semibold' : 'text-[#151d19] hover:bg-[#ecf6ee]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">shield_person</span>
                  <div>
                    <p className="leading-tight font-bold">Super Admin & Firewall</p>
                    <p className="text-[11px] text-[#615e57]">FSSAI safety & WAF rules</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Account / Login State */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#006b45]/30 transition-all cursor-pointer"
                title={`${userOrg} (Logged in)`}
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-[#97f6c2]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsn5mglERQj9o7jV0eqohAnGMn6JaDqmhG-cppHoUlbVvDfGnWNK2IjwYDWZwXgO5lpskeAXfI4lNF4sIxspf3rMiyihioCi3kdWLSRD82hFmwBs10DJYpwSJH3m6oKwdXku9-qOVcEPHX6cG-H2iiFcpu91Xg8T_KWD5MnhC2wt41bxEkw_3_hEeFWBrjn6MBE4Bh6gqCsy2Qdfia9mKjRazWmmo0hBmTiIEe6uY3Z9qWkjYqVc"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[#e1ebe3] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-[#e1ebe3]">
                    <p className="font-bold text-[13px] text-[#151d19] truncate">{userOrg}</p>
                    <p className="text-[11px] text-[#006b45] font-semibold">Active Tamil Nadu Member</p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setPage('donate');
                    }}
                    className="w-full text-left p-2 rounded-xl text-[13px] font-medium text-[#151d19] hover:bg-[#ecf6ee] flex items-center gap-2 mt-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#006b45]">
                      add_circle
                    </span>
                    <span>Post Food Donation</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setPage('dashboard');
                    }}
                    className="w-full text-left p-2 rounded-xl text-[13px] font-medium text-[#151d19] hover:bg-[#ecf6ee] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#006b45]">
                      dashboard
                    </span>
                    <span>My Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      logoutUser();
                    }}
                    className="w-full text-left p-2 rounded-xl text-[13px] font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2 cursor-pointer mt-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setPage('auth')}
              className="btn-3d btn-3d-primary h-9 px-3.5 text-[12px] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
