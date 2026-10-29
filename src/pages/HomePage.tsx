import React from 'react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { setPage, claimListing, listings, isLoggedIn } = useApp();

  const handleClaim = (e: React.MouseEvent, listingId: string) => {
    e.stopPropagation();
    claimListing(listingId);
  };

  const handleDonateClick = () => {
    if (!isLoggedIn) {
      setPage('donate'); // AppContext intercepts and redirects to auth with postLoginRedirect='donate'
    } else {
      setPage('donate');
    }
  };

  const urgentListings = [
    {
      id: 'listing-1',
      title: 'Kalyana Mandapam Sambar Rice, Kurma & Poori',
      donorName: 'Sri Meenakshi Kalyana Mandapam',
      category: 'Prepared Meals',
      expiry: 'Exp: 2h 15m',
      amount: '120 Portions',
      distance: '1.4 km • Madurai',
      isPureVeg: true,
      img: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'listing-2',
      title: 'Murugan Style Steamed Idlis & Medu Vadas',
      donorName: 'Murugan Idli Shop & Tiffin Kitchen',
      category: 'Tiffin',
      expiry: 'Exp: 2h left',
      amount: '60 Packets',
      distance: '0.8 km • Anna Nagar, Chennai',
      isPureVeg: true,
      img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'listing-3',
      title: 'Fresh Nilgiri Organic Carrots & Beans',
      donorName: 'Uzhavar Sandhai Hub',
      category: 'Produce',
      expiry: 'Exp: 5h left',
      amount: '45 kg',
      distance: '1.2 km • Coimbatore',
      isPureVeg: true,
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-10 space-y-8 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#ecf6ee] p-5 sm:p-8 shadow-sm border border-[#e1ebe3]">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#7bd9a7]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 bottom-0 w-36 h-36 rounded-full bg-[#ffdcbb]/30 blur-xl pointer-events-none"></div>

        <div className="relative flex flex-col space-y-4">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dbe5dd] w-fit shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#006b45] animate-pulse"></span>
            <span className="text-[12px] text-[#3e4942] font-bold tracking-wide">
              TAMIL NADU ANNA DAAN NETWORK
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-[32px] sm:text-[44px] font-extrabold text-[#151d19] leading-[1.15] tracking-tight">
            Share More Food. <br />
            <span className="text-[#006b45]">Stop Waste in Tamil Nadu.</span> <br />
            Feed Community Tables.
          </h1>

          {/* Description */}
          <p className="text-[15px] sm:text-[16px] text-[#3e4942] leading-relaxed max-w-xl">
            Connecting Kalyana Mandapams, caterers, sweet shops, and restaurants across Chennai, Madurai, Coimbatore, and Trichy with verified food banks and shelters.
          </p>

          {/* 3D Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleDonateClick}
              className="btn-3d btn-3d-primary h-12 px-6 text-[15px] flex items-center justify-between sm:justify-center gap-3 cursor-pointer shadow-md"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
                <span>Donate Surplus Food {!isLoggedIn && '(Login Required)'}</span>
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <button
              onClick={() => setPage('browse')}
              className="btn-3d btn-3d-secondary h-12 px-6 text-[15px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#875100]">near_me</span>
              <span>Find Food in Tamil Nadu</span>
            </button>
          </div>

          {/* Hero Image Card */}
          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mt-3 shadow-inner border border-[#bec9c0]">
            <img
              className="w-full h-full object-cover"
              alt="Community volunteers sharing fresh food"
              src="https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-[18px] text-[#ffb869]">verified</span>
                <span className="text-[13px] font-medium">FSSAI compliant inspected redistribution within 90 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Statistics */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b45] text-[20px]">ecg_heart</span>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Tamil Nadu AnnaSeva Live Impact
            </h2>
          </div>
          <span className="text-[12px] text-[#006b45] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006b45] animate-pulse"></span>
            State Live Ticker
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e1ebe3]">
            <div className="w-8 h-8 rounded-full bg-[#dbe5dd] flex items-center justify-center text-[#006b45] mb-2">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div>
              <span className="font-headline text-[22px] sm:text-[24px] text-[#151d19] block font-extrabold tracking-tight">
                68,450+
              </span>
              <span className="text-[12px] text-[#3e4942]">Banana Leaf Meals</span>
            </div>
          </div>

          <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e1ebe3]">
            <div className="w-8 h-8 rounded-full bg-[#dbe5dd] flex items-center justify-center text-[#875100] mb-2">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div>
              <span className="font-headline text-[22px] sm:text-[24px] text-[#151d19] block font-extrabold tracking-tight">
                1,840+
              </span>
              <span className="text-[12px] text-[#3e4942]">Active Mandapams</span>
            </div>
          </div>

          <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e1ebe3]">
            <div className="w-8 h-8 rounded-full bg-[#dbe5dd] flex items-center justify-center text-[#875100] mb-2">
              <span className="material-symbols-outlined text-[18px]">diversity_1</span>
            </div>
            <div>
              <span className="font-headline text-[22px] sm:text-[24px] text-[#151d19] block font-extrabold tracking-tight">
                210
              </span>
              <span className="text-[12px] text-[#3e4942]">Tamil Nadu Shelters</span>
            </div>
          </div>

          <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e1ebe3]">
            <div className="w-8 h-8 rounded-full bg-[#dbe5dd] flex items-center justify-center text-[#006b45] mb-2">
              <span className="material-symbols-outlined text-[18px]">co2</span>
            </div>
            <div>
              <span className="font-headline text-[22px] sm:text-[24px] text-[#151d19] block font-extrabold tracking-tight">
                42.8 Tons
              </span>
              <span className="text-[12px] text-[#3e4942]">CO2 Offset</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Food Rescues Horizontal Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19]">
              Urgent Food Rescues in Tamil Nadu
            </h2>
            <p className="text-[13px] text-[#3e4942]">Ready for immediate pickup nearby</p>
          </div>
          <button
            onClick={() => setPage('browse')}
            className="text-[13px] text-[#006b45] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <span>See All ({listings.length})</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar">
          {urgentListings.map(item => (
            <div
              key={item.id}
              onClick={() => setPage('details', item.id)}
              className="card-3d w-[280px] flex-shrink-0 rounded-2xl p-3 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-2.5">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-200" />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdcbb] text-[#2b1700] text-[11px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    {item.isPureVeg && (
                      <span className="w-4 h-4 bg-white rounded flex items-center justify-center p-0.5 shadow-xs" title="100% Pure Veg">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#006b45]"></span>
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[13px]">timer</span>
                    {item.expiry}
                  </div>
                </div>
                <h3 className="font-headline font-bold text-[15px] text-[#151d19] truncate leading-snug">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#615e57] truncate mt-0.5">{item.donorName}</p>
              </div>

              <div className="pt-3 flex items-center justify-between mt-2 border-t border-[#e6f0e8]">
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#151d19] font-bold">{item.amount}</span>
                  <span className="text-[11px] text-[#3e4942] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-[#006b45]">pin_drop</span>
                    {item.distance}
                  </span>
                </div>
                <button
                  onClick={e => handleClaim(e, item.id)}
                  className="btn-3d btn-3d-primary h-8 px-3.5 text-[12px] font-bold cursor-pointer"
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How FoodShare AnnaSeva Works */}
      <section className="space-y-4 pt-2">
        <div className="text-center space-y-1">
          <span className="text-[11px] text-[#006b45] font-bold uppercase tracking-wider">
            Simple Tamil Nadu Logistics
          </span>
          <h2 className="font-headline text-[22px] font-bold text-[#151d19]">
            How AnnaSeva FoodShare Works
          </h2>
          <p className="text-[13px] text-[#3e4942]">Connecting food rescue across districts in under 3 minutes</p>
        </div>

        <div className="space-y-3">
          <div className="bg-[#ecf6ee] rounded-2xl p-4 flex gap-4 items-start shadow-xs border border-[#e1ebe3]">
            <div className="btn-3d btn-3d-primary w-10 h-10 rounded-xl text-white flex items-center justify-center font-headline font-bold text-[18px] shrink-0">
              1
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-[16px] text-[#151d19]">
                  Kalyana Mandapam & Kitchen Post in 60s
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#006b45]">photo_camera</span>
              </div>
              <p className="text-[13px] text-[#3e4942] leading-relaxed">
                Snap meal photos, tag pure veg / FSSAI certification, and dispatch surplus before it goes cold.
              </p>
            </div>
          </div>

          <div className="bg-[#ecf6ee] rounded-2xl p-4 flex gap-4 items-start shadow-xs border border-[#e1ebe3]">
            <div className="btn-3d btn-3d-secondary w-10 h-10 rounded-xl text-[#1d1b16] flex items-center justify-center font-headline font-bold text-[18px] shrink-0">
              2
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-[16px] text-[#151d19]">
                  Instant Ping to Nearby Shelters & Ashrams
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#875100]">notifications_active</span>
              </div>
              <p className="text-[13px] text-[#3e4942] leading-relaxed">
                Verified orphanages, night shelters, and trusts receive instant push notification in Tamil & English.
              </p>
            </div>
          </div>

          <div className="bg-[#ecf6ee] rounded-2xl p-4 flex gap-4 items-start shadow-xs border border-[#e1ebe3]">
            <div className="btn-3d btn-3d-accent w-10 h-10 rounded-xl text-white flex items-center justify-center font-headline font-bold text-[18px] shrink-0">
              3
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-[16px] text-[#151d19]">
                  Swift Van & E-Auto Hand-off
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#006b45]">local_shipping</span>
              </div>
              <p className="text-[13px] text-[#3e4942] leading-relaxed">
                Coordinated collection using clean food vessels and real-time live map navigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Community Reviews Highlight Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-[18px] font-bold text-[#151d19] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b45] text-[22px]">reviews</span>
              <span>Community Reviews & Trust Ratings</span>
            </h2>
            <p className="text-[13px] text-[#3e4942]">Verified testimonials from Tamil Nadu charity homes</p>
          </div>
          <button
            onClick={() => setPage('reviews')}
            className="btn-3d btn-3d-primary h-9 px-4 text-[12px] font-bold cursor-pointer"
          >
            <span>View All Reviews</span>
            <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
          </button>
        </div>

        <div className="card-3d rounded-3xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#d97706]">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
              <span className="font-headline font-extrabold text-[15px] text-[#151d19] ml-1.5">
                4.96 / 5.0 Rating
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#006b45] bg-[#ecf6ee] px-2.5 py-1 rounded-full border border-[#97f6c2]">
              FSSAI Section 31(2) Audited
            </span>
          </div>

          <p className="text-[15px] text-[#151d19] italic leading-relaxed">
            “During major wedding seasons in Madurai, FoodShare helped us distribute over 300 leaf meals daily directly to elderly care homes and student hostels. No food is ever thrown away.”
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Sundaram Chettiar"
                className="w-11 h-11 rounded-full object-cover border border-[#97f6c2]"
              />
              <div>
                <span className="font-headline font-bold text-[14px] text-[#151d19] block leading-tight">
                  Sundaram Chettiar
                </span>
                <span className="text-[12px] text-[#3e4942]">
                  Head Caterer, Sri Meenakshi Kalyana Mandapam, Madurai
                </span>
              </div>
            </div>

            <button
              onClick={() => setPage('reviews')}
              className="text-[12px] font-bold text-[#006b45] hover:underline flex items-center gap-1"
            >
              <span>See Donor Ratings</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Partners */}
        <div className="space-y-2 pt-2">
          <div className="text-center text-[11px] text-[#615e57] uppercase tracking-wider font-semibold">
            Tamil Nadu Rescue Network Partners
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-[#ecf6ee] border border-[#e1ebe3] flex flex-col items-center justify-center text-center p-1">
              <span className="material-symbols-outlined text-[18px] text-[#006b45]">diversity_1</span>
              <span className="text-[11px] font-semibold text-[#151d19] mt-0.5">Agara Foundation</span>
            </div>
            <div className="h-14 rounded-xl bg-[#ecf6ee] border border-[#e1ebe3] flex flex-col items-center justify-center text-center p-1">
              <span className="material-symbols-outlined text-[18px] text-[#875100]">temple_hindu</span>
              <span className="text-[11px] font-semibold text-[#151d19] mt-0.5">Kovil Annadhanam</span>
            </div>
            <div className="h-14 rounded-xl bg-[#ecf6ee] border border-[#e1ebe3] flex flex-col items-center justify-center text-center p-1">
              <span className="material-symbols-outlined text-[18px] text-[#151d19]">eco</span>
              <span className="text-[11px] font-semibold text-[#151d19] mt-0.5">Uzhavar Sandhai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Have Surplus Today Callout Banner */}
      <section className="rounded-3xl bg-[#006b45] p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
          <span className="material-symbols-outlined text-[140px]">spa</span>
        </div>
        <div className="relative space-y-3">
          <div className="space-y-1">
            <h3 className="font-headline font-bold text-[22px] text-white">Have Surplus Feast Today?</h3>
            <p className="text-[13px] text-white/90">
              Turn your wedding hall batches, tiffin prep, or temple prasadam into blessed community smiles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              onClick={handleDonateClick}
              className="btn-3d btn-3d-white w-full sm:flex-1 h-12 text-[14px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[20px] text-[#006b45]">add_circle</span>
              <span>Post a Donation {!isLoggedIn && '(Login)'}</span>
            </button>
            <button
              onClick={() => setPage('browse')}
              className="btn-3d btn-3d-secondary w-full sm:w-auto h-12 px-6 text-[13px] flex items-center justify-center cursor-pointer"
            >
              Browse Tamil Nadu Feeds
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
