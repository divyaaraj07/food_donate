import React from 'react';
import { useApp } from '../context/AppContext';

export const CallModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useApp();

  if (activeModal !== 'call_kitchen') return null;

  const handleSimulateCall = (target: string, phone: string) => {
    setActiveModal('none');
    showToast(`Dialing ${target} at ${phone}...`, 'call', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#29322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between border-b border-[#e6f0e8] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b45] text-[24px]">call</span>
            <h4 className="font-headline text-[18px] font-bold text-[#151d19]">
              Direct Kitchen & Mandapam Dispatch
            </h4>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#ecf6ee] flex items-center justify-center text-[#3e4942]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-[#f2fcf4] rounded-xl border border-[#e1ebe3]">
          <div className="w-12 h-12 rounded-full bg-[#e6f0e8] flex items-center justify-center text-[#006b45]">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <div>
            <h5 className="font-semibold text-[#151d19] text-[15px]">
              Sri Meenakshi Kalyana Mandapam (Madurai)
            </h5>
            <p className="text-[12px] text-[#615e57]">Dispatch Helpline: +91 94432 18920</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => handleSimulateCall('Sundaram Chettiar (Head Caterer)', '+91 94432 18920')}
            className="w-full py-3 px-4 rounded-xl bg-[#006b45] text-white font-medium text-[14px] flex items-center justify-between hover:bg-[#21865b] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>Call Sundaram Chettiar (Head Caterer)</span>
            </span>
            <span className="text-[12px] opacity-80">+91 94432...</span>
          </button>

          <button
            onClick={() => handleSimulateCall('Kitchen Gate #2 Dispatch Bell', '+91 94432 18920 Ext. 2')}
            className="w-full py-3 px-4 rounded-xl bg-[#ecf6ee] text-[#151d19] font-medium text-[14px] flex items-center justify-between hover:bg-[#e6f0e8] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#006b45]">doorbell</span>
              <span>Kitchen Loading Gate #2 Intercom</span>
            </span>
            <span className="text-[12px] text-[#615e57]">Gate #2</span>
          </button>
        </div>

        <p className="text-[11px] text-center text-[#615e57]">
          Verified emergency contact line for real-time Tamil Nadu food logistics coordination.
        </p>
      </div>
    </div>
  );
};
