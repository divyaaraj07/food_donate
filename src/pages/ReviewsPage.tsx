import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityReview } from '../types';

export const ReviewsPage: React.FC = () => {
  const {
    reviews,
    addReview,
    upvoteReview,
    donorReviewFilter,
    setDonorReviewFilter,
    setPage,
    isLoggedIn,
    userName,
    userOrg,
    userLocation
  } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  // Form State for Write Review Modal
  const [formData, setFormData] = useState({
    targetDonor: donorReviewFilter || 'Sri Meenakshi Kalyana Mandapam',
    dishRescued: 'Wedding Sambar Rice, Aviyal & Poori Trays',
    mealsServed: 100,
    authorName: userName || 'Anandhi R.',
    authorRole: 'Shelter Coordinator',
    organization: userOrg || 'Valarpirai Pasi Illa Shelter',
    district: 'Madurai',
    rating: 5,
    reviewText: '',
    freshness: 5,
    hygiene: 5,
    punctuality: 5,
    packaging: 5,
    photoUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80'
  });

  const districts = ['all', 'Madurai', 'Chennai', 'Coimbatore', 'Tiruchirappalli', 'Salem'];

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2)
    : '4.95';
  const totalMealsRescued = reviews.reduce((acc, r) => acc + (r.mealsServed || 0), 0);

  // Filter reviews
  const filteredReviews = reviews.filter(rev => {
    // Donor filter
    if (donorReviewFilter && rev.targetDonor.toLowerCase() !== donorReviewFilter.toLowerCase()) {
      return false;
    }
    // District filter
    if (selectedDistrict !== 'all' && rev.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        rev.targetDonor.toLowerCase().includes(q) ||
        rev.authorName.toLowerCase().includes(q) ||
        rev.organization.toLowerCase().includes(q) ||
        rev.dishRescued.toLowerCase().includes(q) ||
        rev.reviewText.toLowerCase().includes(q);
      if (!matchText) return false;
    }
    return true;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reviewText.trim()) return;

    addReview({
      authorName: formData.authorName,
      authorRole: formData.authorRole,
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      organization: formData.organization,
      targetDonor: formData.targetDonor,
      district: formData.district as any,
      rating: Number(formData.rating),
      dishRescued: formData.dishRescued,
      mealsServed: Number(formData.mealsServed),
      reviewText: formData.reviewText,
      fssaiVerified: true,
      verifiedRescue: true,
      photoUrl: formData.photoUrl,
      breakdown: {
        freshness: Number(formData.freshness),
        hygiene: Number(formData.hygiene),
        punctuality: Number(formData.punctuality),
        packaging: Number(formData.packaging)
      }
    });

    setIsWriteModalOpen(false);
    setFormData(prev => ({ ...prev, reviewText: '' }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-[#ecf6ee] p-6 sm:p-8 border border-[#e1ebe3] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dbe5dd] text-[12px] font-bold text-[#006b45]">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>COMMUNITY TRUST & REVIEWS</span>
            </div>
            <h1 className="font-headline text-[28px] sm:text-[36px] font-extrabold text-[#151d19] leading-tight">
              Verified Ratings & <br className="hidden sm:inline" />
              <span className="text-[#006b45]">AnnaSeva Rescue Feedback</span>
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#3e4942] leading-relaxed">
              Real feedback from Tamil Nadu shelter caretakers, NGO coordinators, and volunteers on food freshness, FSSAI temperature compliance, and kitchen punctuality.
            </p>
          </div>

          {/* 3D Action to Write Review */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setPage('auth');
                } else {
                  setIsWriteModalOpen(true);
                }
              }}
              className="btn-3d btn-3d-primary h-12 px-6 text-[14px] flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">rate_review</span>
              <span>Write a Review</span>
            </button>

            <button
              onClick={() => setPage('browse')}
              className="btn-3d btn-3d-secondary h-12 px-6 text-[14px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-[#006b45]">restaurant</span>
              <span>Browse Surplus</span>
            </button>
          </div>
        </div>

        {/* Rating KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#bec9c0]/50">
          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#e1ebe3]">
            <p className="text-[11px] font-semibold text-[#615e57] uppercase tracking-wider">Overall Trust</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-headline text-[26px] font-extrabold text-[#006b45]">{avgRating}</span>
              <span className="text-[13px] text-[#875100] font-bold">/ 5.0</span>
            </div>
            <p className="text-[11px] text-[#3e4942] mt-0.5 font-medium">★★★★★ 98% positive</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#e1ebe3]">
            <p className="text-[11px] font-semibold text-[#615e57] uppercase tracking-wider">Meals Rated</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-headline text-[26px] font-extrabold text-[#151d19]">
                {totalMealsRescued.toLocaleString()}+
              </span>
            </div>
            <p className="text-[11px] text-[#006b45] mt-0.5 font-medium">Banana leaf portions</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#e1ebe3]">
            <p className="text-[11px] font-semibold text-[#615e57] uppercase tracking-wider">FSSAI Hygiene</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-headline text-[26px] font-extrabold text-[#006b45]">4.98</span>
              <span className="text-[13px] text-[#875100] font-bold">/ 5.0</span>
            </div>
            <p className="text-[11px] text-[#3e4942] mt-0.5 font-medium">Sec. 31(2) compliant</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[#e1ebe3]">
            <p className="text-[11px] font-semibold text-[#615e57] uppercase tracking-wider">Verified Donors</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-headline text-[26px] font-extrabold text-[#151d19]">140+</span>
            </div>
            <p className="text-[11px] text-[#006b45] mt-0.5 font-medium">Mandapams & Kitchens</p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        {/* Active Donor Filter Banner */}
        {donorReviewFilter && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ffdcbb]/40 border border-[#ffb869] text-[#875100]">
            <div className="flex items-center gap-2 text-[14px] font-bold">
              <span className="material-symbols-outlined text-[20px]">filter_alt</span>
              <span>Showing reviews specifically for: <strong className="text-[#151d19]">{donorReviewFilter}</strong></span>
            </div>
            <button
              onClick={() => setDonorReviewFilter(null)}
              className="btn-3d btn-3d-secondary h-8 px-3 text-[12px] font-bold cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Search & District Selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#615e57]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Mandapam, shelter, dish (sambar, idli, biryani)..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-[#bec9c0] text-[14px] text-[#151d19] focus:outline-none focus:ring-2 focus:ring-[#006b45]/30 focus:border-[#006b45] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#615e57] hover:text-[#151d19]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* District Pill Bar (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {districts.map(d => {
              const isSelected = selectedDistrict === d;
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`btn-3d h-11 px-3.5 text-[12px] whitespace-nowrap transition-all ${
                    isSelected ? 'btn-3d-primary' : 'btn-3d-white text-[#3e4942]'
                  }`}
                >
                  {d === 'all' ? 'All Tamil Nadu' : d}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Feed List */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-[18px] font-bold text-[#151d19] flex items-center gap-2">
            <span>Community Rescue Logs & Reviews</span>
            <span className="text-[13px] font-semibold text-[#006b45]">({filteredReviews.length})</span>
          </h2>
          <span className="text-[12px] text-[#615e57] font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006b45]"></span>
            Audited under FSSAI Section 31(2)
          </span>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#e1ebe3] space-y-3">
            <span className="material-symbols-outlined text-[48px] text-[#bec9c0]">rate_review</span>
            <p className="font-headline font-bold text-[18px] text-[#151d19]">No reviews match this filter</p>
            <p className="text-[14px] text-[#615e57]">Try clearing search keywords or selecting another Tamil Nadu district.</p>
            <button
              onClick={() => {
                setSelectedDistrict('all');
                setSearchQuery('');
                setDonorReviewFilter(null);
              }}
              className="btn-3d btn-3d-secondary h-10 px-5 text-[13px] mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReviews.map(rev => (
            <article
              key={rev.id}
              className="card-3d rounded-3xl p-5 sm:p-6 space-y-4 transition-all"
            >
              {/* Header: Author & Target Donor */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.authorAvatar}
                    alt={rev.authorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#97f6c2] shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-headline font-bold text-[15px] text-[#151d19]">{rev.authorName}</h3>
                      <span className="text-[11px] font-semibold text-[#006b45] bg-[#ecf6ee] px-2 py-0.5 rounded-full">
                        {rev.authorRole}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#615e57] font-medium">
                      {rev.organization} · <span className="text-[#875100] font-semibold">{rev.district}, TN</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-1 text-right">
                  <div className="flex items-center gap-1 text-[#d97706]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="font-headline font-extrabold text-[15px] text-[#151d19] ml-1">
                      {rev.rating}.0
                    </span>
                  </div>
                  <span className="text-[11px] text-[#615e57]">{rev.date}</span>
                </div>
              </div>

              {/* Target Donor & Rescued Dish Banner */}
              <div className="p-3.5 rounded-2xl bg-[#f2fcf4] border border-[#dbe5dd] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#006b45]">
                    volunteer_activism
                  </span>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#615e57] tracking-wider">
                      Rescued from:
                    </span>
                    <p className="font-headline font-bold text-[14px] text-[#006b45]">
                      {rev.targetDonor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-medium text-[#151d19]">
                  <span className="px-2.5 py-1 rounded-xl bg-white border border-[#bec9c0] font-semibold text-[#875100]">
                    🍛 {rev.dishRescued}
                  </span>
                  <span className="px-2 py-1 rounded-xl bg-[#006b45] text-white font-bold text-[11px]">
                    {rev.mealsServed} Meals Served
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-[14px] sm:text-[15px] text-[#3e4942] leading-relaxed">
                "{rev.reviewText}"
              </p>

              {/* Attached Photo Evidence */}
              {rev.photoUrl && (
                <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#bec9c0]/50 shadow-inner group">
                  <img
                    src={rev.photoUrl}
                    alt={rev.dishRescued}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3.5">
                    <div className="flex items-center justify-between w-full text-white text-[12px]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px] text-[#7bd9a7]">photo_camera</span>
                        <span>Verified Meal Distribution Photo</span>
                      </span>
                      <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        FSSAI Inspected
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Breakdown Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#e1ebe3] text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-[#615e57]">Freshness & Taste</span>
                  <strong className="text-[#006b45]">{rev.breakdown.freshness} ★</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-[#615e57]">Kitchen Hygiene</span>
                  <strong className="text-[#006b45]">{rev.breakdown.hygiene} ★</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-[#615e57]">Thermal Packaging</span>
                  <strong className="text-[#006b45]">{rev.breakdown.packaging} ★</strong>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="text-[#615e57]">Handover Speed</span>
                  <strong className="text-[#006b45]">{rev.breakdown.punctuality} ★</strong>
                </div>
              </div>

              {/* Footer: Upvote Button & Action */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => upvoteReview(rev.id)}
                  className={`btn-3d h-9 px-3.5 text-[12px] font-bold gap-1.5 cursor-pointer ${
                    rev.hasUpvoted ? 'btn-3d-primary' : 'btn-3d-white text-[#3e4942]'
                  }`}
                  title="Mark this review as helpful"
                >
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                  <span>Helpful ({rev.upvotes})</span>
                </button>

                <button
                  onClick={() => {
                    setDonorReviewFilter(rev.targetDonor);
                    setPage('browse');
                  }}
                  className="text-[12px] font-bold text-[#006b45] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Donor Listings</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e1ebe3] space-y-4">
            <div className="flex items-center justify-between border-b border-[#e1ebe3] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#006b45]">rate_review</span>
                <h3 className="font-headline font-bold text-[18px] text-[#151d19]">
                  Write a Community Review
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-[#615e57]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                  Target Donor (Kalyana Mandapam or Kitchen)
                </label>
                <select
                  value={formData.targetDonor}
                  onChange={e => setFormData({ ...formData, targetDonor: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#bec9c0] text-[14px] text-[#151d19] font-medium"
                >
                  <option value="Sri Meenakshi Kalyana Mandapam">Sri Meenakshi Kalyana Mandapam (Madurai)</option>
                  <option value="Murugan Idli Shop & Tiffin Kitchen">Murugan Idli Shop (Chennai)</option>
                  <option value="Uzhavar Sandhai Farmers Hub">Uzhavar Sandhai Farmers Hub (Coimbatore)</option>
                  <option value="Anjappar Chettinad Grand Kitchen">Anjappar Chettinad Grand Kitchen (Chennai)</option>
                  <option value="Sree Annapoorna Kitchen">Sree Annapoorna Kitchen (Coimbatore)</option>
                  <option value="Srirangam Annadhanam Samithi">Srirangam Annadhanam Samithi (Trichy)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                    Tamil Nadu District
                  </label>
                  <select
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#bec9c0] text-[14px] text-[#151d19]"
                  >
                    <option value="Madurai">Madurai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Salem">Salem</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                    Meals Served
                  </label>
                  <input
                    type="number"
                    value={formData.mealsServed}
                    onChange={e => setFormData({ ...formData, mealsServed: Number(e.target.value) })}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#bec9c0] text-[14px] text-[#151d19]"
                    min={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                  Dish or Food Items Rescued
                </label>
                <input
                  type="text"
                  value={formData.dishRescued}
                  onChange={e => setFormData({ ...formData, dishRescued: e.target.value })}
                  placeholder="e.g. Sambar Sadham, Pooris, Aviyal"
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-[#bec9c0] text-[14px] text-[#151d19]"
                  required
                />
              </div>

              {/* Overall Star Rating Selector */}
              <div>
                <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                  Overall Rating ({formData.rating} Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-[#d97706] hover:scale-125 transition-transform cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[32px]"
                        style={{ fontVariationSettings: star <= formData.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#3e4942] uppercase mb-1">
                  Your Detailed Community Feedback
                </label>
                <textarea
                  rows={4}
                  value={formData.reviewText}
                  onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                  placeholder="Describe food freshness, temperature at handover, packaging condition, and how it helped the shelter or community."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-[#bec9c0] text-[14px] text-[#151d19] focus:outline-none focus:ring-2 focus:ring-[#006b45]"
                  required
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#ecf6ee] border border-[#97f6c2] text-[12px] text-[#006b45] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>FSSAI Section 31(2) Surplus Food Compliance will be linked to this review.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="btn-3d btn-3d-secondary h-11 px-5 text-[14px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d btn-3d-primary h-11 px-6 text-[14px] flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
