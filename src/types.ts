export type UserRole = 'donor' | 'recipient' | 'admin';

export type AppPage =
  | 'home'
  | 'browse'
  | 'details'
  | 'donate'
  | 'reviews'
  | 'activity'
  | 'dashboard'
  | 'admin'
  | 'auth';

export interface ReviewRatingBreakdown {
  freshness: number;
  hygiene: number;
  punctuality: number;
  packaging: number;
}

export interface CommunityReview {
  id: string;
  authorName: string;
  authorRole: string; // e.g., 'NGO Rescue Coordinator', 'Shelter Caretaker', 'Community Volunteer'
  authorAvatar: string;
  organization: string; // e.g., 'Agara Foundation Madurai', 'Srirangam Annadhanam'
  targetDonor: string; // e.g., 'Sri Meenakshi Kalyana Mandapam', 'Murugan Idli Shop'
  district: string; // 'Madurai' | 'Chennai' | 'Coimbatore' | 'Tiruchirappalli' | 'Salem'
  rating: number; // 1 to 5
  date: string;
  dishRescued: string;
  mealsServed: number;
  reviewText: string;
  fssaiVerified: boolean;
  verifiedRescue: boolean;
  upvotes: number;
  hasUpvoted?: boolean;
  photoUrl?: string;
  breakdown: ReviewRatingBreakdown;
}

export interface DonorInfo {
  name: string;
  avatar: string;
  rating: number;
  rescuesCompleted: number;
  verified: boolean;
  address: string;
  city?: string;
  phone: string;
  contactPerson: string;
  dockInstructions: string;
  fssaiNumber?: string;
}

export interface FoodListing {
  id: string;
  title: string;
  donor: DonorInfo;
  category: 'Prepared Meals' | 'Fresh Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry';
  isPureVeg?: boolean;
  quantity: number;
  unit: string;
  portionsText: string;
  imageUrl: string;
  urgent: boolean;
  expiryTime: string;
  expiresInText: string;
  isAvailable: boolean;
  batchDetails: string;
  dietaryTags: string[];
  allergenNotice?: string;
  distance: string;
  pickupWindow: string;
  claimedQuantity?: number;
  createdAt: string;
}

export interface IncomingRequest {
  id: string;
  listingId: string;
  recipientName: string;
  requestedItem: string;
  timeAgo: string;
  pickupTime: string;
  volunteerOrMethod: string;
  imageUrl: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface AdminReport {
  id: string;
  ticketNumber: string;
  type: 'SAFETY RISK' | 'RESERVATION NO-SHOW';
  title: string;
  reportedBy: string;
  donorIdentity: string;
  detail: string;
  timeAgo: string;
  imageUrl?: string;
  batchNumber?: string;
  status: 'open' | 'dismissed' | 'removed';
}

export interface NGOVerification {
  id: string;
  orgName: string;
  location: string;
  registeredTime: string;
  taxStatus: string;
  ein: string;
  coldStorageCapacity: string;
  documentName: string;
  docSize: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface RecentRescue {
  id: string;
  title: string;
  dateStr: string;
  source: string;
  category: 'produce' | 'prepared' | 'dairy' | 'bakery';
  status: 'completed';
}
