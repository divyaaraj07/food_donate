import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse JSON bodies
app.use(express.json());

// ============================================================================
// 🛡️ WEB APPLICATION FIREWALL (WAF) & SECURITY LAYER
// ============================================================================

interface FirewallLog {
  id: string;
  timestamp: string;
  ip: string;
  path: string;
  method: string;
  threatType: string;
  action: 'BLOCKED' | 'FLAGGED' | 'ALLOWED';
  details: string;
}

interface FirewallRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  blockedCount: number;
}

// In-memory Firewall State
const firewallStats = {
  active: true,
  totalRequestsInspected: 1420,
  threatsBlocked: 42,
  activeConnections: 12,
  ddosMitigationRate: '99.98%',
  bannedIps: ['198.51.100.4', '203.0.113.88'],
  rateLimitWindowMs: 60000,
  rateLimitMaxRequests: 120
};

const firewallRules: FirewallRule[] = [
  {
    id: 'rule-sqli',
    name: 'SQL Injection Shield',
    description: 'Inspects query params & body for union select, sleep(), or quote injections',
    enabled: true,
    blockedCount: 19
  },
  {
    id: 'rule-xss',
    name: 'XSS Sanitization Filter',
    description: 'Blocks malicious <script>, javascript: or onload event vectors in inputs',
    enabled: true,
    blockedCount: 14
  },
  {
    id: 'rule-traversal',
    name: 'Path Traversal Guard',
    description: 'Blocks attempts to access sensitive system paths with ../ or %2e%2e',
    enabled: true,
    blockedCount: 6
  },
  {
    id: 'rule-rate',
    name: 'Dynamic DDoS & Rate Limiter',
    description: 'Enforces sliding-window request quotas per IP address to safeguard food dispatch',
    enabled: true,
    blockedCount: 3
  }
];

const firewallLogs: FirewallLog[] = [
  {
    id: 'log-1',
    timestamp: '2 mins ago',
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
];

// IP request counters for rate limiting
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

// Security Headers Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Firewall-Status', 'ACTIVE-PROTECTED');
  res.setHeader('X-Powered-By', 'FoodShare-AnnaSeva-TamilNadu-Shield');
  next();
});

// Firewall WAF Inspection Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  firewallStats.totalRequestsInspected++;
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  // Check IP Blacklist
  if (firewallStats.bannedIps.includes(clientIp)) {
    return res.status(403).json({
      error: 'Access Denied by FoodShare Firewall WAF',
      reason: 'IP blacklisted due to repeated security anomalies',
      ip: clientIp
    });
  }

  // Rate Limiting Check
  const now = Date.now();
  const rateLimitRule = firewallRules.find(r => r.id === 'rule-rate');
  if (rateLimitRule?.enabled) {
    const record = ipRequestCounts.get(clientIp);
    if (!record || now > record.resetTime) {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + firewallStats.rateLimitWindowMs });
    } else {
      record.count++;
      if (record.count > firewallStats.rateLimitMaxRequests) {
        firewallStats.threatsBlocked++;
        rateLimitRule.blockedCount++;
        firewallLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          ip: clientIp,
          path: req.path,
          method: req.method,
          threatType: 'RATE_LIMIT_EXCEEDED',
          action: 'BLOCKED',
          details: `Client exceeded rate limit of ${firewallStats.rateLimitMaxRequests} reqs/min`
        });
        return res.status(429).json({
          error: 'Rate Limit Exceeded',
          message: 'Too many requests from your IP. FoodShare Firewall has throttled the connection.',
          retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
        });
      }
    }
  }

  // Threat Signatures: SQL Injection & XSS & Traversal
  const fullUrl = req.originalUrl || req.url;
  const payloadStr = JSON.stringify(req.body || {}) + fullUrl;

  const sqliPattern = /(\b(SELECT|UNION|INSERT|DELETE|UPDATE|DROP|TABLE)\b.*=)|(--|\/\*|\*\/|;|\bWAITFOR\b)/i;
  const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=/i;
  const traversalPattern = /\.\.\/|\.\.\\|%2e%2e/i;

  const sqliRule = firewallRules.find(r => r.id === 'rule-sqli');
  if (sqliRule?.enabled && sqliPattern.test(payloadStr)) {
    firewallStats.threatsBlocked++;
    sqliRule.blockedCount++;
    firewallLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      ip: clientIp,
      path: req.path,
      method: req.method,
      threatType: 'SQL_INJECTION',
      action: 'BLOCKED',
      details: 'Detected malicious SQL control characters in request payload'
    });
    return res.status(403).json({
      error: 'Blocked by FoodShare SQL Injection Shield',
      code: 'WAF_SQLI_THREAT'
    });
  }

  const xssRule = firewallRules.find(r => r.id === 'rule-xss');
  if (xssRule?.enabled && xssPattern.test(payloadStr)) {
    firewallStats.threatsBlocked++;
    xssRule.blockedCount++;
    firewallLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      ip: clientIp,
      path: req.path,
      method: req.method,
      threatType: 'XSS_VECTOR',
      action: 'BLOCKED',
      details: 'Detected inline executable script tags in request payload'
    });
    return res.status(403).json({
      error: 'Blocked by FoodShare XSS Sanitizer',
      code: 'WAF_XSS_THREAT'
    });
  }

  const traversalRule = firewallRules.find(r => r.id === 'rule-traversal');
  if (traversalRule?.enabled && traversalPattern.test(fullUrl)) {
    firewallStats.threatsBlocked++;
    traversalRule.blockedCount++;
    firewallLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      ip: clientIp,
      path: req.path,
      method: req.method,
      threatType: 'PATH_TRAVERSAL',
      action: 'BLOCKED',
      details: 'Attempted directory traversal beyond permitted workspace bounds'
    });
    return res.status(403).json({
      error: 'Blocked by FoodShare Path Traversal Guard',
      code: 'WAF_TRAVERSAL_THREAT'
    });
  }

  next();
});

// ============================================================================
// 🍲 TAMIL NADU IN-MEMORY DATABASE & SEED DATA
// ============================================================================

interface DonorInfo {
  name: string;
  avatar: string;
  rating: number;
  rescuesCompleted: number;
  verified: boolean;
  address: string;
  city: string;
  phone: string;
  contactPerson: string;
  dockInstructions: string;
  fssaiNumber: string;
}

interface FoodListing {
  id: string;
  title: string;
  donor: DonorInfo;
  category: 'Prepared Meals' | 'Fresh Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry';
  isPureVeg: boolean;
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
  createdAt: string;
}

let dbListings: FoodListing[] = [
  {
    id: 'tn-listing-1',
    title: 'Kalyana Mandapam Sambar Rice, Kurma & Poori Trays',
    donor: {
      name: 'Sri Meenakshi Kalyana Mandapam',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc',
    urgent: true,
    expiryTime: '7:30 PM',
    expiresInText: 'Must be collected within 2 hrs 15 mins',
    isAvailable: true,
    batchDetails: 'Traditional Tamil wedding surplus prepared with Ponni rice, fresh drumstick-shallot sambar, potato vegetable kurma, and hot pooris. Stored in hot insulation cambros since 2:30 PM wedding feast.',
    dietaryTags: ['Pure Veg (100%)', 'Nut-Free', 'FSSAI Certified', 'Hot Insulation'],
    allergenNotice: 'Contains mustard seeds, asafoetida (perungayam), and wheat (pooris). Prepared in a pure vegetarian Brahmin kitchen.',
    distance: '1.4 km from Mattuthavani',
    pickupWindow: 'Today, 5:00 PM – 7:30 PM',
    createdAt: 'Today, 2:45 PM'
  },
  {
    id: 'tn-listing-2',
    title: 'Murugan Style Fresh Steamed Idlis & Medu Vadas',
    donor: {
      name: 'Murugan Idli Shop & Tiffin Kitchen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTsTol66PoxJUl5JhXxhJXzjjjN3wTVoxB2fFxi5D5HTbubFfKlCb-qoCOUuLN8Nb8QlTLB2hhEdWDvC0P3yHFWR8HfsDCis9d6sIadV3EacH7Cm_lgAN1ajOhh4ILe8HUYh5V2bM7j6OTir1uQtba8eWq8Vj_TT-OjccJJSImvdG8s1VJyKK9wNNlTD_hc9tRo780BILYU_f7K1ppQJfER5L4l6BZhERz7zbAXCBbaewAkhtDzvQ',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTbQrg2xxdCqvONZ9QoExiXWdwz2P2CapGh7sUUOjtUh7dW9yqT75Vxt51rqohb7q3ZMF7BoOl8CXXFyhc8fAvNDK17AGENE3auO_3h_ypq3RK8gf8eCSFHpqTr0fwt2dlunItOKYw0hIdAKarPXkpeyrfsLZyj8FbwrJu95FoVuXkrBjHwOE9iW5b2ituT72E-13rXFxPt1Y8x1fncIwd5JDJ2F-RUs74Qf3Ab0S_RjLPyEkhsU',
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
    id: 'tn-listing-3',
    title: 'Fresh Nilgiri Carrots, Beans & Farm Greens',
    donor: {
      name: 'Uzhavar Sandhai Farmers Hub',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrZRPQPcMARSOtbh60w1kFhrDVpK4ESuSSu94Y7plTAi4vh3T_IZNg-poXf14blRz_Q39mrKkWvaC08Q3ACauJLE7ODUXR1PmrX0pt0u_NxmXuGVO3FDd9Y3Q9n3_v2oMvRDOctKUrgsUD_wvAa4WluvMvwH4A14Bw8SC7flOiKGrXk2Ju8JDFcEByz41DsEWYAVVqD_Ercu13nO_wOFdlqVtf80RTnh1G9_wZxMFZ2pFDoHcg8s',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrZRPQPcMARSOtbh60w1kFhrDVpK4ESuSSu94Y7plTAi4vh3T_IZNg-poXf14blRz_Q39mrKkWvaC08Q3ACauJLE7ODUXR1PmrX0pt0u_NxmXuGVO3FDd9Y3Q9n3_v2oMvRDOctKUrgsUD_wvAa4WluvMvwH4A14Bw8SC7flOiKGrXk2Ju8JDFcEByz41DsEWYAVVqD_Ercu13nO_wOFdlqVtf80RTnh1G9_wZxMFZ2pFDoHcg8s',
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
    id: 'tn-listing-4',
    title: 'Chettinad Veg Dum Biryani & Seeraga Samba Bowls',
    donor: {
      name: 'Anjappar Chettinad Grand Kitchen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnsn5mglERQj9o7jV0eqohAnGMn6JaDqmhG-cppHoUlbVvDfGnWNK2IjwYDWZwXgO5lpskeAXfI4lNF4sIxspf3rMiyihioCi3kdWLSRD82hFmwBs10DJYpwSJH3m6oKwdXku9-qOVcEPHX6cG-H2iiFcpu91Xg8T_KWD5MnhC2wt41bxEkw_3_hEeFWBrjn6MBE4Bh6gqCsy2Qdfia9mKjRazWmmo0hBmTiIEe6uY3Z9qWkjYqVc',
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXVkcOLXSQiGEU6F1YNHxIHB0vpfg3y8zpGY63lWjk8FfIws0Dq--2XxdsancdS5XNFjuEC68dBFdnCk2dcgQOISOQCC5ccOeCKPCNaTLtonH6wvTEGLF2lRldKbmoC2rfJ1KgJBdPDq-yYKXPdTrzeLzWC43HcCxUT-06DR3HRW8BF0lvN-LhxwOGGvMANw6QM4p89DsOoX1E_MUWp1eL4orz6NH1btUVDsiK7kvuw8X7KoApibo',
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
  }
];

let dbRequests = [
  {
    id: 'req-tn-1',
    listingId: 'tn-listing-1',
    recipientName: 'Agara Foundation Chennai Shelter',
    requestedItem: '120 Kalyana Mandapam Meals',
    timeAgo: '10m ago',
    pickupTime: 'Today, 5:45 PM',
    volunteerOrMethod: 'Vol: David S. (Van TN-09-CB-4210)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA1PEM06RIxvNPuWgxSXw7ZiJ1nI7J-hQP-OxprF-_xFvDjqeTw19te95KsJ_X3m7AwXwzVysbbeELVl_n2I3CGb2O1heH7IYOIM8OFe2ZySVhFiNx0-u1Y-Dp-ojdN8nhd6dcPweIqGyESEbX1sLPDNtAFH1ONExeGWkcvyfQK0RnZFlrS9lhRLfxrKqWwMquqYHF11oZb_x1QZVqw42KQ2x5FrqKshEE-tyC3hHnXwfdbg6H6LE',
    status: 'pending'
  },
  {
    id: 'req-tn-2',
    listingId: 'tn-listing-2',
    recipientName: 'Madurai Valarpirai Food Pantry',
    requestedItem: '60 Idli Tiffin Packets',
    timeAgo: '28m ago',
    pickupTime: 'Today by 6:30 PM',
    volunteerOrMethod: 'Self-Transport E-Auto',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTsTol66PoxJUl5JhXxhJXzjjjN3wTVoxB2fFxi5D5HTbubFfKlCb-qoCOUuLN8Nb8QlTLB2hhEdWDvC0P3yHFWR8HfsDCis9d6sIadV3EacH7Cm_lgAN1ajOhh4ILe8HUYh5V2bM7j6OTir1uQtba8eWq8Vj_TT-OjccJJSImvdG8s1VJyKK9wNNlTD_hc9tRo780BILYU_f7K1ppQJfER5L4l6BZhERz7zbAXCBbaewAkhtDzvQ',
    status: 'pending'
  }
];

let dbUsers: any[] = [
  {
    id: 'user-maria',
    name: 'Maria Rodriguez',
    email: 'maria@urbankitchen.com',
    role: 'donor',
    organization: 'Urban Kitchen & Chettinad Catering Co.',
    location: 'T. Nagar, Chennai, Tamil Nadu',
    phone: '+91 94440 18234'
  }
];

// ============================================================================
// 🔌 API ROUTES
// ============================================================================

// 1. Firewall & Security Monitoring APIs
app.get('/api/firewall/stats', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    stats: firewallStats,
    rules: firewallRules,
    logs: firewallLogs.slice(0, 20)
  });
});

app.post('/api/firewall/toggle-rule', (req: Request, res: Response) => {
  const { ruleId, enabled } = req.body;
  const rule = firewallRules.find(r => r.id === ruleId);
  if (rule) {
    rule.enabled = Boolean(enabled);
    return res.json({ success: true, rule });
  }
  res.status(404).json({ error: 'Rule not found' });
});

app.post('/api/firewall/simulate-attack', (req: Request, res: Response) => {
  const { type } = req.body;
  firewallStats.threatsBlocked++;
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '198.51.100.99';

  const newLog: FirewallLog = {
    id: `log-${Date.now()}`,
    timestamp: 'Just now',
    ip: clientIp,
    path: '/api/listings/exploit_test',
    method: 'POST',
    threatType: type === 'xss' ? 'XSS_INJECTION' : type === 'sqli' ? 'SQL_INJECTION' : 'DDOS_FLOOD',
    action: 'BLOCKED',
    details: `Simulated ${type?.toUpperCase() || 'ANOMALY'} attack blocked instantly by FoodShare Firewall`
  };
  firewallLogs.unshift(newLog);

  res.json({
    success: true,
    message: 'Attack vector successfully neutralized by FoodShare WAF layer',
    log: newLog
  });
});

app.post('/api/firewall/block-ip', (req: Request, res: Response) => {
  const { ip } = req.body;
  if (ip && !firewallStats.bannedIps.includes(ip)) {
    firewallStats.bannedIps.push(ip);
    return res.json({ success: true, bannedIps: firewallStats.bannedIps });
  }
  res.json({ success: false, message: 'Invalid IP or already blocked' });
});

// 2. Authentication APIs
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, role, organization, location, phone } = req.body;

  if (!email || !organization) {
    return res.status(400).json({ error: 'Email and organization are required' });
  }

  const existing = dbUsers.find(u => u.email === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User already registered with this email address' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name || organization,
    email: email.toLowerCase(),
    role: role || 'donor',
    organization,
    location: location || 'Chennai, Tamil Nadu',
    phone: phone || '+91 98400 00000',
    token: `token_${Date.now()}`
  };

  dbUsers.push(newUser);
  res.status(201).json({
    success: true,
    message: `Account created for ${organization} in Tamil Nadu rescue network!`,
    user: newUser
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, role } = req.body;

  let user = dbUsers.find(u => u.email === email?.toLowerCase());
  if (!user) {
    // Auto-create or login with default
    user = {
      id: `user-${Date.now()}`,
      name: email?.split('@')[0] || 'Tamil Nadu Donor',
      email: email || 'donor@tamilnadu.foodshare.in',
      role: role || 'donor',
      organization: 'Tamil Nadu Community Kitchen',
      location: 'Chennai, Tamil Nadu',
      phone: '+91 94440 18234',
      token: `token_${Date.now()}`
    };
    dbUsers.push(user);
  }

  res.json({
    success: true,
    message: 'Welcome back to AnnaSeva FoodShare!',
    user
  });
});

// 3. Listings APIs
app.get('/api/listings', (req: Request, res: Response) => {
  res.json({ listings: dbListings });
});

app.post('/api/listings', (req: Request, res: Response) => {
  const newListing: FoodListing = {
    ...req.body,
    id: `tn-listing-${Date.now()}`,
    createdAt: 'Just now',
    isAvailable: true
  };
  dbListings.unshift(newListing);
  res.status(201).json({ success: true, listing: newListing });
});

app.post('/api/listings/:id/claim', (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const listing = dbListings.find(l => l.id === id);

  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  const count = quantity || listing.quantity;
  listing.quantity = Math.max(0, listing.quantity - count);
  if (listing.quantity === 0) {
    listing.isAvailable = false;
    listing.portionsText = 'Fully Claimed';
  } else {
    listing.portionsText = `${listing.quantity} ${listing.unit} remaining`;
  }

  res.json({ success: true, listing, claimed: count });
});

// 4. Requests APIs
app.get('/api/requests', (req: Request, res: Response) => {
  res.json({ requests: dbRequests });
});

app.post('/api/requests/:id/accept', (req: Request, res: Response) => {
  const { id } = req.params;
  const request = dbRequests.find(r => r.id === id);
  if (request) {
    request.status = 'accepted';
    return res.json({ success: true, request });
  }
  res.status(404).json({ error: 'Request not found' });
});

app.post('/api/requests/:id/decline', (req: Request, res: Response) => {
  const { id } = req.params;
  dbRequests = dbRequests.filter(r => r.id !== id);
  res.json({ success: true });
});

// ============================================================================
// 🚀 VITE INTEGRATION IN DEV & PRODUCTION STATIC SERVING
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛡️ FoodShare AnnaSeva Full-Stack Server running on port ${PORT}`);
    console.log(`🛡️ WAF Firewall Protection: ACTIVE (DDoS, SQLi, XSS Sanitizer Enabled)`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
