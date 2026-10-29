import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const iconName = toast.icon || (toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'check_circle');

  const bgColor =
    toast.type === 'error'
      ? 'bg-[#ba1a1a] text-white'
      : toast.type === 'warning'
      ? 'bg-[#875100] text-white'
      : 'bg-[#151d19] text-[#e9f3eb]';

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] max-w-[90vw] sm:max-w-md animate-in slide-in-from-top-4 fade-in duration-200">
      <div
        className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md ${bgColor}`}
      >
        <span className="material-symbols-outlined text-[22px] shrink-0 text-[#7bd9a7]">
          {iconName}
        </span>
        <span className="text-[14px] font-medium leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
