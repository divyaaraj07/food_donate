import React from 'react';
import { useApp } from '../context/AppContext';
import { AppPage } from '../types';

export const BottomNav: React.FC = () => {
  const { page, setPage } = useApp();

  const navItems: Array<{ id: AppPage; label: string; icon: string }> = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'browse', label: 'Browse', icon: 'search' },
    { id: 'donate', label: 'Donate', icon: 'add' },
    { id: 'reviews', label: 'Reviews', icon: 'rate_review' },
    { id: 'activity', label: 'Activity', icon: 'receipt_long' },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#f2fcf4]/95 backdrop-blur-xl border-t border-[#e1ebe3] shadow-[0_-2px_12px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex justify-between items-center h-16 px-1 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = page === item.id;
          if (item.id === 'donate') {
            return (
              <div
                key={item.id}
                className="flex-1 flex flex-col items-center justify-center h-full relative -top-3.5"
              >
                <button
                  onClick={() => setPage('donate')}
                  aria-label="List new food donation"
                  className="btn-3d-fab w-13 h-13 min-w-[50px] min-h-[50px] flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[30px]">add</span>
                </button>
                <span className="text-[10px] text-[#006b45] font-extrabold mt-1">Donate</span>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
                isActive ? 'text-[#006b45] font-semibold' : 'text-[#3e4942] hover:text-[#151d19]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'scale-110 text-[#006b45]' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
