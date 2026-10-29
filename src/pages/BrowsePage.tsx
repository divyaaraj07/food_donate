import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const BrowsePage: React.FC = () => {
  const { listings, setPage, claimListing, setActiveModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'closest' | 'expiry' | 'portions'>('closest');
  const [showMap, setShowMap] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  const filterChips = [
    { id: 'All', label: 'All Tamil Nadu', icon: '' },
    { id: 'near', label: '< 2 km', icon: 'near_me' },
    { id: 'Meals', label: '🍲 Sambar & Meals', icon: '' },
    { id: 'Tiffin', label: '🥟 Tiffin & Idlis', icon: '' },
    { id: 'Produce', label: '🥬 Nilgiri Produce', icon: '' },
    { id: 'Dairy', label: '🥛 Aavin Dairy', icon: '' },
    { id: 'urgent', label: '⚡ Urgent (< 3 hrs)', icon: '' }
  ];

  const filteredListings = useMemo(() => {
    return listings
      .filter(item => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesDonor = item.donor.name.toLowerCase().includes(q);
          const matchesCategory = item.category.toLowerCase().includes(q);
          const matchesBatch = item.batchDetails.toLowerCase().includes(q);
          const matchesCity = item.donor.city?.toLowerCase().includes(q) || false;
          if (!matchesTitle && !matchesDonor && !matchesCategory && !matchesBatch && !matchesCity) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory === 'All') return true;
        if (selectedCategory === 'near') {
          return item.distance.includes('0.') || item.distance.includes('1.');
        }
        if (selectedCategory === 'Produce') return item.category === 'Fresh Produce';
        if (selectedCategory === 'Meals') return item.category === 'Prepared Meals' && !item.title.toLowerCase().includes('idli');
        if (selectedCategory === 'Tiffin') return item.title.toLowerCase().includes('idli') || item.category === 'Bakery';
        if (selectedCategory === 'Dairy') return item.category === 'Dairy';
        if (selectedCategory === 'urgent') return item.urgent;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'portions') return b.quantity - a.quantity;
        if (sortBy === 'expiry') return (a.urgent ? -1 : 1) - (b.urgent ? -1 : 1);
        return 0; // default closest
      });
  }, [listings, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10 space-y-4 animate-in fade-in duration-200">
      {/* Search & Filter Bar */}
      <div className="flex flex-col space-y-3">
        {/* Search Input */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#6e7a71]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search sambar rice, idli, biryani, Madurai, Chennai..."
            className="w-full h-12 pl-10 pr-10 bg-white text-[#151d19] placeholder:text-[#6e7a71] text-[15px] rounded-xl shadow-xs border border-[#e1ebe3] focus:outline-none focus:ring-2 focus:ring-[#006b45]/30 focus:border-[#006b45] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#6e7a71] hover:text-[#151d19] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Chips Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {filterChips.map(chip => {
            const isActive = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006b45] text-white shadow-xs'
                    : 'bg-[#ecf6ee] text-[#151d19] hover:bg-[#e6f0e8] border border-[#e1ebe3]'
                }`}
              >
                {chip.icon && (
                  <span className="material-symbols-outlined text-[15px]">{chip.icon}</span>
                )}
                <span>{chip.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#97f6c2]"></span>}
              </button>
            );
          })}
        </div>

        {/* Results Count, Sort, and Map Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-[#006b45]"></span>
            <span className="text-[13px] text-[#3e4942]">
              <strong className="text-[#151d19] font-bold">{filteredListings.length} surplus batches</strong> in Tamil Nadu
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              aria-label="Sort listings"
              className="px-2.5 py-1.5 rounded-lg bg-[#e6f0e8] hover:bg-[#dbe5dd] text-[#3e4942] text-[12px] font-semibold outline-none border-none cursor-pointer"
            >
              <option value="closest">Sort: Closest First</option>
              <option value="expiry">Sort: Expiring Soonest</option>
              <option value="portions">Sort: Most Portions</option>
            </select>

            {/* Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                showMap
                  ? 'bg-[#006b45] text-white shadow-xs'
                  : 'bg-[#e6f0e8] text-[#006b45] hover:bg-[#dbe5dd]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {showMap ? 'list' : 'map'}
              </span>
              <span>{showMap ? 'List' : 'Map'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tamil Nadu Map View */}
      {showMap && (
        <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#e1ebe3] shadow-sm relative bg-[#d2ddd5] animate-in fade-in zoom-in-95 duration-200">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
            alt="Tamil Nadu Route Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#006b45]/10 pointer-events-none"></div>

          {/* Location Pin 1: Madurai */}
          <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setSelectedMapPin('listing-1')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#006b45] text-white shadow-lg text-[12px] font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">temple_hindu</span>
              <span>Madurai (120 meals)</span>
            </button>
          </div>

          {/* Location Pin 2: Chennai */}
          <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setSelectedMapPin('listing-2')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#875100] text-white shadow-lg text-[12px] font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">restaurant</span>
              <span>Chennai (60 idlis)</span>
            </button>
          </div>

          {/* Location Pin 3: Coimbatore */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setSelectedMapPin('listing-3')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#21865b] text-white shadow-lg text-[12px] font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">eco</span>
              <span>Coimbatore (45 kg)</span>
            </button>
          </div>

          {/* Selected Pin Mini Popup Card */}
          {selectedMapPin && (
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-80 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-[#e1ebe3] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-150">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#006b45] uppercase">
                  Tamil Nadu Center
                </span>
                <p className="text-[13px] font-bold text-[#151d19] truncate">
                  {listings.find(l => l.id === selectedMapPin)?.title}
                </p>
                <p className="text-[11px] text-[#615e57]">
                  {listings.find(l => l.id === selectedMapPin)?.donor.name} • {listings.find(l => l.id === selectedMapPin)?.donor.city}
                </p>
              </div>
              <button
                onClick={() => setPage('details', selectedMapPin)}
                className="px-3 py-1.5 rounded-lg bg-[#006b45] text-white text-[12px] font-semibold shrink-0 cursor-pointer"
              >
                View
              </button>
            </div>
          )}
        </div>
      )}

      {/* Listings Stream */}
      <div className="flex flex-col space-y-4">
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#e1ebe3] space-y-3">
            <span className="material-symbols-outlined text-[48px] text-[#6e7a71]">
              search_off
            </span>
            <h3 className="font-headline font-bold text-[18px] text-[#151d19]">
              No donations found matching "{searchQuery}"
            </h3>
            <p className="text-[14px] text-[#615e57] max-w-sm mx-auto">
              Try searching for Madurai, Chennai, Coimbatore, or traditional foods like Sambar, Biryani, or Idli.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#006b45] text-white text-[13px] font-semibold hover:bg-[#21865b]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredListings.map(item => (
            <article
              key={item.id}
              className="card-3d rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Media Card Header */}
              <div
                onClick={() => setPage('details', item.id)}
                className="relative w-full h-48 sm:h-56 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

                {/* Tags Top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {item.category}
                    </span>

                    {/* Pure Veg Badge */}
                    <span
                      className="w-5 h-5 bg-white rounded flex items-center justify-center p-0.5 shadow-sm border border-[#006b45]"
                      title="FSSAI Verified Pure Vegetarian"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#006b45]"></span>
                    </span>

                    {item.urgent && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold shadow-sm">
                        <span className="material-symbols-outlined text-[13px]">timer</span>
                        <span>{item.expiresInText}</span>
                      </span>
                    )}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#006b45] text-[11px] font-bold shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006b45] animate-pulse"></span>
                    <span>{item.isAvailable ? 'Available Now' : 'Claimed'}</span>
                  </span>
                </div>

                {/* Portions & Title Bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-[12px] opacity-90 mb-1">
                    <span className="material-symbols-outlined text-[16px] text-[#ffb869]">scale</span>
                    <span>{item.portionsText}</span>
                  </div>
                  <h2 className="font-headline text-[18px] sm:text-[20px] font-bold text-white leading-tight drop-shadow-sm">
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col space-y-3">
                {/* Donor Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.donor.avatar}
                      alt={item.donor.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#bec9c0] shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-headline font-bold text-[14px] text-[#151d19] truncate">
                          {item.donor.name}
                        </span>
                        {item.donor.verified && (
                          <span
                            className="material-symbols-outlined text-[#006b45] text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                            title="FSSAI Verified Donor"
                          >
                            verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[#3e4942] text-[12px]">
                        <span className="text-[#875100] font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          {item.donor.rating}
                        </span>
                        <span>•</span>
                        <span className="text-[#006b45] font-semibold">{item.donor.city}</span>
                        <span>•</span>
                        <span className="truncate">{item.distance}</span>
                        <span>•</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setPage('reviews');
                          }}
                          className="text-[#006b45] font-bold hover:underline"
                        >
                          Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup Window */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#ecf6ee] text-[#3e4942] text-[13px]">
                  <span className="material-symbols-outlined text-[18px] text-[#006b45]">
                    schedule
                  </span>
                  <span>
                    Pickup Window: <strong className="text-[#151d19] font-medium">{item.pickupWindow}</strong>
                  </span>
                </div>

                {/* 3D Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => setPage('details', item.id)}
                    className="btn-3d btn-3d-secondary h-11 text-[13px] font-bold cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => claimListing(item.id)}
                    className="btn-3d btn-3d-primary h-11 text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Request Food</span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Custom Alert Box */}
      <div className="rounded-2xl p-5 bg-[#ecf6ee] border border-[#e1ebe3] text-[#151d19] flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#006b45]/10 text-[#006b45] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[22px]">notifications_active</span>
        </div>
        <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
          <h3 className="font-headline font-bold text-[16px] text-[#151d19] leading-tight">
            Can’t find what your shelter needs?
          </h3>
          <p className="text-[13px] text-[#3e4942] leading-relaxed">
            Set up a real-time AnnaSeva alert for tiffin, sambar rice, or Nilgiri vegetable batches in your Tamil Nadu district.
          </p>
          <div className="pt-1">
            <button
              onClick={() => setActiveModal('custom_alert')}
              className="inline-flex items-center gap-1 text-[13px] text-[#006b45] font-bold hover:underline cursor-pointer"
            >
              <span>Create Custom Tamil Nadu Food Alert</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
