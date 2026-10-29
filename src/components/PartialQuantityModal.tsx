import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PartialQuantityModal: React.FC = () => {
  const { activeModal, setActiveModal, selectedListing, claimListing } = useApp();
  const maxAvailable = selectedListing ? selectedListing.quantity : 28;
  const [quantity, setQuantity] = useState(Math.min(10, maxAvailable));

  if (activeModal !== 'partial_claim' || !selectedListing) return null;

  const handleAdjust = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(maxAvailable, prev + delta)));
  };

  const handleConfirm = () => {
    claimListing(selectedListing.id, quantity);
    setActiveModal('none');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#29322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-6 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between border-b border-[#e6f0e8] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b45] text-[24px]">inventory_2</span>
            <h4 className="font-headline text-[20px] font-bold text-[#151d19]">Select Rescue Quantity</h4>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-9 h-9 rounded-full bg-[#ecf6ee] flex items-center justify-center text-[#3e4942] hover:bg-[#e6f0e8] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-[14px] text-[#3e4942]">
            How many boxed meals can your organization safely transport and distribute right now?
          </p>
          <p className="text-[12px] font-semibold text-[#006b45]">
            Max available: {maxAvailable} portions
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 py-4 bg-[#f2fcf4] rounded-2xl border border-[#e1ebe3]">
          <button
            onClick={() => handleAdjust(-1)}
            disabled={quantity <= 1}
            className="w-12 h-12 rounded-full bg-white border border-[#bec9c0] text-[#151d19] text-[24px] font-bold shadow-sm flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            −
          </button>
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="font-headline text-[38px] font-extrabold text-[#006b45] leading-none">
              {quantity}
            </span>
            <span className="text-[12px] font-medium text-[#615e57] mt-1">Meals</span>
          </div>
          <button
            onClick={() => handleAdjust(1)}
            disabled={quantity >= maxAvailable}
            className="w-12 h-12 rounded-full bg-white border border-[#bec9c0] text-[#151d19] text-[24px] font-bold shadow-sm flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        <div className="flex items-center justify-between text-[13px] px-2 text-[#615e57]">
          <span>Approx. weight: {(quantity * 0.45).toFixed(1)} kg</span>
          <span>Feeds approx. {quantity} people</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-xl bg-[#006b45] hover:bg-[#21865b] text-white font-semibold text-[15px] shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Confirm Request for {quantity} Meals</span>
        </button>
      </div>
    </div>
  );
};
