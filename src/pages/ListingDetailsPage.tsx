import React from 'react';
import { useApp } from '../context/AppContext';

export const ListingDetailsPage: React.FC = () => {
  const {
    selectedListing,
    setPage,
    bookmarks,
    toggleBookmark,
    claimListing,
    setActiveModal,
    showToast,
    setDonorReviewFilter
  } = useApp();

  if (!selectedListing) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4">
        <h3 className="font-headline font-bold text-[20px]">Listing not found</h3>
        <button
          onClick={() => setPage('browse')}
          className="px-4 py-2 bg-[#006b45] text-white rounded-xl"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(selectedListing.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `FoodShare Tamil Nadu: ${selectedListing.title}`,
          text: `${selectedListing.portionsText} ready for rescue at ${selectedListing.donor.city}!`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'share', 'info');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto pb-28 animate-in fade-in duration-200">
      {/* Top Navigation & Action Row */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={() => setPage('browse')}
          className="inline-flex items-center gap-1.5 text-[#006b45] font-semibold text-[14px] hover:opacity-85 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Browse</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(selectedListing.id)}
            aria-label="Save listing"
            className="w-10 h-10 rounded-full bg-[#e6f0e8] hover:bg-[#dbe5dd] flex items-center justify-center text-[#3e4942] transition-colors cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isBookmarked ? 'text-[#006b45]' : ''
              }`}
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
          <button
            onClick={handleShare}
            aria-label="Share listing"
            className="w-10 h-10 rounded-full bg-[#e6f0e8] hover:bg-[#dbe5dd] flex items-center justify-center text-[#3e4942] hover:text-[#006b45] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#e6f0e8] shadow-md mb-4 border border-[#e1ebe3]">
        <div className="h-64 sm:h-72 w-full relative">
          <img
            src={selectedListing.imageUrl}
            alt={selectedListing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          {/* Top badges on image */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#a96700] text-[12px] font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#a96700] animate-pulse"></span>
                {selectedListing.category}
              </span>
              {/* Pure Veg Badge */}
              <span className="w-6 h-6 bg-white rounded flex items-center justify-center p-0.5 shadow-sm border border-[#006b45]" title="100% Pure Veg">
                <span className="w-3 h-3 rounded-full bg-[#006b45]"></span>
              </span>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#21865b] text-white text-[12px] font-bold shadow-sm">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              {selectedListing.isAvailable ? 'Available Now' : 'Claimed'}
            </span>
          </div>

          {/* Urgent timer badge over hero */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[12px] font-bold shadow-md">
              <span className="material-symbols-outlined text-[16px] text-[#875100]">alarm</span>
              <span>Urgent: Pick up by {selectedListing.expiryTime} ({selectedListing.donor.city})</span>
            </div>
          </div>
        </div>

        {/* Core Food Title & Metrics */}
        <div className="p-4 sm:p-5 bg-white flex flex-col gap-2">
          <h1 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#151d19] leading-tight">
            {selectedListing.title}
          </h1>

          <div className="flex items-center gap-2 text-[#3e4942] text-[14px]">
            <span className="material-symbols-outlined text-[18px] text-[#006b45]">inventory_2</span>
            <span>{selectedListing.portionsText}</span>
          </div>

          {/* Countdown Bar Card */}
          <div className="mt-1 p-3 rounded-xl bg-[#ecf6ee] flex items-center justify-between border border-[#e1ebe3]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#875100] text-[20px]">hourglass_top</span>
              <span className="text-[13px] text-[#151d19] font-bold">
                {selectedListing.expiresInText}
              </span>
            </div>
            <div className="w-16 h-2 rounded-full bg-[#dbe5dd] overflow-hidden">
              <div className="w-3/4 h-full bg-[#875100] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Profile Card */}
      <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1ebe3] mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-13 h-13 rounded-full overflow-hidden bg-[#e6f0e8] shrink-0 border border-[#bec9c0]">
              <img
                src={selectedListing.donor.avatar}
                alt={selectedListing.donor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline font-bold text-[16px] text-[#151d19] truncate">
                  {selectedListing.donor.name}
                </h3>
                {selectedListing.donor.verified && (
                  <span
                    className="material-symbols-outlined text-[#006b45] text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    title="FSSAI Verified Donor"
                  >
                    verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#615e57]">
                <span className="inline-flex items-center text-[#875100]">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <strong className="ml-0.5">{selectedListing.donor.rating}</strong>
                </span>
                <span>•</span>
                <span className="text-[#006b45] font-semibold">{selectedListing.donor.city}</span>
                <span>•</span>
                <span>{selectedListing.donor.rescuesCompleted} rescues completed</span>
              </div>
              {selectedListing.donor.fssaiNumber && (
                <span className="text-[10px] text-[#615e57] font-mono mt-0.5 block">
                  FSSAI Lic: {selectedListing.donor.fssaiNumber}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setDonorReviewFilter(selectedListing.donor.name);
              setPage('reviews');
            }}
            className="btn-3d btn-3d-secondary h-9 px-3 text-[12px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
            title="Read verified community feedback for this donor"
          >
            <span className="material-symbols-outlined text-[16px] text-[#d97706]">star</span>
            <span>View Reviews</span>
          </button>
        </div>

        {/* Contact actions */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#e6f0e8]">
          <button
            onClick={() => setActiveModal('message_donor')}
            className="btn-3d btn-3d-white h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006b45]">chat_bubble</span>
            <span>Message Caterer</span>
          </button>
          <button
            onClick={() => setActiveModal('call_kitchen')}
            className="btn-3d btn-3d-white h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006b45]">call</span>
            <span>Call Kitchen Gate</span>
          </button>
        </div>
      </div>

      {/* Batch Details */}
      <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1ebe3] mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006b45] text-[20px]">restaurant</span>
          <h3 className="font-headline text-[18px] font-bold text-[#151d19]">
            Feast & Cooking Batch Details
          </h3>
        </div>

        <p className="text-[14px] text-[#3e4942] leading-relaxed">
          {selectedListing.batchDetails}
        </p>

        {/* Dietary & Safety Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedListing.dietaryTags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#ecf6ee] text-[#006b45] text-[12px] font-bold flex items-center gap-1 border border-[#e1ebe3]"
            >
              <span className="material-symbols-outlined text-[14px]">check</span>
              {tag}
            </span>
          ))}
        </div>

        {/* Allergen Notice */}
        {selectedListing.allergenNotice && (
          <div className="mt-1 p-3.5 rounded-xl bg-[#e6f0e8] flex items-start gap-2.5 border border-[#dbe5dd]">
            <span className="material-symbols-outlined text-[#875100] text-[20px] shrink-0 mt-0.5">
              warning
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#151d19]">Dietary & Ingredient Note</span>
              <span className="text-[12px] text-[#3e4942] leading-normal">
                {selectedListing.allergenNotice}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pickup Instructions Section */}
      <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1ebe3] mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b45] text-[20px]">local_shipping</span>
            <h3 className="font-headline text-[18px] font-bold text-[#151d19]">Pickup Instructions</h3>
          </div>
          <span className="text-[12px] text-[#006b45] font-bold">{selectedListing.distance}</span>
        </div>

        {/* Map preview */}
        <div className="w-full h-36 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-2.5 shadow-inner border border-[#bec9c0]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
            alt="Tamil Nadu Route Map"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 w-full flex items-center justify-between bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm border border-[#e1ebe3]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <span className="text-[12px] font-bold text-[#151d19] truncate">
                {selectedListing.donor.address}
              </span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedListing.donor.address + ', ' + selectedListing.donor.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[#006b45] text-[12px] font-bold flex items-center gap-1 hover:underline"
            >
              <span>Open Maps</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Address and instructions */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#615e57] text-[18px] shrink-0 mt-0.5">
              apartment
            </span>
            <span className="text-[14px] text-[#151d19] font-medium">
              {selectedListing.donor.address}, {selectedListing.donor.city}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#006b45] text-[18px] shrink-0 mt-0.5">
              doorbell
            </span>
            <span className="text-[13px] text-[#3e4942]">
              {selectedListing.donor.dockInstructions}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Reservation Tray */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e1ebe3] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 pt-3 pb-safe flex flex-col gap-1.5">
        <div className="max-w-2xl mx-auto w-full flex gap-3 items-center">
          {/* Request Partial Button */}
          <button
            onClick={() => setActiveModal('partial_claim')}
            className="btn-3d btn-3d-secondary flex-1 h-12 text-[13px] font-bold text-center cursor-pointer"
          >
            Request Partial (25)
          </button>

          {/* Request Entire Batch Button */}
          <button
            onClick={() => claimListing(selectedListing.id)}
            className="btn-3d btn-3d-primary flex-[2] h-12 text-[14px] font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Request Entire Batch ({selectedListing.quantity})</span>
          </button>
        </div>

        {/* FSSAI Good Samaritan Protection Note */}
        <div className="flex items-center justify-center gap-1 text-center pb-1">
          <span className="material-symbols-outlined text-[13px] text-[#6e7a71]">verified_user</span>
          <span className="text-[11px] text-[#6e7a71]">
            Protected under FSSAI Surplus Food Regulations 2019 & Good Samaritan Food Act
          </span>
        </div>
      </div>
    </div>
  );
};
