import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const DonatePage: React.FC = () => {
  const { createListing, showToast, isLoggedIn, setPage, userOrg, userLocation } = useApp();

  const [title, setTitle] = useState('Kalyana Mandapam Sambar Rice, Kurma & Poori Trays');
  const [category, setCategory] = useState<'Prepared Meals' | 'Fresh Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry'>('Prepared Meals');
  const [quantity, setQuantity] = useState(120);
  const [unit, setUnit] = useState('Banana leaf portions');
  const [description, setDescription] = useState(
    'Freshly prepared Tamil wedding feast surplus with Ponni rice, fresh drumstick shallot sambar, potato vegetable kurma, and hot pooris. Kept in clean hot-insulation containers.'
  );
  const [tags, setTags] = useState<string[]>(['Pure Veg (100%)', 'Nut-Free', 'FSSAI Certified', 'Hot Insulation']);
  const [pickupDate] = useState('Today, Oct 28');
  const [pickupTime, setPickupTime] = useState('7:30 PM');
  const [location, setLocation] = useState(userLocation || 'Near Mattuthavani Bus Stand, Madurai');
  const [instructions, setInstructions] = useState('Bring clean transport vessels to Kitchen Gate #2. Ample van parking inside compound.');
  const [fssaiLicense, setFssaiLicense] = useState('FSSAI #12419008000412');
  const [isPureVeg, setIsPureVeg] = useState(true);
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user somehow accesses donate without being logged in, render authentication gate
  if (!isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4 text-center space-y-4 animate-in fade-in duration-200">
        <div className="w-16 h-16 rounded-full bg-[#ffdcbb] text-[#875100] flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-[32px]">lock</span>
        </div>
        <h2 className="font-headline font-bold text-[22px] text-[#151d19]">
          Donor Authentication Required
        </h2>
        <p className="text-[14px] text-[#3e4942] leading-relaxed">
          Vanakkam! To ensure food safety and regulatory compliance under FSSAI norms, only registered food donors (Kalyana Mandapams, Restaurants, Caterers) can publish surplus listings.
        </p>
        <button
          onClick={() => setPage('auth')}
          className="btn-3d btn-3d-primary h-12 px-6 text-[14px] font-bold shadow-md cursor-pointer"
        >
          Sign In or Register as Donor
        </button>
      </div>
    );
  }

  const availableTags = [
    'Pure Veg (100%)',
    'Nut-Free',
    'FSSAI Certified',
    'Hot Insulation',
    'Gluten-Free',
    'Kovil Prasadam'
  ];

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      showToast('Photo uploaded! AI tagged: Traditional meals, Sambar, Ponni rice', 'auto_awesome');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a food donation title', 'warning', 'warning');
      return;
    }
    if (!pledgeChecked) {
      showToast('Please acknowledge the FSSAI Food Safety Pledge', 'error', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createListing({
        title,
        category,
        isPureVeg,
        quantity,
        unit,
        portionsText: `${quantity} ${unit} • Feeds ~${quantity} people`,
        imageUrl: photoPreview,
        urgent: true,
        expiryTime: pickupTime,
        expiresInText: 'Must collect within 2 hrs 30 mins',
        isAvailable: true,
        batchDetails: description,
        dietaryTags: tags,
        allergenNotice: 'Contains mustard, perungayam (asafoetida), and lentils.',
        distance: '1.2 km away',
        pickupWindow: `${pickupDate}, until ${pickupTime}`,
        donor: {
          name: userOrg || 'Sri Meenakshi Kalyana Mandapam',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk',
          rating: 4.96,
          rescuesCompleted: 143,
          verified: true,
          address: location,
          city: location.includes(',') ? location.split(',')[1] : 'Tamil Nadu',
          phone: '+91 94432 18920',
          contactPerson: 'Sundaram Chettiar',
          dockInstructions: instructions,
          fssaiNumber: fssaiLicense
        }
      });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto pb-10 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-2 pt-1">
        <div className="flex flex-col">
          <h1 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#151d19]">
            Publish Food Donation
          </h1>
          <span className="text-[13px] text-[#006b45] font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#006b45] animate-pulse"></span>
            Tamil Nadu AnnaSeva Listing Portal (Verified Donor: {userOrg})
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#e6f0e8] px-3 py-1 rounded-full border border-[#dbe5dd]">
          <span className="material-symbols-outlined text-[16px] text-[#006b45]" style={{ fontVariationSettings: "'FILL' 1" }}>
            eco
          </span>
          <span className="text-[12px] text-[#3e4942] font-bold">+50 Seva Impact</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#e6f0e8] rounded-full overflow-hidden mb-6 shadow-xs">
        <div className="h-full bg-[#21865b] rounded-full w-3/4 transition-all duration-500"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Food Photo Section */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-bold text-[#151d19]">
              Feast / Food Photo <span className="text-[#875100]">*</span>
            </label>
            <span className="text-[12px] text-[#615e57]">FSSAI Quality Verified</span>
          </div>

          <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-[#ecf6ee] hover:bg-[#e6f0e8] border-2 border-dashed border-[#bec9c0] transition-all p-5 flex flex-col items-center justify-center text-center shadow-xs">
            {photoPreview ? (
              <div className="w-full h-44 rounded-xl overflow-hidden relative mb-2">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[13px] font-bold">
                  Tap to change photo
                </div>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#dbe5dd] flex items-center justify-center text-[#006b45] mb-2 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[30px]">photo_camera</span>
              </div>
            )}

            <p className="font-headline text-[15px] text-[#151d19] font-bold">
              {photoPreview ? 'Change Photo or Retake' : 'Tap to take photo of surplus food'}
            </p>
            <p className="text-[12px] text-[#615e57] mt-0.5">
              Required for volunteer pickup verification & shelter safety review
            </p>

            <div className="mt-2.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#bec9c0]">
              <span className="material-symbols-outlined text-[15px] text-[#875100]">auto_awesome</span>
              <span className="text-[11px] text-[#3e4942] font-semibold">AI Auto-Tagging Enabled</span>
            </div>

            <input
              type="file"
              accept="image/*"
              aria-label="Upload photo"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="food-title" className="text-[14px] font-bold text-[#151d19]">
            Food Item Title <span className="text-[#875100]">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#6e7a71] text-[20px]">
              restaurant
            </span>
            <input
              id="food-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Kalyana Mandapam Sambar Rice & Poori"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-[#151d19] text-[14px] shadow-xs border border-[#e1ebe3] focus:border-[#006b45] outline-none"
            />
          </div>
        </div>

        {/* Category & Pure Veg Switch */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">
              Category <span className="text-[#875100]">*</span>
            </span>
            <button
              type="button"
              onClick={() => setIsPureVeg(!isPureVeg)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold border transition-colors cursor-pointer ${
                isPureVeg
                  ? 'bg-[#ecf6ee] text-[#006b45] border-[#006b45]'
                  : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isPureVeg ? '#006b45' : '#ba1a1a' }}></span>
              <span>{isPureVeg ? '100% Pure Veg (FSSAI)' : 'Contains Non-Veg'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {[
              { id: 'Prepared Meals', emoji: '🍲', label: 'Feast & Meals' },
              { id: 'Bakery', emoji: '🥟', label: 'Tiffin & Bakery' },
              { id: 'Fresh Produce', emoji: '🥬', label: 'Farm Produce' },
              { id: 'Dairy', emoji: '🥛', label: 'Aavin Dairy' },
              { id: 'Canned/Dry', emoji: '🥫', label: 'Rice & Provisions' }
            ].map(cat => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#21865b] text-white shadow-xs'
                      : 'bg-[#ecf6ee] text-[#3e4942] hover:bg-[#e6f0e8] border border-[#e1ebe3]'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity & Volume */}
        <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col gap-3 border border-[#e1ebe3]">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-bold text-[#151d19]">Quantity & Feeding Capacity</span>
            <span className="text-[12px] text-[#006b45] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              Feeds ~{quantity} people
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#6e7a71] text-[20px]">
                pin
              </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full h-12 pl-11 pr-3 rounded-xl bg-white text-[#151d19] text-[14px] font-semibold shadow-xs border border-[#e1ebe3] outline-none"
              />
            </div>
            <div className="relative flex items-center">
              <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
                aria-label="Unit of measure"
                className="w-full h-12 px-3.5 pr-8 rounded-xl bg-white text-[#151d19] text-[13px] font-medium shadow-xs border border-[#e1ebe3] outline-none appearance-none cursor-pointer"
              >
                <option>Banana leaf portions</option>
                <option>Stainless steel containers</option>
                <option>Boxes / Packets</option>
                <option>Kilograms (kg)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-[#6e7a71] text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="food-description" className="text-[14px] font-bold text-[#151d19]">
            Batch Description & Cooking Timestamp
          </label>
          <textarea
            id="food-description"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe dishes, Ponni rice, sambar, cooking time, thermal storage..."
            className="w-full p-3.5 rounded-xl bg-white text-[#151d19] text-[14px] shadow-xs border border-[#e1ebe3] outline-none resize-none focus:border-[#006b45]"
          />
        </div>

        {/* Dietary & Storage Tags */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">Dietary & Compliance Badges</span>
            <span className="text-[12px] text-[#615e57]">Tap to toggle</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {availableTags.map(tag => {
              const active = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#21865b] text-white shadow-xs'
                      : 'bg-[#ecf6ee] text-[#3e4942] hover:bg-[#e6f0e8] border border-[#e1ebe3]'
                  }`}
                >
                  {active && <span className="material-symbols-outlined text-[15px]">check</span>}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pickup & Expiry Window */}
        <div className="bg-[#ecf6ee] p-4 rounded-2xl flex flex-col gap-3 border border-[#e1ebe3]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#151d19]">Pickup Deadline & Expiry Window</span>
            <span className="material-symbols-outlined text-[#875100] text-[20px]">schedule</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#6e7a71] text-[18px]">
                calendar_today
              </span>
              <input
                type="text"
                readOnly
                value={pickupDate}
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-white text-[#151d19] text-[13px] font-semibold border border-[#e1ebe3] outline-none"
              />
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#6e7a71] text-[18px]">
                alarm
              </span>
              <input
                type="text"
                value={pickupTime}
                onChange={e => setPickupTime(e.target.value)}
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-white text-[#151d19] text-[13px] font-semibold border border-[#e1ebe3] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#ffdcbb] text-[#2b1700]">
            <span className="material-symbols-outlined text-[20px] text-[#a96700] animate-pulse">
              timer
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#a96700]">Urgent Expiry: 2h 30m remaining</span>
              <span className="text-[11px] text-[#653e00]">
                Automatically alerted to verified night shelters and orphanages across Tamil Nadu.
              </span>
            </div>
          </div>
        </div>

        {/* Location & FSSAI License */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[14px] font-bold text-[#151d19]">Venue Address & FSSAI License</span>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#6e7a71] text-[20px]">
              pin_drop
            </span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-[#151d19] text-[14px] border border-[#e1ebe3] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#6e7a71] text-[18px]">
                verified
              </span>
              <input
                type="text"
                value={fssaiLicense}
                onChange={e => setFssaiLicense(e.target.value)}
                placeholder="FSSAI License Number"
                className="w-full h-12 pl-10 pr-3 rounded-xl bg-white text-[#151d19] text-[12px] border border-[#e1ebe3] outline-none"
              />
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#6e7a71] text-[18px]">
                doorbell
              </span>
              <input
                type="text"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="Dispatch gate / instructions"
                className="w-full h-12 pl-10 pr-3 rounded-xl bg-white text-[#151d19] text-[12px] border border-[#e1ebe3] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Safety Pledge Checkbox */}
        <div
          onClick={() => setPledgeChecked(!pledgeChecked)}
          className="bg-white p-4 rounded-2xl flex items-start gap-3 border border-[#e1ebe3] cursor-pointer hover:bg-[#f2fcf4] transition-colors select-none"
        >
          <input
            type="checkbox"
            checked={pledgeChecked}
            onChange={() => {}}
            className="mt-1 w-5 h-5 rounded text-[#006b45] accent-[#006b45] cursor-pointer"
          />
          <div className="text-[13px] text-[#3e4942]">
            <strong className="text-[#151d19] font-bold block mb-0.5">
              Tamil Nadu Food Safety & Quality Pledge
            </strong>
            I confirm this food has been prepared hygienically in compliance with FSSAI regulations and Section 31(2) of the Food Safety & Standards Surplus Regulations 2019.
          </div>
        </div>

        {/* 3D Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-3d btn-3d-primary w-full h-13 text-[15px] font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isSubmitting ? 'refresh' : 'publish'}
            </span>
            <span>{isSubmitting ? 'Broadcasting to Tamil Nadu Network...' : 'Publish Food Donation'}</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Draft saved to your pending listings queue', 'bookmark', 'info')}
            className="btn-3d btn-3d-secondary w-full h-12 text-[14px] font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#615e57]">bookmark</span>
            <span>Save as Draft</span>
          </button>
        </div>
      </form>
    </div>
  );
};
