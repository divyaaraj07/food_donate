import { FoodListing, IncomingRequest, AdminReport, NGOVerification, RecentRescue, CommunityReview } from '../types';

export const INITIAL_LISTINGS: FoodListing[] = [
  {
    id: 'listing-1',
    title: 'Kalyana Mandapam Sambar Rice, Kurma & Poori Trays',
    donor: {
      name: 'Sri Meenakshi Kalyana Mandapam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: 4.96,
      rescuesCompleted: 142,
      verified: true,
      address: 'Near Mattuthavani Bus Stand, Ring Road, Madurai',
      city: 'Madurai, Tamil Nadu',
      phone: '+91 94432 18920',
      contactPerson: 'Sundaram Chettiar (Head Caterer)',
      dockInstructions: 'Bring clean transport vessels to Kitchen Gate #2. Ample van parking inside kalyana mandapam compound.',
      fssaiNumber: '12419008000412'
    },
    category: 'Prepared Meals',
    isPureVeg: true,
    quantity: 120,
    unit: 'banana leaf portions',
    portionsText: '120 boxed meals • Feeds ~120 adults',
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80',
    urgent: true,
    expiryTime: '7:30 PM',
    expiresInText: 'Must be collected within 2 hrs 15 mins',
    isAvailable: true,
    batchDetails: 'Traditional Tamil wedding feast surplus prepared with Ponni rice, fresh drumstick-shallot sambar, potato vegetable kurma, and hot pooris. Stored in hot insulation cambros since 2:30 PM wedding feast.',
    dietaryTags: ['Pure Veg (100%)', 'Nut-Free', 'FSSAI Certified', 'Hot Insulation'],
    allergenNotice: 'Contains mustard seeds, asafoetida (perungayam), and wheat (pooris). Prepared in a pure vegetarian Brahmin kitchen.',
    distance: '1.4 km from Mattuthavani',
    pickupWindow: 'Today, 5:00 PM – 7:30 PM',
    createdAt: 'Today, 2:45 PM'
  },
  {
    id: 'listing-2',
    title: 'Murugan Style Fresh Steamed Idlis & Medu Vadas',
    donor: {
      name: 'Murugan Idli Shop & Tiffin Kitchen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      rating: 4.92,
      rescuesCompleted: 110,
      verified: true,
      address: '2nd Avenue, Anna Nagar West, Chennai',
      city: 'Chennai, Tamil Nadu',
      phone: '+91 98401 55670',
      contactPerson: 'Murugan Swamy',
      dockInstructions: 'Rear alley parcel counter. Ring kitchen buzzer for FoodShare AnnaSeva pickup.',
      fssaiNumber: '12418002000889'
    },
    category: 'Prepared Meals',
    isPureVeg: true,
    quantity: 60,
    unit: 'idli packets',
    portionsText: '60 packets (4 idlis + 1 vada each)',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    urgent: true,
    expiryTime: '8:00 PM',
    expiresInText: 'Urgent: 2h left',
    isAvailable: true,
    batchDetails: 'Soft jasmine-grain steamed idlis and crispy medu vadas. Packed hygienically with coconut podi and thakkali (tomato) chutney containers.',
    dietaryTags: ['Pure Veg', 'Gluten-Free Idlis', 'Steamed Fresh', 'No Preservatives'],
    allergenNotice: 'Vada contains urad dal and black pepper. Chutney contains fresh coconut.',
    distance: '0.8 km from Anna Nagar Roundtana',
    pickupWindow: 'Today, 5:30 PM – 8:00 PM',
    createdAt: 'Today, 3:30 PM'
  },
  {
    id: 'listing-3',
    title: 'Fresh Nilgiri Carrots, Beans & Farm Greens',
    donor: {
      name: 'Uzhavar Sandhai Farmers Hub',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      rating: 4.88,
      rescuesCompleted: 85,
      verified: true,
      address: 'DB Road, RS Puram, Coimbatore',
      city: 'Coimbatore, Tamil Nadu',
      phone: '+91 97890 23411',
      contactPerson: 'Palanisamy (Farmer Secretary)',
      dockInstructions: 'Loading Platform Stall #14, direct vehicle loading area.',
      fssaiNumber: '12421004000301'
    },
    category: 'Fresh Produce',
    isPureVeg: true,
    quantity: 45,
    unit: 'kg',
    portionsText: '45 kg fresh hill produce • 4 wooden crates',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    urgent: false,
    expiryTime: '9:30 PM',
    expiresInText: 'Available: 5h left',
    isAvailable: true,
    batchDetails: 'Crisp organic Nilgiri Ooty carrots, green French beans, cabbage, and fresh coriander harvested today morning. Ready for soup kitchens and charitable community pantries.',
    dietaryTags: ['100% Organic', 'Raw Farm Harvest', 'Pesticide-Free'],
    distance: '1.2 km from RS Puram',
    pickupWindow: 'Today until 9:30 PM',
    createdAt: 'Today, 11:30 AM'
  },
  {
    id: 'listing-4',
    title: 'Chettinad Veg Dum Biryani & Seeraga Samba Bowls',
    donor: {
      name: 'Anjappar Chettinad Grand Kitchen',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      rescuesCompleted: 98,
      verified: true,
      address: 'Usman Road, T. Nagar, Chennai',
      city: 'Chennai, Tamil Nadu',
      phone: '+91 98411 90872',
      contactPerson: 'Chef Meenakshi Sundaram',
      dockInstructions: 'Rear dispatch door next to Panagal Park signal.',
      fssaiNumber: '12417001000672'
    },
    category: 'Prepared Meals',
    isPureVeg: true,
    quantity: 35,
    unit: 'boxes',
    portionsText: '35 boxed meals • Seeraga Samba rice',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    urgent: true,
    expiryTime: '7:00 PM',
    expiresInText: 'Must pick up by 7:00 PM',
    isAvailable: true,
    batchDetails: 'Aromatic traditional Seeraga Samba rice cooked with whole spices, star anise, baby potatoes, green peas, and mint. Packed in food-grade compostable foil boxes.',
    dietaryTags: ['Pure Veg', 'Freshly Prepared', 'Nut-Free', 'FSSAI Verified'],
    allergenNotice: 'Contains whole spices and ghee.',
    distance: '1.8 km from Panagal Park',
    pickupWindow: 'Today by 7:00 PM',
    createdAt: 'Today, 1:15 PM'
  },
  {
    id: 'listing-5',
    title: 'Sree Annapoorna Hot Rava Kichadi & Coconut Chutney',
    donor: {
      name: 'Sree Annapoorna Kitchen',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      rating: 4.95,
      rescuesCompleted: 78,
      verified: true,
      address: 'Gandhipuram Central, Coimbatore',
      city: 'Coimbatore, Tamil Nadu',
      phone: '+91 98422 41109',
      contactPerson: 'Rangaswamy (Supervisor)',
      dockInstructions: 'Side delivery gate opposite Gandhipuram bus terminus.',
      fssaiNumber: '12420005000714'
    },
    category: 'Prepared Meals',
    isPureVeg: true,
    quantity: 50,
    unit: 'packets',
    portionsText: '50 packets tiffin with chutney',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    urgent: false,
    expiryTime: '8:30 PM',
    expiresInText: 'Expires in 3h 40m',
    isAvailable: true,
    batchDetails: 'Traditional roasted sooji kichadi tempered with mustard seeds, curry leaves, ginger, cashews, and fresh ghee. Accompanied by fresh coconut coriander chutney.',
    dietaryTags: ['Pure Veg', 'Ghee Tempered', 'Hot Packed'],
    distance: '0.9 km from Gandhipuram',
    pickupWindow: 'Today until 8:30 PM',
    createdAt: 'Today, 4:00 PM'
  },
  {
    id: 'listing-6',
    title: 'Srirangam Kovil Prasadam Puliyodharai & Curd Rice',
    donor: {
      name: 'Srirangam Annadhanam Samithi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: 4.98,
      rescuesCompleted: 165,
      verified: true,
      address: 'North Chithirai Street, Srirangam, Trichy',
      city: 'Tiruchirappalli, Tamil Nadu',
      phone: '+91 94431 87600',
      contactPerson: 'Rangarajan Iyengar',
      dockInstructions: 'Temple Annadhanam Mandapam Kitchen back door. Bring insulated storage drums.',
      fssaiNumber: '12416003000109'
    },
    category: 'Prepared Meals',
    isPureVeg: true,
    quantity: 80,
    unit: 'portions',
    portionsText: '80 temple prasadam portions',
    imageUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=1200&q=80',
    urgent: false,
    expiryTime: '9:00 PM',
    expiresInText: 'Expires in 4h 15m',
    isAvailable: true,
    batchDetails: 'Sacred temple Annadhanam surplus: authentic tangy tamarind rice cooked with sesame oil, fenugreek, and roasted peanuts, plus soothing curd rice with pomegranate arils.',
    dietaryTags: ['Pure Veg (No Onion No Garlic)', 'Sattvic Prasadam', 'Gingelly Oil'],
    distance: '0.6 km from Rajagopuram',
    pickupWindow: 'Today until 9:00 PM',
    createdAt: 'Today, 3:00 PM'
  }
];

export const INITIAL_REQUESTS: IncomingRequest[] = [
  {
    id: 'req-1',
    listingId: 'listing-1',
    recipientName: 'Agara Foundation Chennai Shelter',
    requestedItem: '120 Kalyana Mandapam Meals',
    timeAgo: '10m ago',
    pickupTime: 'Today, 5:45 PM',
    volunteerOrMethod: 'Vol: David S. (Van TN-09-CB-4210)',
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    status: 'pending'
  },
  {
    id: 'req-2',
    listingId: 'listing-2',
    recipientName: 'Madurai Valarpirai Food Pantry',
    requestedItem: '60 Idli Tiffin Packets',
    timeAgo: '28m ago',
    pickupTime: 'Today by 6:30 PM',
    volunteerOrMethod: 'Self-Transport E-Auto',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    status: 'pending'
  }
];

export const INITIAL_COMMUNITY_REVIEWS: CommunityReview[] = [
  {
    id: 'rev-1',
    authorName: 'Revathi Krishnan',
    authorRole: 'Shelter Director',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    organization: 'Valarpirai Children & Elders Shelter',
    targetDonor: 'Sri Meenakshi Kalyana Mandapam',
    district: 'Madurai',
    rating: 5,
    date: 'Yesterday, 8:15 PM',
    dishRescued: 'Wedding Sambar Rice, Aviyal & Poori Trays',
    mealsServed: 140,
    reviewText: 'The wedding feast surplus arrived piping hot in heavy-duty food-grade insulated cambros at 4:30 PM. Sundaram Chettiar personally oversaw the van loading at Kitchen Gate #2. 140 residents had a wholesome feast. Spotless hygiene and proper FSSAI Section 31(2) documentation.',
    fssaiVerified: true,
    verifiedRescue: true,
    upvotes: 42,
    hasUpvoted: false,
    photoUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    breakdown: {
      freshness: 5.0,
      hygiene: 5.0,
      punctuality: 4.9,
      packaging: 5.0
    }
  },
  {
    id: 'rev-2',
    authorName: 'David Sundaram',
    authorRole: 'NGO Rescue Coordinator',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    organization: 'Agara Foundation Tamil Nadu',
    targetDonor: 'Murugan Idli Shop & Tiffin Kitchen',
    district: 'Chennai',
    rating: 5,
    date: '2 days ago',
    dishRescued: 'Steamed Idlis & Medu Vadas with Chutney',
    mealsServed: 65,
    reviewText: 'Murugan Idli Shop sets the golden standard in Chennai. 60 packets with 4 jasmine-soft idlis and crispy vadas were ready right at the rear alley counter. Delivered along Central Station night shelters within 40 minutes. Zero food waste!',
    fssaiVerified: true,
    verifiedRescue: true,
    upvotes: 38,
    hasUpvoted: true,
    photoUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    breakdown: {
      freshness: 5.0,
      hygiene: 4.9,
      punctuality: 5.0,
      packaging: 4.8
    }
  },
  {
    id: 'rev-3',
    authorName: 'K. Balasubramanian',
    authorRole: 'Community Kitchen Manager',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    organization: 'Coimbatore Green Leaf Pasi Illa Kitchen',
    targetDonor: 'Uzhavar Sandhai Farmers Hub',
    district: 'Coimbatore',
    rating: 5,
    date: '3 days ago',
    dishRescued: '45 kg Nilgiri Ooty Carrots & French Beans',
    mealsServed: 210,
    reviewText: 'Farmers at DB Road Uzhavar Sandhai donated 4 crates of unblemished hill produce that would have otherwise gone to market discard. Used them for cooking nutritious sambar and vegetable kootu for over 200 daily wage families.',
    fssaiVerified: true,
    verifiedRescue: true,
    upvotes: 29,
    hasUpvoted: false,
    photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    breakdown: {
      freshness: 5.0,
      hygiene: 4.8,
      punctuality: 4.7,
      packaging: 4.9
    }
  },
  {
    id: 'rev-4',
    authorName: 'Anitha Ramanathan',
    authorRole: 'Annadhanam Trust Volunteer',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    organization: 'Srirangam Temple Annadhana Trust',
    targetDonor: 'Srirangam Kovil Annadhanam Samithi',
    district: 'Tiruchirappalli',
    rating: 5,
    date: '4 days ago',
    dishRescued: '80 Pots Ghee Puliyodharai Prasadam',
    mealsServed: 95,
    reviewText: 'Pure sattvic kovil prasadam made with gingelly oil, mustard, and roasted peanuts. It was sealed with sacred devotion and distributed to pilgrims and homeless patients near Trichy Government Hospital. Divine taste and flawless purity.',
    fssaiVerified: true,
    verifiedRescue: true,
    upvotes: 56,
    hasUpvoted: false,
    photoUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80',
    breakdown: {
      freshness: 5.0,
      hygiene: 5.0,
      punctuality: 4.9,
      packaging: 4.9
    }
  },
  {
    id: 'rev-5',
    authorName: 'Dr. Senthamizhan',
    authorRole: 'Food Safety Officer & Relief Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    organization: 'Chennai City Relief Coalition',
    targetDonor: 'Anjappar Chettinad Grand Kitchen',
    district: 'Chennai',
    rating: 4.9,
    date: '5 days ago',
    dishRescued: 'Chettinad Veg Dum Biryani & Seeraga Samba Bowls',
    mealsServed: 40,
    reviewText: 'Tamper-evident food boxes with clear time-of-cooking stickers. The Seeraga Samba rice aroma was superb and temperatures were maintained above 60°C until pickup. Highly recommend this donor to all Chennai NGOs.',
    fssaiVerified: true,
    verifiedRescue: true,
    upvotes: 31,
    hasUpvoted: false,
    photoUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    breakdown: {
      freshness: 4.9,
      hygiene: 5.0,
      punctuality: 4.8,
      packaging: 5.0
    }
  }
];

export const INITIAL_ADMIN_REPORTS: AdminReport[] = [
  {
    id: 'report-1',
    ticketNumber: 'TN-9021',
    type: 'SAFETY RISK',
    title: 'Unlabeled Prepared Gravy Batch',
    reportedBy: 'Agara Foundation Chennai',
    donorIdentity: 'Catering Unit #49 (Guindy)',
    detail: 'Missing mandatory FSSAI timestamp label and arrived warm without thermal insulation box beyond the 2-hour window.',
    timeAgo: '4m ago',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    batchNumber: '#TN-309',
    status: 'open'
  },
  {
    id: 'report-2',
    ticketNumber: 'TN-9018',
    type: 'RESERVATION NO-SHOW',
    title: 'Unclaimed 35x Sourdough & Rusk Packs',
    reportedBy: 'Iyengar Traditional Bakery (Trichy)',
    donorIdentity: 'Trichy Volunteer Driver #12',
    detail: 'Reported by Iyengar Bakery near Srirangam. Assigned volunteer driver delayed; surplus needs immediate re-dispatch.',
    timeAgo: '38m ago',
    status: 'open'
  }
];

export const INITIAL_NGO_VERIFICATIONS: NGOVerification[] = [
  {
    id: 'ngo-1',
    orgName: 'Madurai Pasi Illa Valarpirai Shelter',
    location: 'Mattuthavani, Madurai, TN',
    registeredTime: '2 hours ago',
    taxStatus: '12A & 80G Registered NGO Trust',
    ein: 'DARPAN #TN/2021/0291039',
    coldStorageCapacity: '2 Deep Freezers + 1 Milk Chiller',
    documentName: 'TamilNadu_Trust_Deed_80G.pdf',
    docSize: '1.4 MB',
    status: 'pending'
  },
  {
    id: 'ngo-2',
    orgName: 'Chennai Annadhana Seva Samithi',
    location: 'Mylapore, Chennai, TN',
    registeredTime: '1 day ago',
    taxStatus: 'Registered Religious & Charitable Trust',
    ein: 'DARPAN #TN/2019/0182441',
    coldStorageCapacity: 'Walk-in Chiller + Stainless Steel Drums',
    documentName: 'FSSAI_Food_Safety_Inspection.pdf',
    docSize: '2.1 MB',
    status: 'pending'
  }
];

export const INITIAL_RECENT_RESCUES: RecentRescue[] = [
  {
    id: 'rescue-1',
    title: '80 kg Kodaikanal Pears & Apples',
    dateStr: 'Yesterday',
    source: 'Dindigul Farmers Market',
    category: 'produce',
    status: 'completed'
  },
  {
    id: 'rescue-2',
    title: '150 Boxed Tamarind & Curd Rice Meals',
    dateStr: '2 days ago',
    source: 'Kapaleeshwarar Kovil Prasadam',
    category: 'prepared',
    status: 'completed'
  },
  {
    id: 'rescue-3',
    title: '40 Litres Aavin Pasteurized Milk',
    dateStr: '3 days ago',
    source: 'Salem Dairy Cooperative',
    category: 'dairy',
    status: 'completed'
  }
];
