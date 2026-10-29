import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ActivityPage: React.FC = () => {
  const {
    activeDispatchPickedUp,
    markDispatchPickedUp,
    recentRescues,
    showToast,
    claimListing,
    setDonorReviewFilter,
    setPage
  } = useApp();

  const [isNavigating, setIsNavigating] = useState(false);
  const [quickRequested, setQuickRequested] = useState(false);
  const [pendingCancelled, setPendingCancelled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleStartNav = () => {
    setIsNavigating(true);
    showToast('Navigation started! Routing to Sri Meenakshi Kalyana Mandapam Gate #2 (ETA 8m)', 'explore', 'info');
  };

  const handleRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Dispatch board updated with latest Tamil Nadu volunteer check-ins.', 'cloud_done', 'success');
    }, 600);
  };

  const handleQuickRequest = () => {
    setQuickRequested(true);
    claimListing('listing-3', 20);
    showToast('Quick request confirmed for 20 kg Nilgiri Farm Greens! Dispatch pass generated.', 'task_alt', 'success');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10 space-y-6 animate-in fade-in duration-200">
      {/* NGO Identity & Status Banner */}
      <div className="bg-[#ecf6ee] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#97f6c2]/30 pointer-events-none"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-13 h-13 rounded-2xl bg-[#dbe5dd] flex items-center justify-center shrink-0 shadow-xs text-[#006b45]">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                volunteer_activism
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-headline text-[18px] sm:text-[22px] font-bold text-[#151d19] truncate">
                  Agara Foundation Food Bank
                </h1>
                <span
                  className="material-symbols-outlined text-[#006b45] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="DARPAN & 80G Verified NGO"
                >
                  verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#e7e2d8] text-[#1d1b16] text-[10px] font-bold uppercase tracking-wider">
                  Tamil Nadu NGO Coordinator
                </span>
                <span className="text-[#3e4942] text-[12px] flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#006b45] inline-block"></span>
                  Central Hub • Chennai & Madurai
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            aria-label="Refresh Status"
            className="w-10 h-10 rounded-full bg-white border border-[#bec9c0] flex items-center justify-center text-[#151d19] hover:bg-[#e6f0e8] transition-transform active:rotate-180 cursor-pointer shadow-xs"
          >
            <span className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin text-[#006b45]' : ''}`}>
              sync
            </span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Active Requests */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#e1ebe3] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">Active Req.</span>
            <span className="material-symbols-outlined text-[16px] text-[#875100]">
              pending_actions
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-headline text-[24px] text-[#151d19] font-bold">2</span>
            <span className="text-[11px] text-[#615e57]">lots</span>
          </div>
        </div>

        {/* Ready Pickup (Highlighted Green) */}
        <div className="bg-[#006b45] text-white rounded-2xl p-3.5 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-white/10 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-white/90 font-medium">Ready Pickup</span>
            <span className="w-2 h-2 rounded-full bg-[#97f6c2] animate-ping"></span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-headline text-[24px] text-white font-extrabold">1</span>
            <span className="text-[11px] text-[#97f6c2] font-semibold">urgent feast</span>
          </div>
        </div>

        {/* Total Food Rescued */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#e1ebe3] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">TN Rescued</span>
            <span className="material-symbols-outlined text-[16px] text-[#006b45]">eco</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-headline text-[20px] sm:text-[22px] text-[#151d19] font-bold leading-tight">
              {activeDispatchPickedUp ? '5,120' : '5,000'}
            </span>
            <span className="text-[11px] text-[#615e57]">kg meals</span>
          </div>
        </div>
      </div>

      {/* Active Dispatch Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Active Courier Dispatch
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#97f6c2] text-[#002112] text-[11px] font-bold">
              Action Needed
            </span>
          </div>
          <span className="text-[13px] text-[#006b45] font-semibold flex items-center">
            Tamil Nadu Live Map
            <span className="material-symbols-outlined text-[16px] ml-0.5">arrow_forward</span>
          </span>
        </div>

        {/* Urgent Pickup Card */}
        {!activeDispatchPickedUp ? (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1ebe3] space-y-4 relative overflow-hidden">
            <div className="w-1.5 h-full absolute left-0 top-0 bg-[#006b45]"></div>

            <div className="flex items-start justify-between gap-2 pl-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecf6ee] text-[#006b45] text-[11px] font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#006b45] animate-pulse"></span>
                  Approved • Ready for Pickup
                </div>
                <h3 className="font-headline text-[16px] font-bold text-[#151d19]">
                  120 Kalyana Mandapam Meals (Madurai)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#673d00] text-[11px] font-bold uppercase tracking-wide shrink-0">
                Pure Veg Feast
              </span>
            </div>

            {/* Donor info */}
            <div className="pl-2 flex gap-3 items-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc"
                alt="Madurai meal"
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[#151d19] text-[13px]">
                  <span className="material-symbols-outlined text-[16px] text-[#615e57]">
                    storefront
                  </span>
                  <span className="truncate font-bold">Sri Meenakshi Kalyana Mandapam</span>
                  <span className="text-[#615e57]">• 1.4 km</span>
                </div>
                <div className="flex items-center gap-1 text-[#875100] text-[12px] font-medium mt-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  <span>Window: Today 5:00 PM – 7:30 PM</span>
                </div>
                <div className="flex items-center gap-1 text-[#3e4942] text-[12px] mt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006b45]">
                    local_shipping
                  </span>
                  <span className="truncate">Van TN-09-CB-4210 (David S.)</span>
                </div>
              </div>
            </div>

            {/* Live Map Preview with ETA */}
            <div className="pl-2">
              <div className="w-full h-28 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex items-end p-2.5 border border-[#bec9c0]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
                  alt="Madurai Dispatch Route"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/15"></div>
                <div className="relative z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[#151d19] flex items-center justify-between w-full shadow-sm border border-[#e1ebe3]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[#006b45] text-[16px]">
                      navigation
                    </span>
                    <span className="text-[12px] font-bold truncate">
                      Mattuthavani Ring Road • Kitchen Gate #2
                    </span>
                  </div>
                  <span className="text-[12px] text-[#006b45] font-extrabold shrink-0">
                    {isNavigating ? 'LIVE · ETA 6m' : 'ETA 8m'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Actions */}
            <div className="pl-2 grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleStartNav}
                className="btn-3d btn-3d-secondary h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#006b45]">
                  {isNavigating ? 'explore' : 'near_me'}
                </span>
                <span>{isNavigating ? 'Navigating...' : 'Start Navigation'}</span>
              </button>
              <button
                onClick={markDispatchPickedUp}
                className="btn-3d btn-3d-primary h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Mark Picked Up</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#ecf6ee] border border-[#97f6c2] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 text-[#006b45]">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
              <div>
                <p className="font-bold text-[14px]">120 Kalyana Mandapam Meals Collected!</p>
                <p className="text-[12px] text-[#3e4942]">
                  Distributed at Madurai Pasi Illa Valarpirai Shelter.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setDonorReviewFilter('Sri Meenakshi Kalyana Mandapam');
                setPage('reviews');
              }}
              className="btn-3d btn-3d-primary h-9 px-4 text-[12px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              <span>Write Review</span>
            </button>
          </div>
        )}

        {/* Pending Review Card */}
        {!pendingCancelled && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e7e2d8] text-[#1d1b16] text-[11px] font-medium mb-1">
                  <span className="material-symbols-outlined text-[14px] text-[#875100]">
                    hourglass_empty
                  </span>
                  Pending Caterer Confirmation
                </div>
                <h3 className="font-headline font-bold text-[15px] text-[#151d19]">
                  60 Fresh Idli & Medu Vada Tiffin Packets
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#875100] text-[11px] font-bold uppercase tracking-wide shrink-0">
                Tiffin
              </span>
            </div>

            <div className="flex items-center justify-between text-[13px] text-[#615e57]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
                <span className="text-[#151d19] font-medium">Murugan Idli Shop Anna Nagar</span>
              </div>
              <span>Submitted 25 mins ago</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#e6f0e8]">
              <span className="text-[12px] text-[#615e57] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#006b45]">pin_drop</span>
                0.8 km away • Chennai
              </span>
              <button
                onClick={() => {
                  setPendingCancelled(true);
                  showToast('Reservation request cancelled for Idli tiffin packets.', 'cancel', 'info');
                }}
                className="text-[12px] font-bold text-[#ba1a1a] hover:underline cursor-pointer"
              >
                Cancel Request
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Smart Suggestions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006b45] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              recommend
            </span>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Smart Suggestions in Tamil Nadu
            </h2>
          </div>
          <span className="text-[12px] text-[#615e57]">Matches shelter diet preferences</span>
        </div>

        <div className="bg-[#ecf6ee] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] flex flex-col space-y-3">
          <div className="flex gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrZRPQPcMARSOtbh60w1kFhrDVpK4ESuSSu94Y7plTAi4vh3T_IZNg-poXf14blRz_Q39mrKkWvaC08Q3ACauJLE7ODUXR1PmrX0pt0u_NxmXuGVO3FDd9Y3Q9n3_v2oMvRDOctKUrgsUD_wvAa4WluvMvwH4A14Bw8SC7flOiKGrXk2Ju8JDFcEByz41DsEWYAVVqD_Ercu13nO_wOFdlqVtf80RTnh1G9_wZxMFZ2pFDoHcg8s"
              alt="Farm greens"
              className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#006b45] text-[10px] font-bold uppercase tracking-wider border border-[#bec9c0]">
                    Nilgiri Produce
                  </span>
                  <span className="text-[11px] text-[#615e57]">• Coimbatore RS Puram</span>
                </div>
                <h3 className="font-headline font-bold text-[15px] text-[#151d19] truncate">
                  Fresh Ooty Carrots, Beans & Greens
                </h3>
                <p className="text-[12px] text-[#615e57]">Uzhavar Sandhai Farmers Hub</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[13px] text-[#006b45] font-bold">45 kg available</span>
                <span className="text-[11px] text-[#875100] font-medium">Expires in 5h</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#dbe5dd]">
            <span className="text-[12px] text-[#3e4942]">Matches “Fresh Vegetables” alert</span>
            <button
              onClick={handleQuickRequest}
              disabled={quickRequested}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                quickRequested
                  ? 'bg-[#ecf6ee] text-[#006b45] border border-[#006b45]'
                  : 'bg-[#006b45] hover:bg-[#21865b] text-white active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {quickRequested ? 'check' : 'add_circle'}
              </span>
              <span>{quickRequested ? 'Requested!' : 'Quick Request'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Rescue History Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
            Recent Rescues in Tamil Nadu
          </h2>
          <span className="text-[12px] text-[#006b45] font-bold">View Full Seva Log</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-[#e1ebe3] divide-y divide-[#e6f0e8] overflow-hidden">
          {recentRescues.map(item => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-[#f2fcf4] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#ecf6ee] text-[#006b45] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.category === 'produce'
                      ? 'nutrition'
                      : item.category === 'dairy'
                      ? 'local_drink'
                      : 'lunch_dining'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-headline font-bold text-[14px] text-[#151d19] truncate">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[#615e57]">
                    {item.dateStr} • {item.source}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecf6ee] text-[#006b45] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                  Distributed
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Reach Goal Banner */}
      <div className="bg-[#e6f0e8] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs border border-[#bec9c0]">
        <div className="w-11 h-11 rounded-xl bg-[#875100]/10 text-[#875100] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-headline font-bold text-[15px] text-[#151d19]">
            Tamil Nadu Annadhana Reach Goal
          </h3>
          <p className="text-[13px] text-[#3e4942]">
            You have achieved 5,120 kg this month! Feeding 10,000 community meals across Madurai, Chennai & Coimbatore.
          </p>
        </div>
      </div>
    </div>
  );
};
