import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AppPage,
  FoodListing,
  IncomingRequest,
  AdminReport,
  NGOVerification,
  RecentRescue,
  CommunityReview
} from '../types';
import {
  INITIAL_LISTINGS,
  INITIAL_REQUESTS,
  INITIAL_ADMIN_REPORTS,
  INITIAL_NGO_VERIFICATIONS,
  INITIAL_RECENT_RESCUES,
  INITIAL_COMMUNITY_REVIEWS
} from '../data/initialData';

export interface ToastState {
  id: number;
  message: string;
  icon?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export interface FirewallLog {
  id: string;
  timestamp: string;
  ip: string;
  path: string;
  method: string;
  threatType: string;
  action: 'BLOCKED' | 'FLAGGED' | 'ALLOWED';
  details: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  blockedCount: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  page: AppPage;
  setPage: (page: AppPage, listingId?: string) => void;
  selectedListingId: string;
  setSelectedListingId: (id: string) => void;
  selectedListing: FoodListing | undefined;

  // Listings
  listings: FoodListing[];
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  claimListing: (listingId: string, quantity?: number) => void;
  createListing: (listing: Omit<FoodListing, 'id' | 'createdAt'>) => void;

  // Community Reviews & Ratings (Separate dedicated page)
  reviews: CommunityReview[];
  addReview: (review: Omit<CommunityReview, 'id' | 'date' | 'upvotes' | 'hasUpvoted'>) => void;
  upvoteReview: (reviewId: string) => void;
  donorReviewFilter: string | null;
  setDonorReviewFilter: (donorName: string | null) => void;

  // Requests
  requests: IncomingRequest[];
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;

  // Admin
  adminReports: AdminReport[];
  dismissAdminReport: (id: string) => void;
  removeAdminListing: (id: string) => void;
  ngoVerifications: NGOVerification[];
  approveNGO: (id: string) => void;
  requestNGOInfo: (id: string) => void;

  // Activity / Dispatch
  activeDispatchPickedUp: boolean;
  markDispatchPickedUp: () => void;
  recentRescues: RecentRescue[];

  // Firewall WAF state & controls
  firewallActive: boolean;
  setFirewallActive: (active: boolean) => void;
  firewallStats: {
    totalRequestsInspected: number;
    threatsBlocked: number;
    ddosMitigationRate: string;
    bannedIps: string[];
  };
  firewallRules: FirewallRule[];
  toggleFirewallRule: (ruleId: string) => void;
  firewallLogs: FirewallLog[];
  simulateAttack: (type: 'sqli' | 'xss' | 'ddos' | 'traversal') => void;
  blockIpAddress: (ip: string) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, icon?: string, type?: ToastState['type']) => void;

  // Modals
  activeModal: 'none' | 'partial_claim' | 'message_donor' | 'call_kitchen' | 'custom_alert' | 'view_doc';
  setActiveModal: (modal: 'none' | 'partial_claim' | 'message_donor' | 'call_kitchen' | 'custom_alert' | 'view_doc') => void;
  modalPayload: any;
  setModalPayload: (payload: any) => void;

  // Auth & Protected Routes
  userEmail: string;
  setUserEmail: (email: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  userOrg: string;
  setUserOrg: (org: string) => void;
  userLocation: string;
  setUserLocation: (loc: string) => void;
  isLoggedIn: boolean;
  loginUser: (email: string, org: string, role: UserRole, loc?: string) => void;
  logoutUser: () => void;
  postLoginRedirect: AppPage | null;
  setPostLoginRedirect: (p: AppPage | null) => void;
  authNotice: string | null;
  setAuthNotice: (notice: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('foodshare_role') as UserRole) || 'donor';
  });
  const [page, setPageState] = useState<AppPage>(() => {
    return (localStorage.getItem('foodshare_page') as AppPage) || 'home';
  });
  const [selectedListingId, setSelectedListingId] = useState<string>('listing-1');
  const [listings, setListings] = useState<FoodListing[]>(() => {
    const saved = localStorage.getItem('foodshare_listings_v3');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('foodshare_bookmarks');
    return saved ? JSON.parse(saved) : ['listing-1'];
  });
  const [requests, setRequests] = useState<IncomingRequest[]>(() => {
    const saved = localStorage.getItem('foodshare_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });
  const [adminReports, setAdminReports] = useState<AdminReport[]>(() => {
    const saved = localStorage.getItem('foodshare_admin_reports');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_REPORTS;
  });
  const [ngoVerifications, setNgoVerifications] = useState<NGOVerification[]>(() => {
    const saved = localStorage.getItem('foodshare_ngos');
    return saved ? JSON.parse(saved) : INITIAL_NGO_VERIFICATIONS;
  });
  const [recentRescues, setRecentRescues] = useState<RecentRescue[]>(() => {
    const saved = localStorage.getItem('foodshare_recent_rescues');
    return saved ? JSON.parse(saved) : INITIAL_RECENT_RESCUES;
  });
  const [activeDispatchPickedUp, setActiveDispatchPickedUp] = useState<boolean>(false);

  // Dedicated Community Reviews State (Separate Page)
  const [reviews, setReviews] = useState<CommunityReview[]>(() => {
    const saved = localStorage.getItem('foodshare_reviews_v2');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_REVIEWS;
  });
  const [donorReviewFilter, setDonorReviewFilter] = useState<string | null>(null);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('foodshare_logged_in') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('foodshare_user_email') || 'sundaram@meenakshimahal.tn';
  });
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('foodshare_user_name') || 'Sundaram Chettiar';
  });
  const [userOrg, setUserOrg] = useState<string>(() => {
    return localStorage.getItem('foodshare_user_org') || 'Sri Meenakshi Kalyana Mandapam';
  });
  const [userLocation, setUserLocation] = useState<string>(() => {
    return localStorage.getItem('foodshare_user_loc') || 'Madurai, Tamil Nadu';
  });
  const [postLoginRedirect, setPostLoginRedirect] = useState<AppPage | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Firewall WAF State
  const [firewallActive, setFirewallActive] = useState<boolean>(true);
  const [firewallStats, setFirewallStats] = useState({
    totalRequestsInspected: 1540,
    threatsBlocked: 48,
    ddosMitigationRate: '99.98%',
    bannedIps: ['198.51.100.4', '203.0.113.88']
  });
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([
    {
      id: 'rule-sqli',
      name: 'SQL Injection Shield',
      description: 'Inspects query params & body for union select, sleep(), or quote injections',
      enabled: true,
      blockedCount: 22
    },
    {
      id: 'rule-xss',
      name: 'XSS Sanitization Filter',
      description: 'Blocks malicious <script>, javascript: or onload event vectors in inputs',
      enabled: true,
      blockedCount: 16
    },
    {
      id: 'rule-traversal',
      name: 'Path Traversal Guard',
      description: 'Blocks attempts to access sensitive system paths with ../ or %2e%2e',
      enabled: true,
      blockedCount: 7
    },
    {
      id: 'rule-rate',
      name: 'Dynamic DDoS & Rate Limiter',
      description: 'Enforces sliding-window request quotas per IP address to safeguard food dispatch',
      enabled: true,
      blockedCount: 3
    }
  ]);
  const [firewallLogs, setFirewallLogs] = useState<FirewallLog[]>([
    {
      id: 'log-1',
      timestamp: 'Just now',
      ip: '198.51.100.4',
      path: '/api/listings?filter=1%20UNION%20SELECT%20*',
      method: 'GET',
      threatType: 'SQL_INJECTION',
      action: 'BLOCKED',
      details: 'Attempted SQL union injection on listing search query'
    },
    {
      id: 'log-2',
      timestamp: '14 mins ago',
      ip: '203.0.113.88',
      path: '/api/auth/register',
      method: 'POST',
      threatType: 'XSS_PAYLOAD',
      action: 'BLOCKED',
      details: 'Detected malicious <script> alert tag in organization name field'
    },
    {
      id: 'log-3',
      timestamp: '1 hour ago',
      ip: '192.0.2.14',
      path: '/etc/passwd',
      method: 'GET',
      threatType: 'PATH_TRAVERSAL',
      action: 'BLOCKED',
      details: 'Probed path traversal on root static directory'
    }
  ]);

  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'partial_claim' | 'message_donor' | 'call_kitchen' | 'custom_alert' | 'view_doc'>('none');
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('foodshare_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('foodshare_page', page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem('foodshare_listings_v3', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('foodshare_reviews_v2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('foodshare_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('foodshare_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('foodshare_user_email', userEmail);
    localStorage.setItem('foodshare_user_name', userName);
    localStorage.setItem('foodshare_user_org', userOrg);
    localStorage.setItem('foodshare_user_loc', userLocation);
  }, [userEmail, userName, userOrg, userLocation]);

  const addReview = (newRevData: Omit<CommunityReview, 'id' | 'date' | 'upvotes' | 'hasUpvoted'>) => {
    const newRev: CommunityReview = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      upvotes: 1,
      hasUpvoted: true
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Nandri! Your community review & FSSAI rating has been published.', 'verified', 'success');
  };

  const upvoteReview = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          const currentlyUpvoted = r.hasUpvoted ?? false;
          return {
            ...r,
            upvotes: currentlyUpvoted ? r.upvotes - 1 : r.upvotes + 1,
            hasUpvoted: !currentlyUpvoted
          };
        }
        return r;
      })
    );
  };

  // Protected page navigation gate
  const setPage = (newPage: AppPage, listingId?: string) => {
    if (listingId) {
      setSelectedListingId(listingId);
    }

    // PROTECTED ROUTE: Donation page requires login
    if (newPage === 'donate' && !isLoggedIn) {
      setPostLoginRedirect('donate');
      setAuthNotice('Vanakkam! Please sign in or register to publish food donations.');
      setPageState('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email: string, org: string, userRole: UserRole, loc?: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserOrg(org);
    setUserName(org.split(' ')[0] || 'Member');
    if (loc) setUserLocation(loc);
    setRoleState(userRole);
    setAuthNotice(null);

    // If redirected from donate, proceed to donate!
    if (postLoginRedirect) {
      const destination = postLoginRedirect;
      setPostLoginRedirect(null);
      setPageState(destination);
      showToast(`Vanakkam, ${org}! Redirected to Donation listing.`, 'check_circle', 'success');
    } else {
      setPageState(userRole === 'donor' ? 'dashboard' : 'activity');
      showToast(`Vanakkam, ${org}! Signed in to AnnaSeva network.`, 'check_circle', 'success');
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed out of FoodShare. Sign in anytime to publish donations.', 'logout', 'info');
    setPageState('home');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(
      `Perspective set to ${
        newRole === 'donor'
          ? 'Donor Mode (Kalyana Mandapam / Restaurant)'
          : newRole === 'recipient'
          ? 'NGO Recipient Mode (Food Bank / Trust)'
          : 'Super Admin Mode'
      }`,
      'switch_account'
    );
  };

  const showToast = (message: string, icon = 'check_circle', type: ToastState['type'] = 'success') => {
    const id = Date.now();
    setToast({ id, message, icon, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 3200);
  };

  // Firewall actions
  const toggleFirewallRule = (ruleId: string) => {
    setFirewallRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
    showToast('Firewall WAF security rule updated', 'security', 'info');
  };

  const simulateAttack = (type: 'sqli' | 'xss' | 'ddos' | 'traversal') => {
    const ip = `198.51.100.${Math.floor(Math.random() * 200) + 10}`;
    const newLog: FirewallLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      ip,
      path: type === 'sqli' ? '/api/listings?id=1%27%20OR%201=1' : type === 'xss' ? '/api/auth/register' : '/etc/shadow',
      method: type === 'sqli' ? 'GET' : 'POST',
      threatType: type === 'sqli' ? 'SQL_INJECTION' : type === 'xss' ? 'XSS_VECTOR' : type === 'ddos' ? 'DDOS_FLOOD' : 'PATH_TRAVERSAL',
      action: 'BLOCKED',
      details: `Simulated ${type.toUpperCase()} vector neutralized by FoodShare WAF`
    };

    setFirewallLogs(prev => [newLog, ...prev]);
    setFirewallStats(prev => ({
      ...prev,
      threatsBlocked: prev.threatsBlocked + 1,
      totalRequestsInspected: prev.totalRequestsInspected + 1
    }));

    showToast(`🛡️ FIREWALL ALERT: Blocked ${type.toUpperCase()} attack from ${ip}!`, 'security', 'warning');
  };

  const blockIpAddress = (ip: string) => {
    if (!firewallStats.bannedIps.includes(ip)) {
      setFirewallStats(prev => ({
        ...prev,
        bannedIps: [...prev.bannedIps, ip]
      }));
      showToast(`IP ${ip} permanently blacklisted on WAF firewall`, 'block', 'error');
    }
  };

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
      showToast('Removed from saved claims', 'bookmark_border', 'info');
    } else {
      setBookmarks([...bookmarks, id]);
      showToast('Saved to your claim bookmarks', 'bookmark', 'success');
    }
  };

  const claimListing = (listingId: string, quantity?: number) => {
    const target = listings.find(l => l.id === listingId);
    if (!target) return;

    const claimedCount = quantity || target.quantity;
    const remaining = Math.max(0, target.quantity - claimedCount);

    setListings(prev =>
      prev.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            quantity: remaining,
            claimedQuantity: (item.claimedQuantity || 0) + claimedCount,
            isAvailable: remaining > 0,
            portionsText: remaining > 0 ? `${remaining} meals remaining` : 'Fully Claimed'
          };
        }
        return item;
      })
    );

    // Add to recent rescues
    setRecentRescues(prev => [
      {
        id: `rescue-${Date.now()}`,
        title: `${claimedCount} ${target.unit} • ${target.title.slice(0, 24)}...`,
        dateStr: 'Today',
        source: target.donor.name,
        category: target.category === 'Fresh Produce' ? 'produce' : target.category === 'Bakery' ? 'bakery' : 'prepared',
        status: 'completed'
      },
      ...prev
    ]);

    showToast(
      quantity
        ? `Reserved ${quantity} portions! Collection pass dispatched in Tamil Nadu network.`
        : `Claimed entire batch (${claimedCount} meals)! E-pass generated.`,
      'celebration',
      'success'
    );
  };

  const createListing = (newListingData: Omit<FoodListing, 'id' | 'createdAt'>) => {
    const newListing: FoodListing = {
      ...newListingData,
      id: `listing-${Date.now()}`,
      createdAt: 'Just now'
    };
    setListings(prev => [newListing, ...prev]);
    showToast('Donation published! Broadcasting to nearby rescue partners across Tamil Nadu.', 'campaign', 'success');
    setPage('browse');
  };

  const acceptRequest = (requestId: string) => {
    const req = requests.find(r => r.id === requestId);
    setRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
    );
    showToast(`Request accepted for ${req?.recipientName || 'recipient'}! Courier alerted.`, 'task_alt', 'success');
  };

  const declineRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    showToast('Donation request declined respectfully.', 'cancel', 'info');
  };

  const dismissAdminReport = (id: string) => {
    setAdminReports(prev => prev.filter(r => r.id !== id));
    showToast('Report marked as resolved and dismissed.', 'done_all', 'success');
  };

  const removeAdminListing = (id: string) => {
    setAdminReports(prev => prev.filter(r => r.id !== id));
    showToast('Listing deactivated & removed from public directory.', 'delete_forever', 'warning');
  };

  const approveNGO = (id: string) => {
    const ngo = ngoVerifications.find(n => n.id === id);
    setNgoVerifications(prev => prev.filter(n => n.id !== id));
    showToast(`${ngo?.orgName || 'Organization'} accredited and verified!`, 'verified', 'success');
  };

  const requestNGOInfo = (id: string) => {
    showToast('Dispatched clarification inquiry regarding FSSAI / 80G documentation.', 'send', 'info');
  };

  const markDispatchPickedUp = () => {
    setActiveDispatchPickedUp(true);
    showToast('Pickup confirmed! Distribution milestone updated.', 'verified', 'success');
  };

  const selectedListing = listings.find(l => l.id === selectedListingId) || listings[0];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        page,
        setPage,
        selectedListingId,
        setSelectedListingId,
        selectedListing,
        listings,
        bookmarks,
        toggleBookmark,
        claimListing,
        createListing,
        reviews,
        addReview,
        upvoteReview,
        donorReviewFilter,
        setDonorReviewFilter,
        requests,
        acceptRequest,
        declineRequest,
        adminReports,
        dismissAdminReport,
        removeAdminListing,
        ngoVerifications,
        approveNGO,
        requestNGOInfo,
        activeDispatchPickedUp,
        markDispatchPickedUp,
        recentRescues,
        firewallActive,
        setFirewallActive,
        firewallStats,
        firewallRules,
        toggleFirewallRule,
        firewallLogs,
        simulateAttack,
        blockIpAddress,
        toast,
        showToast,
        activeModal,
        setActiveModal,
        modalPayload,
        setModalPayload,
        userEmail,
        setUserEmail,
        userName,
        setUserName,
        userOrg,
        setUserOrg,
        userLocation,
        setUserLocation,
        isLoggedIn,
        loginUser,
        logoutUser,
        postLoginRedirect,
        setPostLoginRedirect,
        authNotice,
        setAuthNotice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
