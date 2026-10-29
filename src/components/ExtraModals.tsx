import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CustomAlertModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useApp();
  const [categories, setCategories] = useState<string[]>(['Bakery & Bread', 'Fresh Produce']);
  const [radius, setRadius] = useState('3.0');
  const [channels, setChannels] = useState({ push: true, email: true, sms: false });

  if (activeModal !== 'custom_alert') return null;

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSave = () => {
    setActiveModal('none');
    showToast(`Custom food alert saved for ${categories.length} categories within ${radius} miles!`, 'notifications_active', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#29322d]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between border-b border-[#e6f0e8] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b45] text-[24px]">notifications_active</span>
            <h4 className="font-headline text-[18px] font-bold text-[#151d19]">Create Food Alert</h4>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#ecf6ee] flex items-center justify-center text-[#3e4942]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-[#3e4942]">
          Receive high-priority notifications as soon as surplus food matching your needs becomes available nearby.
        </p>

        {/* Categories */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-[#151d19] uppercase tracking-wider">
            Notify Me For
          </label>
          <div className="flex flex-wrap gap-2">
            {['Bakery & Bread', 'Fresh Produce', 'Cooked Meals', 'Dairy', 'Canned/Pantry'].map(cat => {
              const active = categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    active
                      ? 'bg-[#006b45] text-white shadow-xs'
                      : 'bg-[#ecf6ee] text-[#3e4942] hover:bg-[#e6f0e8]'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Radius */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-[#151d19] uppercase tracking-wider">Rescue Radius</span>
            <span className="font-bold text-[#006b45]">{radius} miles</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            className="w-full accent-[#006b45] cursor-pointer"
          />
        </div>

        {/* Channels */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[12px] font-semibold text-[#151d19] uppercase tracking-wider">
            Dispatch Channels
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setChannels({ ...channels, push: !channels.push })}
              className={`p-2 rounded-xl text-center text-[12px] font-medium border ${
                channels.push ? 'border-[#006b45] bg-[#f2fcf4] text-[#006b45]' : 'border-[#bec9c0] text-[#615e57]'
              }`}
            >
              Push Notification
            </button>
            <button
              onClick={() => setChannels({ ...channels, email: !channels.email })}
              className={`p-2 rounded-xl text-center text-[12px] font-medium border ${
                channels.email ? 'border-[#006b45] bg-[#f2fcf4] text-[#006b45]' : 'border-[#bec9c0] text-[#615e57]'
              }`}
            >
              Email Alerts
            </button>
            <button
              onClick={() => setChannels({ ...channels, sms: !channels.sms })}
              className={`p-2 rounded-xl text-center text-[12px] font-medium border ${
                channels.sms ? 'border-[#006b45] bg-[#f2fcf4] text-[#006b45]' : 'border-[#bec9c0] text-[#615e57]'
              }`}
            >
              SMS Urgent
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-2 py-3 rounded-xl bg-[#006b45] hover:bg-[#21865b] text-white font-semibold text-[14px] shadow-md active:scale-[0.98] transition-all"
        >
          Activate Rescue Alerts
        </button>
      </div>
    </div>
  );
};

export const ViewDocModal: React.FC = () => {
  const { activeModal, setActiveModal, modalPayload } = useApp();

  if (activeModal !== 'view_doc') return null;

  const docName = modalPayload?.docName || 'IRS_Determination_Letter.pdf';
  const orgName = modalPayload?.orgName || 'West End Youth Pantry';

  return (
    <div className="fixed inset-0 z-50 bg-[#29322d]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#e6f0e8] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[24px]">picture_as_pdf</span>
            <div>
              <h4 className="font-headline text-[16px] font-bold text-[#151d19]">{docName}</h4>
              <p className="text-[12px] text-[#615e57]">{orgName} • Official Audit Copy</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="w-8 h-8 rounded-full bg-[#ecf6ee] flex items-center justify-center text-[#3e4942]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="bg-[#faf2ee] border border-[#dbc2b0] rounded-xl p-5 flex flex-col gap-3 font-mono text-[12px] text-[#1e1b19] leading-relaxed select-none">
          <div className="flex items-center justify-between border-b border-[#dbc2b0] pb-2 text-[11px] text-[#875100]">
            <span>GOVERNMENT OF TAMIL NADU - REVENUE & CHARITABLE TRUSTS</span>
            <span>DARPAN VERIFIED</span>
          </div>
          <div>
            <p className="font-bold text-[14px] text-[#8d4b00]">{orgName.toUpperCase()}</p>
            <p>TRUST REGISTRATION: #TN/2021/0291039 • SECTION 12A & 80G COMPLIANT</p>
            <p>FSSAI LICENSE: 12419008000412 (SURPLUS FOOD REDISTRIBUTION PERMIT)</p>
          </div>
          <p className="text-[#554336]">
            This charitable institution is officially accredited under Tamil Nadu Anna Daan guidelines and Section 31(2) of the Food Safety & Standards Regulations 2019. The premises in Madurai & Chennai maintain certified cold chain storage, stainless steel insulated transport vessels, and clean volunteer hygiene logbooks.
          </p>
          <div className="flex items-center justify-between pt-2 text-[10px] text-[#887364]">
            <span>REGISTERED DISTRICT: MADURAI & CHENNAI</span>
            <span className="text-[#006b45] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              ACTIVE ACCREDITED TRUST
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={() => setActiveModal('none')}
            className="px-4 py-2 rounded-xl bg-[#ecf6ee] text-[#151d19] font-medium text-[13px] hover:bg-[#e6f0e8]"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
