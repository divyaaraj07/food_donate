import React from 'react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const {
    setPage,
    role,
    setRole,
    requests,
    acceptRequest,
    declineRequest,
    listings,
    showToast,
    userOrg,
    userName
  } = useApp();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10 space-y-6 animate-in fade-in duration-200">
      {/* Profile & Mode Switcher Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-[#006b45]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">
              {userOrg || 'Sri Meenakshi Kalyana Mandapam (Madurai)'}
            </span>
          </div>
          <h1 className="font-headline text-[24px] sm:text-[30px] text-[#151d19] font-bold truncate">
            Vanakkam, {userName || 'Sundaram Chettiar'}!
          </h1>
        </div>

        {/* Role Toggle Chip */}
        <button
          onClick={() => {
            const next = role === 'donor' ? 'recipient' : 'donor';
            setRole(next);
            setPage(next === 'donor' ? 'dashboard' : 'activity');
          }}
          type="button"
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#21865b] text-white shadow-sm hover:bg-[#006b45] transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            storefront
          </span>
          <span className="text-[12px] font-semibold tracking-wide">Donor Mode</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#97f6c2] animate-pulse"></span>
        </button>
      </div>

      {/* Primary Action Dispatch & Reviews Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setPage('donate')}
          className="btn-3d btn-3d-primary flex-1 h-14 text-[15px] font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[24px]">add_circle</span>
          <span>+ List New Food Donation (Tamil Nadu)</span>
        </button>
        <button
          onClick={() => setPage('reviews')}
          className="btn-3d btn-3d-secondary sm:w-auto h-14 px-5 text-[14px] font-bold cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px] text-[#d97706]">rate_review</span>
          <span>Community Reviews (4.96 ★)</span>
        </button>
      </div>

      {/* Impact Snapshot Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e6f0e8] to-[#e1ebe3] p-4 sm:p-5 shadow-xs border border-[#bec9c0]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006b45]/10 flex items-center justify-center shrink-0 text-[#006b45]">
            <span className="material-symbols-outlined text-[24px]">compost</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-[#006b45] font-bold uppercase tracking-wider">
                Tamil Nadu Annual Impact
              </span>
              <span className="text-xs">🌿</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[#151d19] font-medium mt-0.5">
              You've helped provide <span className="font-bold text-[#006b45]">4,820 banana leaf meals</span> and saved <span className="font-bold text-[#006b45]">2.4 tons</span> of CO₂ this year across Madurai & Chennai!
            </p>
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Donated */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">Total Donated</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6f0e8] flex items-center justify-center text-[#006b45]">
              <span className="material-symbols-outlined text-[16px]">scale</span>
            </div>
          </div>
          <div>
            <div className="font-headline text-[22px] text-[#151d19] font-extrabold tracking-tight">
              2,140 <span className="text-[13px] text-[#615e57] font-normal">kg</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#006b45]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="text-[11px] font-bold">+24% wedding season</span>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex flex-col justify-between space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#ffdcbb]/30 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">Pending Requests</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[10px] font-bold flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#875100] animate-ping"></span>
              Action
            </span>
          </div>
          <div>
            <div className="font-headline text-[22px] text-[#875100] font-extrabold tracking-tight">
              {requests.filter(r => r.status === 'pending').length}
            </div>
            <span className="text-[11px] text-[#615e57]">Awaiting confirmation</span>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">Active Batches</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6f0e8] flex items-center justify-center text-[#615e57]">
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            </div>
          </div>
          <div>
            <div className="font-headline text-[22px] text-[#151d19] font-extrabold tracking-tight">
              {listings.length} <span className="text-[13px] text-[#615e57] font-normal">lots</span>
            </div>
            <span className="text-[11px] text-[#615e57]">Available in TN</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e1ebe3] flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#615e57] font-medium">Completed Runs</span>
            <div className="w-7 h-7 rounded-lg bg-[#e6f0e8] flex items-center justify-center text-[#006b45]">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
            </div>
          </div>
          <div>
            <div className="font-headline text-[22px] text-[#151d19] font-extrabold tracking-tight">
              64 <span className="text-[13px] text-[#615e57] font-normal">runs</span>
            </div>
            <span className="text-[11px] text-[#615e57]">100% fulfilled</span>
          </div>
        </div>
      </div>

      {/* Incoming Requests Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#875100] text-[20px]">
              notification_important
            </span>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Incoming Shelter Requests
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
            {requests.filter(r => r.status === 'pending').length} Needs Attention
          </span>
        </div>

        <div className="space-y-3">
          {requests.map(req => (
            <div
              key={req.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] flex flex-col space-y-3 transition-all ${
                req.status === 'accepted' ? 'bg-[#97f6c2]/15 border-[#006b45]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={req.imageUrl}
                  alt={req.requestedItem}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        req.status === 'accepted'
                          ? 'bg-[#006b45] text-white'
                          : 'bg-[#ffdcbb] text-[#2b1700]'
                      }`}
                    >
                      {req.status === 'accepted' ? 'COURIER DISPATCHED' : 'PENDING CONFIRMATION'}
                    </span>
                    <span className="text-[11px] text-[#615e57] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {req.timeAgo}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-[15px] text-[#151d19] mt-1 truncate">
                    {req.recipientName}
                  </h3>
                  <p className="text-[13px] text-[#615e57]">
                    Requested: <span className="text-[#151d19] font-medium">{req.requestedItem}</span>
                  </p>
                </div>
              </div>

              {/* Logistics pill */}
              <div className="bg-[#ecf6ee] rounded-xl p-2.5 flex items-center justify-between text-[#3e4942]">
                <div className="flex items-center gap-1.5 truncate text-[13px]">
                  <span className="material-symbols-outlined text-[#006b45] text-[18px]">
                    directions_car
                  </span>
                  <span className="truncate">
                    Pickup: <strong className="text-[#151d19] font-semibold">{req.pickupTime}</strong>
                  </span>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#dbe5dd] text-[#3e4942]">
                  {req.volunteerOrMethod}
                </span>
              </div>

              {/* 3D Action buttons */}
              {req.status === 'pending' ? (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => acceptRequest(req.id)}
                    className="btn-3d btn-3d-primary flex-1 h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Accept Feast Request</span>
                  </button>
                  <button
                    onClick={() => declineRequest(req.id)}
                    className="btn-3d btn-3d-secondary h-11 px-4 text-[13px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    <span>Decline</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-1 text-[#006b45] text-[13px] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                    <span>Pickup dispatch confirmed for {req.recipientName}</span>
                  </div>
                  <span className="text-[11px] text-[#615e57]">Tamil Nadu E-Van Assigned</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Active Listings Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006b45] text-[20px]">fastfood</span>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Active Mandapam Listings
            </h2>
          </div>
          <button
            onClick={() => setPage('browse')}
            className="text-[12px] font-bold text-[#006b45] hover:underline cursor-pointer"
          >
            View All ({listings.length})
          </button>
        </div>

        <div className="space-y-3">
          {listings.slice(0, 2).map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e1ebe3] space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        index === 0
                          ? 'bg-[#ffdcbb] text-[#2b1700]'
                          : 'bg-[#97f6c2] text-[#002112]'
                      }`}
                    >
                      {index === 0 ? 'Feast Ready' : 'Active'}
                    </span>
                    <span className="text-[11px] text-[#615e57]">{item.expiresInText}</span>
                  </div>
                  <h3 className="font-headline font-bold text-[16px] text-[#151d19] mt-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#615e57] mt-0.5">
                    Available: <strong className="text-[#151d19]">{item.portionsText}</strong>
                  </p>
                </div>
              </div>

              {/* Strip */}
              <div className="flex items-center justify-between pt-2 border-t border-[#e6f0e8]">
                <span className="text-[12px] text-[#615e57] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006b45]"></span>
                  Ready at {item.donor.city}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage('details', item.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#ecf6ee] text-[#151d19] text-[12px] font-semibold hover:bg-[#e6f0e8] flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>View Batch</span>
                  </button>
                  <button
                    onClick={() => showToast('Batch marked as fulfilled & distributed.', 'done_all')}
                    className="px-3 py-1.5 rounded-xl bg-[#006b45]/10 text-[#006b45] text-[12px] font-bold hover:bg-[#006b45]/20 flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">done_all</span>
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
