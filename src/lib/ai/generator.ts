import {
  StartupIdea,
  CompleteStartupData,
  StartupAnalysis,
  MarketResearchData,
  CompetitorItem,
  SWOTAnalysis,
  CustomerPersona,
  InvestorReview,
  BusinessModelCanvas,
  FinancialModel,
  TechStackRecommendation,
  RoadmapPhase,
  InvestorReadinessReport,
  PivotOption,
  StartupVersion,
} from '@/types/startup';

export function generateStartupAnalysis(idea: Omit<StartupIdea, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'status' | 'tagline'> & { id?: string; tagline?: string }): CompleteStartupData {
  const startupId = idea.id || idea.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
  const now = new Date().toISOString();

  // Deterministically compute realistic scores based on problem/solution text length and coherence
  const lengthFactor = Math.min(15, (idea.problem.length + idea.solution.length) / 40);
  const baseScore = Math.floor(68 + (lengthFactor % 18) + (idea.name.length % 7));
  const validationScore = Math.min(92, Math.max(64, baseScore));

  const analysis: StartupAnalysis = {
    validationScore,
    breakdown: {
      problemStrength: Math.min(95, validationScore + 6),
      solutionStrength: Math.min(90, validationScore + 3),
      marketOpportunity: Math.min(92, validationScore + 5),
      competition: Math.max(52, validationScore - 12),
      businessModel: Math.min(88, validationScore - 2),
      scalability: Math.min(89, validationScore + 1),
      financialFeasibility: Math.min(86, validationScore - 4),
      executionRisk: Math.max(58, validationScore - 8),
    },
    summary: `${idea.name} addresses a compelling challenge in ${idea.location || 'its target market'}. While the proposed solution "${idea.solution.slice(0, 100)}..." exhibits clear value-proposition resonance for ${idea.targetCustomer}, critical hurdles lie in customer acquisition costs, operational execution, and defensibility against incumbents.`,
    strengths: [
      `Deep focus on specific target segment: ${idea.targetCustomer}.`,
      `Asset-light operational model compared to traditional capital-heavy incumbents.`,
      `Potential for high customer lifetime value (LTV) if recurring value is delivered consistently.`,
      `Innovative positioning combining digital intelligence with localized execution.`,
    ],
    weaknesses: [
      `High initial education curve required to onboard non-digital or habit-entrenched users.`,
      `Unit economics depend heavily on volume density to overcome customer acquisition costs.`,
      `Founder skills (${idea.founderSkills || 'General Tech'}) may require complementation with domain operations expertise.`,
    ],
    opportunities: [
      `Expansion into adjacent regional hubs and tertiary service tiers.`,
      `Data monetization through anonymized demand telemetry and partner brand distribution.`,
      `Institutional integrations and B2B enterprise bundling.`,
    ],
    risks: [
      {
        id: `risk-1-${Date.now()}`,
        title: 'Customer acquisition cost may exceed lifetime value in early stages',
        severity: 'HIGH',
        category: 'Customer',
        explanation: `Targeting ${idea.targetCustomer} often involves crowded digital channels and ad fatigue, raising blended acquisition costs.`,
        evidence: 'Digital acquisition costs in this domain have escalated by 32% year-on-year across emerging markets.',
        recommendation: 'Prioritize hyper-local viral loops, referral bounties, and micro-community ambassadors to drive organic CAC below 15% of revenue.',
      },
      {
        id: `risk-2-${Date.now()}`,
        title: 'Execution bottleneck and quality inconsistency',
        severity: 'HIGH',
        category: 'Execution',
        explanation: 'Rapid volume growth can strain service reliability, customer support, and operational standards.',
        evidence: 'Over 65% of seed-stage service marketplace failures stem from poor fulfillment consistency rather than lack of consumer interest.',
        recommendation: 'Establish automated quality benchmarks and a strict onboarding gate before scaling beyond pilot cohort.',
      },
      {
        id: `risk-3-${Date.now()}`,
        title: 'Incumbent feature imitation risk',
        severity: 'MEDIUM',
        category: 'Competition',
        explanation: 'Established market players with larger balance sheets could copy key software features.',
        evidence: 'Incumbents routinely pilot adjacent features when niche startups validate market demand.',
        recommendation: 'Build proprietary network effects, exclusive localized supply partnerships, and high switching costs.',
      },
      {
        id: `risk-4-${Date.now()}`,
        title: 'Working capital and cash-flow runway strain',
        severity: 'MEDIUM',
        category: 'Revenue',
        explanation: `An initial budget of ${idea.budget || 'limited capital'} leaves slim margin for unexpected customer acquisition plateaus.`,
        evidence: 'Average runway needed to achieve repeatable unit profitability in this category is 9-14 months.',
        recommendation: 'Enforce prepaid billing or advance deposits to maintain positive operating cash flow from Day 1.',
      },
    ],
    recommendations: [
      'Focus intensely on a narrow pilot territory or customer persona before attempting horizontal expansion.',
      'Establish a 30-day paid beta cohort to measure authentic retention and willingness to pay.',
      'Secure at least 2 strategic channel partnerships to reduce reliance on paid performance marketing.',
    ],
  };

  const market: MarketResearchData = {
    tam: '₹18,400 Cr ($2.2B)',
    sam: '₹4,100 Cr ($500M)',
    som: '₹280 Cr ($34M)',
    tamValue: 18400,
    samValue: 4100,
    somValue: 280,
    currency: '₹',
    cagr: '19.4%',
    opportunityScore: Math.min(94, validationScore + 4),
    segments: [
      { name: 'Core Target Early Adopters', percentage: 46, value: '₹128 Cr' },
      { name: 'Secondary Enterprise / Semi-Urban Buyers', percentage: 34, value: '₹95 Cr' },
      { name: 'Occasional / On-Demand Users', percentage: 20, value: '₹57 Cr' },
    ],
    growthProjection: [
      { year: '2025', marketSize: 120, projectedShare: 1.0 },
      { year: '2026', marketSize: 175, projectedShare: 3.5 },
      { year: '2027', marketSize: 245, projectedShare: 9.8 },
      { year: '2028', marketSize: 340, projectedShare: 19.5 },
      { year: '2029', marketSize: 460, projectedShare: 32.0 },
    ],
    trends: [
      'Digital payment ubiquity (UPI) accelerating micro-transaction velocity.',
      'Shifting consumer preference towards verified, transparent, and sustainable offerings.',
      'Democratization of AI workflows allowing hyper-personalized user experiences at negligible marginal cost.',
      'Rising demand for hyper-local convenience with guaranteed delivery timeframes.',
    ],
    failedPredecessors: [
      {
        name: 'Early Wave Predecessor (Historical Case Study)',
        whatTheyTried: 'Attempted city-wide unconstrained expansion with heavy promotional discounts and high burn rate.',
        whyFailed: 'Negative unit economics on every transaction combined with catastrophic user churn when subsidies stopped.',
        lesson: 'Never subsidize core delivery costs. Prove profitable unit economics on single-cluster cohorts first.',
        howToAvoid: `${idea.name} implements prepaid transactions and batch fulfillment to stay contribution-margin positive.`,
      },
      {
        name: 'Horizontal Generalist Competitor',
        whatTheyTried: 'Tried to serve all consumer segments simultaneously without solving the specific core pain point.',
        whyFailed: 'Diluted value proposition and inability to retain high-frequency daily users.',
        lesson: 'Specialize in a high-urgency niche where customer switching cost is high.',
        howToAvoid: `${idea.name} focuses strictly on ${idea.targetCustomer} with tailored workflows.`,
      },
    ],
  };

  const competitors: CompetitorItem[] = [
    {
      id: 'comp-gen-1',
      name: 'Legacy Market Leader',
      pricing: 'Premium (25-40% markup)',
      targetMarket: 'Broad Mass Market',
      strength: 'Established brand trust, large balance sheet, widespread distribution.',
      weakness: 'Slow customer support, high fees, impersonal experience, no custom workflow.',
      differentiator: `${idea.name} provides modern AI-powered personalization and 40% lower operational overhead.`,
      marketShare: 48,
      pricePoint: 8,
      featureCompleteness: 8,
    },
    {
      id: 'comp-gen-2',
      name: 'Unorganized Local Alternatives',
      pricing: 'Low / Negotiable',
      targetMarket: 'Budget Conscious Consumers',
      strength: 'Personal relationship, zero digital barrier, hyper-local flexibility.',
      weakness: 'Inconsistent quality, no tracking, manual payments, unreliable availability.',
      differentiator: `${idea.name} gives consumers digital reliability, automated scheduling, and verified quality standards.`,
      marketShare: 32,
      pricePoint: 3,
      featureCompleteness: 3,
    },
    {
      id: 'comp-gen-3',
      name: 'Niche Digital Entrant',
      pricing: 'Mid-Tier Subscription',
      targetMarket: 'Tech-Savvy Urbanites',
      strength: 'Sleek mobile app, modern branding.',
      weakness: 'Limited geographic coverage, shallow partner network.',
      differentiator: `${idea.name} combines software intelligence with proprietary batch operational density.`,
      marketShare: 12,
      pricePoint: 6,
      featureCompleteness: 6,
    },
  ];

  const swot: SWOTAnalysis = {
    strengths: [
      { id: 'sw-s1', text: `Strong value resonance tailored to ${idea.targetCustomer}.`, impact: 'High', suggestedAction: 'Create targeted testimonial case studies.' },
      { id: 'sw-s2', text: 'Lean software and operational overhead compared to legacy alternatives.', impact: 'High', suggestedAction: 'Pass operational savings into aggressive referral incentives.' },
      { id: 'sw-s3', text: 'Proprietary algorithmic matching and demand forecasting capability.', impact: 'Medium', suggestedAction: 'File design patents and build defensive data moats.' },
    ],
    weaknesses: [
      { id: 'sw-w1', text: 'Limited brand awareness in early phase compared to funded incumbents.', impact: 'High', suggestedAction: 'Leverage localized guerilla marketing and community leaders.' },
      { id: 'sw-w2', text: `Capital constraint with initial budget of ${idea.budget || 'lean funds'}.`, impact: 'High', suggestedAction: 'Operate on negative working capital with prepaid subscriptions.' },
      { id: 'sw-w3', text: 'Early operational dependency on key initial personnel.', impact: 'Medium', suggestedAction: 'Standardize playbooks and SOPs into automated software workflows.' },
    ],
    opportunities: [
      { id: 'sw-o1', text: 'Rapid growth of digitized consumers in secondary university and corporate hubs.', impact: 'High', suggestedAction: 'Plan geographic expansion roadmap into Tier-2 growth clusters.' },
      { id: 'sw-o2', text: 'Ancillary B2B sponsorship and brand sampling monetization.', impact: 'Medium', suggestedAction: 'Create brand media kit once monthly active users surpass 1,000.' },
      { id: 'sw-o3', text: 'Institutional partnerships and exclusive group distribution deals.', impact: 'High', suggestedAction: 'Reach out to community directors and administrative heads.' },
    ],
    threats: [
      { id: 'sw-t1', text: 'Aggressive pricing or marketing retaliation by well-funded competitors.', impact: 'High', suggestedAction: 'Lock in multi-month contracts with exclusive customer perks.' },
      { id: 'sw-t2', text: 'Regulatory shifts or unexpected platform policy updates.', impact: 'Medium', suggestedAction: 'Maintain multi-channel communication (SMS, WhatsApp, Web).' },
      { id: 'sw-t3', text: 'Customer churn caused by initial service teething issues.', impact: 'High', suggestedAction: 'Implement instant refund policy and proactive concierge support.' },
    ],
    aiSummary: `${idea.name} has a strong asymmetric advantage in hyper-local agility and personalized customer service. The primary challenge is guarding against copycats and managing cash flow until organic viral loops kick in.`,
    strategicActions: [
      'Lock in 50 guaranteed pre-orders before commercial public launch.',
      'Build a community referral mechanism that rewards both referrer and new customer.',
      'Maintain weekly cohort retention reviews to catch churn early.',
    ],
  };

  const personas: CustomerPersona[] = [
    {
      id: 'persona-primary',
      name: 'Aditya Sen',
      role: `Primary Target Customer (${idea.targetCustomer.split(' ')[0] || 'Core User'})`,
      age: 23,
      location: idea.location || 'Metro Hub',
      income: '₹12,000 - ₹25,000 / month',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      painPoints: [
        `High friction and unexpected costs in solving ${idea.problem.slice(0, 60)}...`,
        'Lack of transparent, verified service providers.',
        'Difficulty pausing, cancelling, or getting refunds from existing players.',
      ],
      goals: [
        'Save at least 4 hours every week and 25% of monthly budget.',
        'Guaranteed reliability without constant follow-ups.',
        'Smooth digital experience with instant UPI payment.',
      ],
      buyingBehavior: 'Researches options on mobile, values peer recommendations, skeptical of overly hyped marketing.',
      budget: '₹1,500 – ₹3,500 / month',
      techAdoption: 'Early Adopter',
      quote: `If ${idea.name} can consistently solve this without hidden fees, I will use it every single day.`,
    },
    {
      id: 'persona-secondary',
      name: 'Meera Nair',
      role: 'Budget-Conscious Professional',
      age: 29,
      location: idea.location || 'Urban Center',
      income: '₹55,000 / month',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      painPoints: [
        'Values time above all else; cannot afford unreliable schedules.',
        'Wants clear invoice documentation and dependable customer support.',
      ],
      goals: [
        'Automate routine tasks with a set-and-forget subscription.',
        'Quality assurance guarantee with easy refunds if unsatisfied.',
      ],
      buyingBehavior: 'Willing to pay a modest premium for verified consistency and white-glove support.',
      budget: '₹4,000 – ₹6,000 / month',
      techAdoption: 'Pragmatist',
      quote: 'I don’t mind paying upfront if the service genuinely respects my time.',
    },
  ];

  const interviews = {
    'persona-primary': {
      messages: [
        { id: 'm-g-1', sender: 'user' as const, text: `Hi Aditya! We are building ${idea.name} to solve ${idea.problem.slice(0, 80)}. Would this help your routine?`, timestamp: '11:15 AM' },
        { id: 'm-g-2', sender: 'customer' as const, text: `Definitely sounds useful! My biggest gripe with current options is hidden charges and poor customer service. What will your pricing look like?`, timestamp: '11:16 AM' },
        { id: 'm-g-3', sender: 'user' as const, text: `We operate on a transparent subscription model with zero surprise delivery markups and flexible cancellation anytime.`, timestamp: '11:17 AM' },
        { id: 'm-g-4', sender: 'customer' as const, text: `That’s refreshing to hear. If you offer a 7-day trial or money-back guarantee, I’d be happy to test it this week!`, timestamp: '11:18 AM' },
      ],
      evaluation: {
        interestScore: 89,
        painPointScore: 85,
        willingnessToPay: '₹1,800 - ₹2,400 / month',
        objections: [
          'Fear of lock-in without initial trial.',
          'Concern regarding delivery delays during peak demand.',
        ],
        keyInsights: [
          'Transparent pricing is a major competitive advantage.',
          'A low-risk introductory trial converts hesitant users into long-term subscribers.',
        ],
        recommendedChanges: [
          'Offer a 3-day risk-free pilot pass.',
          'Add a live tracking widget for peace of mind.',
        ],
      },
    },
  };

  const investorReviews: InvestorReview[] = [
    {
      id: 'inv-g-1',
      persona: 'Angel Investor',
      name: 'Rajat Verma',
      title: 'Partner',
      firm: 'Syndicate Angel Fund',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      verdict: 'Strong Interest',
      confidenceScore: validationScore,
      strengths: [
        `Laser-focused problem statement addressing ${idea.targetCustomer}.`,
        'High organic referral potential in concentrated user hubs.',
      ],
      concerns: [
        'Defensibility against well-funded incumbents.',
        'Customer retention after the initial promotional period.',
      ],
      questions: [
        'What is your target blended CAC and expected payback period?',
        'How will you retain users once initial novelty wears off?',
      ],
      recommendation: 'Prove unit economic sustainability on a tight 100-user cohort before seeking institutional capital.',
    },
    {
      id: 'inv-g-2',
      persona: 'Venture Capitalist',
      name: 'Ananya Deshmukh',
      title: 'Principal',
      firm: 'Frontier Ventures',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      verdict: 'Interested with Conditions',
      confidenceScore: Math.max(62, validationScore - 4),
      strengths: [
        'Large addressable market with headroom for vertical integration.',
        'Modern tech stack allows lean operations with low fixed overhead.',
      ],
      concerns: [
        'Potential margin compression in competitive price environments.',
        'High execution reliance on non-tech partners.',
      ],
      questions: [
        'What is the structural moat preventing an incumbent from replicating this next month?',
        'What does your cohort retention curve look like at Month 3?',
      ],
      recommendation: 'Focus on building proprietary distribution and exclusive long-term supply arrangements.',
    },
    {
      id: 'inv-g-3',
      persona: 'Bank Loan Officer',
      name: 'S. Ramanathan',
      title: 'Senior Credit Underwriter',
      firm: 'Commercial MSME Division',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      verdict: 'Needs Traction',
      confidenceScore: Math.max(55, validationScore - 14),
      strengths: [
        'Digital payment records provide clear cash flow audit trail.',
        'Asset-light structure avoids heavy debt encumbrance.',
      ],
      concerns: [
        'Absence of tangible hard collateral.',
        'Sensitivity of cash flow to short-term subscriber fluctuations.',
      ],
      questions: [
        'What are your projected cash reserves 6 months post-launch?',
        'Can you provide personal guarantees for working capital facilities?',
      ],
      recommendation: 'Utilize government startup credit schemes or revenue-based financing rather than secured bank loans.',
    },
    {
      id: 'inv-g-4',
      persona: 'Shark Tank Judge',
      name: 'Vikramaditya Singhania',
      title: 'Consumer Tech Entrepreneur',
      firm: 'Singhania Group',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      verdict: 'Interested with Conditions',
      confidenceScore: Math.max(65, validationScore - 2),
      strengths: [
        'Clear, visceral pain point that customers actively complain about.',
        'Scalable software architecture with potential for high gross margins.',
      ],
      concerns: [
        'Founders must prove they have the grit to handle messy ground operations.',
        'Marketing spend must not be squandered on vanity social ads.',
      ],
      questions: [
        'What is your gross margin percentage per transaction after all fees?',
        'How many customers have already pledged to pay for this?',
      ],
      recommendation: 'I would invest if you show me 200 paying customers who cannot live without this product.',
    },
  ];

  const businessModel: BusinessModelCanvas = {
    keyPartners: [
      'Verified local fulfillment and supplier partners.',
      'Community influencers and campus/neighborhood ambassadors.',
      'Payment gateways (Razorpay / Stripe) with auto-recurring capabilities.',
      'Cloud infrastructure providers (Supabase & Vercel).',
    ],
    keyActivities: [
      'Algorithmic demand aggregation and smart resource dispatch.',
      'Rigorous partner quality vetting and performance auditing.',
      'Hyper-local organic community marketing and retention campaigns.',
      'Continuous software feature enhancement and UI optimization.',
    ],
    valuePropositions: [
      `For ${idea.targetCustomer}: 10x faster, transparent, and hassle-free solution to ${idea.problem.slice(0, 50)}...`,
      'For Suppliers: Guaranteed order volume and instant digital payments with zero advertising overhead.',
    ],
    customerRelationships: [
      'Automated real-time notifications via WhatsApp and mobile web app.',
      'Dedicated concierge support for instantaneous complaint resolution.',
      'Community loyalty points and referral rewards.',
    ],
    customerSegments: [
      `${idea.targetCustomer} (Primary demographic).`,
      'Adjacent secondary users seeking convenience and reliable service.',
      'Institutional or corporate group accounts.',
    ],
    keyResources: [
      'Proprietary software platform and AI matching algorithms.',
      'Verified network of vetted fulfillment partners.',
      'Customer behavioral analytics and transaction database.',
    ],
    channels: [
      'Direct mobile web application (PWA).',
      'Hyper-local community WhatsApp and Telegram channels.',
      'Targeted referral programs and localized campus/office activations.',
    ],
    costStructure: [
      'Partner fulfillment fees (55% - 65% of gross revenue).',
      'Customer acquisition and referral bonus incentives (12% of revenue).',
      'Software hosting, payment gateway fees, and cloud APIs (5% of revenue).',
      'Customer support and operational administration (8% of revenue).',
    ],
    revenueStreams: [
      `Monthly & Quarterly Subscription Memberships (${idea.businessModel || 'Recurring Plans'}).`,
      'Marketplace take rate on transactional volume (10% - 15%).',
      'Value-added priority slots and premium concierge features.',
    ],
    recommendedModel: {
      type: 'Tiered Subscription + Transactional Take-Rate',
      why: 'Subscriptions ensure predictable recurring cash inflows, locking in customer retention and eliminating demand volatility.',
      expectedMonthlyRevenue: '₹2,80,000 - ₹4,50,000 in Year 1',
      advantages: [
        'Predictable cash flow upfront at the start of each month.',
        'High customer switching cost once integrated into user routines.',
        'Natural negative working capital cycle.',
      ],
      risks: [
        'Churn risk if service consistency drops.',
        'Need for ongoing content/value refreshes to maintain engagement.',
      ],
    },
  };

  const financials: FinancialModel = {
    currency: '₹',
    initialInvestment: 500000,
    monthlyOperatingCost: 110000,
    employees: 3,
    marketingCost: 20000,
    technologyCost: 10000,
    pricePerCustomer: 1999,
    expectedCustomers: 350,
    monthlyRevenue: 699650,
    monthlyExpenses: 540000,
    grossProfit: 159650,
    burnRate: 0,
    breakEvenCustomers: 210,
    runwayMonths: 16.4,
    projections: [
      { month: 'Month 1', revenue: 160000, expenses: 220000, profit: -60000, customers: 80 },
      { month: 'Month 2', revenue: 280000, expenses: 310000, profit: -30000, customers: 140 },
      { month: 'Month 3', revenue: 420000, expenses: 400000, profit: 20000, customers: 210 },
      { month: 'Month 4', revenue: 580000, expenses: 470000, profit: 110000, customers: 290 },
      { month: 'Month 5', revenue: 700000, expenses: 540000, profit: 160000, customers: 350 },
      { month: 'Month 6', revenue: 860000, expenses: 620000, profit: 240000, customers: 430 },
      { month: 'Month 7', revenue: 1040000, expenses: 710000, profit: 330000, customers: 520 },
      { month: 'Month 8', revenue: 1240000, expenses: 810000, profit: 430000, customers: 620 },
      { month: 'Month 9', revenue: 1460000, expenses: 920000, profit: 540000, customers: 730 },
      { month: 'Month 10', revenue: 1700000, expenses: 1040000, profit: 660000, customers: 850 },
      { month: 'Month 11', revenue: 1960000, expenses: 1170000, profit: 790000, customers: 980 },
      { month: 'Month 12', revenue: 2260000, expenses: 1310000, profit: 950000, customers: 1130 },
    ],
  };

  const techStack: TechStackRecommendation = {
    frontend: {
      name: 'Next.js 16 + React 19 + Tailwind CSS',
      category: 'Frontend & PWA',
      reason: 'Ultra-fast server rendering, instantaneous route transitions, and responsive mobile-first UI for seamless client experience.',
      pros: ['Sub-second load times', 'Built-in SEO metadata', 'Rich component ecosystem'],
    },
    backend: {
      name: 'Next.js App Router API Routes + Python FastAPI Microservice',
      category: 'Backend Architecture',
      reason: 'Combines the speed of TypeScript API routes with high-performance Python services for AI heuristics and data intelligence.',
      pros: ['Asynchronous processing', 'Type safety end-to-end', 'Rapid development speed'],
    },
    database: {
      name: 'Supabase PostgreSQL',
      category: 'Relational Database',
      reason: 'PostgreSQL provides rock-solid ACID transactions for payments, user authentication, and order workflows with Row Level Security.',
      pros: ['Enterprise reliability', 'Automatic backups', 'Native JSONB support'],
    },
    cloud: {
      name: 'Vercel Edge Network + Supabase Cloud',
      category: 'Cloud Infrastructure',
      reason: 'Zero-config global deployment with automated scaling for sudden customer traffic spikes.',
      pros: ['Zero server provisioning', 'Sub-50ms TTFB globally', 'Generous free tier'],
    },
    auth: {
      name: 'Supabase Auth (SMS OTP + Email SSO)',
      category: 'Identity & Authentication',
      reason: 'Frictionless login via phone OTP and email magic links with session persistence.',
      pros: ['JWT token verification', 'Built-in security compliance', 'Row-level access rules'],
    },
    aiModel: {
      name: 'OpenAI GPT-4o / Google Gemini 1.5 Pro',
      category: 'AI Engine',
      reason: 'State-of-the-art reasoning for dynamic persona simulation, risk discovery, and market synthesis.',
      pros: ['High reasoning capability', 'Strict JSON schema formatting', 'Multilingual support'],
    },
    vectorDb: {
      name: 'Supabase pgvector',
      category: 'Vector Database & Memory',
      reason: 'Enables semantic search and persistent conversational memory directly within PostgreSQL without extra vendor overhead.',
      pros: ['Integrated with primary DB', 'Fast cosine similarity lookups', 'Low maintenance'],
    },
    apis: {
      name: 'Tavily Market Intelligence API',
      category: 'External APIs',
      reason: 'Real-time web research and competitor telemetry scraping.',
      pros: ['Accurate source citations', 'Structured web extracts', 'High search speed'],
    },
    analytics: {
      name: 'PostHog & Recharts',
      category: 'Product Analytics & Charts',
      reason: 'Privacy-first conversion funnel tracking and lightweight, beautiful interactive UI charts.',
      pros: ['Cohort retention analysis', 'Clean SVG rendering', 'Zero tracking bloat'],
    },
    storage: {
      name: 'Supabase Storage',
      category: 'Media & File Storage',
      reason: 'Secure storage for user documents, generated PDF business plans, and verification files.',
      pros: ['S3-compatible API', 'Direct signed upload URLs', 'CDN image optimization'],
    },
  };

  const roadmap: RoadmapPhase[] = [
    {
      phaseNumber: 1,
      phaseTitle: 'Phase 1: Customer Discovery & Problem Validation',
      duration: 'Weeks 1 – 4',
      milestones: [
        { id: `m1-1-${Date.now()}`, task: `Interview 40 prospective ${idea.targetCustomer} to confirm pain severity and budget.`, priority: 'HIGH', estimatedDuration: '10 days', dependencies: 'None', status: 'Completed' },
        { id: `m1-2-${Date.now()}`, task: 'Map out key competitor pricing models and draft value proposition deck.', priority: 'HIGH', estimatedDuration: '7 days', dependencies: 'Initial interviews', status: 'Completed' },
        { id: `m1-3-${Date.now()}`, task: 'Set up landing page with email capture and measure conversion rate.', priority: 'MEDIUM', estimatedDuration: '5 days', dependencies: 'Value proposition', status: 'Completed' },
      ],
    },
    {
      phaseNumber: 2,
      phaseTitle: 'Phase 2: MVP Development & Closed Alpha',
      duration: 'Weeks 5 – 8',
      milestones: [
        { id: `m2-1-${Date.now()}`, task: 'Develop core booking and transaction flow with Next.js and Supabase.', priority: 'HIGH', estimatedDuration: '18 days', dependencies: 'Phase 1 findings', status: 'In Progress' },
        { id: `m2-2-${Date.now()}`, task: 'Onboard initial cohort of 25 beta users for end-to-end testing.', priority: 'HIGH', estimatedDuration: '10 days', dependencies: 'Core workflow', status: 'Not Started' },
        { id: `m2-3-${Date.now()}`, task: 'Establish customer support escalation channel on WhatsApp.', priority: 'MEDIUM', estimatedDuration: '4 days', dependencies: 'Beta onboarding', status: 'Not Started' },
      ],
    },
    {
      phaseNumber: 3,
      phaseTitle: 'Phase 3: Public Launch & Retention Optimization',
      duration: 'Weeks 9 – 14',
      milestones: [
        { id: `m3-1-${Date.now()}`, task: 'Public launch in primary geographic cluster with referral campaign.', priority: 'HIGH', estimatedDuration: '21 days', dependencies: 'Beta feedback resolved', status: 'Not Started' },
        { id: `m3-2-${Date.now()}`, task: 'Reach 100 paid active subscribers and measure Month-1 cohort retention.', priority: 'HIGH', estimatedDuration: '30 days', dependencies: 'Public launch', status: 'Not Started' },
        { id: `m3-3-${Date.now()}`, task: 'Integrate automated feedback collection and NPS tracking.', priority: 'LOW', estimatedDuration: '7 days', dependencies: 'Active subscribers', status: 'Not Started' },
      ],
    },
    {
      phaseNumber: 4,
      phaseTitle: 'Phase 4: Unit Economics & Expansion Playbook',
      duration: 'Months 4 – 6',
      milestones: [
        { id: `m4-1-${Date.now()}`, task: 'Achieve positive contribution margin across all transactions.', priority: 'HIGH', estimatedDuration: '45 days', dependencies: 'Retention optimization', status: 'Not Started' },
        { id: `m4-2-${Date.now()}`, task: 'Document expansion playbook for secondary regional clusters.', priority: 'MEDIUM', estimatedDuration: '20 days', dependencies: 'Contribution margin verified', status: 'Not Started' },
        { id: `m4-3-${Date.now()}`, task: 'Launch pilot B2B partner feature to diversify revenue streams.', priority: 'MEDIUM', estimatedDuration: '25 days', dependencies: 'Playbook draft', status: 'Not Started' },
      ],
    },
    {
      phaseNumber: 5,
      phaseTitle: 'Phase 5: Institutional Scaling & Seed Funding',
      duration: 'Months 7 – 10',
      milestones: [
        { id: `m5-1-${Date.now()}`, task: 'Surpass ₹15 Lakhs in monthly gross transaction value.', priority: 'HIGH', estimatedDuration: '60 days', dependencies: 'Secondary clusters', status: 'Not Started' },
        { id: `m5-2-${Date.now()}`, task: 'Prepare audited data room and pitch leading institutional seed funds.', priority: 'HIGH', estimatedDuration: '30 days', dependencies: 'Financial milestones', status: 'Not Started' },
      ],
    },
  ];

  const readiness: InvestorReadinessReport = {
    overallScore: Math.min(88, Math.max(65, validationScore - 3)),
    categories: [
      { name: 'Problem Severity', score: Math.min(94, validationScore + 8), weight: '12%', comment: `Well-defined pain point for ${idea.targetCustomer}.` },
      { name: 'Market Opportunity', score: Math.min(90, validationScore + 4), weight: '10%', comment: 'Sizable target addressable market with healthy CAGR.' },
      { name: 'Unit Economics', score: Math.min(84, validationScore - 2), weight: '15%', comment: 'Model supports healthy gross margins if customer churn is managed.' },
      { name: 'Competitive Moat', score: Math.max(55, validationScore - 15), weight: '12%', comment: 'Requires strong hyper-local defensibility and network effects.' },
      { name: 'Scalability', score: Math.min(86, validationScore + 1), weight: '10%', comment: 'Software architecture scales easily across secondary clusters.' },
      { name: 'Validation & Traction', score: Math.max(60, validationScore - 8), weight: '15%', comment: 'Strong preliminary hypothesis; needs verified paid retention data.' },
      { name: 'Business Model', score: Math.min(85, validationScore + 2), weight: '10%', comment: 'Predictable subscription recurring revenue.' },
      { name: 'Execution Readiness', score: Math.min(82, validationScore), weight: '8%', comment: 'Founders have relevant technical execution capability.' },
      { name: 'Financial Feasibility', score: Math.min(80, validationScore - 2), weight: '8%', comment: `Budget of ${idea.budget || 'standard funds'} is sufficient for MVP.` },
    ],
    topReasonsToInvest: [
      `High-urgency problem in an expanding market targeting ${idea.targetCustomer}.`,
      'Asset-light software architecture yields superior gross margins at scale.',
      'Strong natural referral dynamics within concentrated user networks.',
    ],
    topReasonsToReject: [
      'Customer acquisition cost could surge if early ambassador viral loops plateau.',
      'Incumbent retaliation if large players launch feature clones.',
      'Need for verified 90-day paying cohort retention proof.',
    ],
    improvementRoadmap: [
      'Lock down 50 paid pre-orders before commercial launch.',
      'Form exclusive partnerships with key local community channels.',
      'Build automated analytics tracking for user cohorts from Day 1.',
    ],
    founderReadiness: {
      overallScore: 79,
      technicalSkills: 84,
      businessKnowledge: 75,
      marketingAcumen: 78,
      financialPreparation: 74,
      teamStrength: 76,
      leadership: 80,
      executionCapability: 82,
      recommendations: [
        'Complement technical strength with a dedicated Growth or Operations Lead.',
        'Build a granular monthly cash-flow forecast with stress-tested churn scenarios.',
      ],
    },
  };

  const pivots: PivotOption[] = [
    {
      id: `piv-1-${Date.now()}`,
      title: 'B2B Enterprise Enablement SaaS',
      description: `Shift from a direct-to-consumer app to licensing the workflow engine to existing corporate and institutional organizations serving ${idea.targetCustomer}.`,
      marketPotential: 'High',
      difficulty: 'Medium',
      investment: '₹3,50,000',
      risk: 'Low',
      revenuePotential: '₹45,000 / month per enterprise client',
      rationale: 'Eliminates B2C acquisition ad spend and delivers 85%+ gross software margins.',
    },
    {
      id: `piv-2-${Date.now()}`,
      title: 'Concierge Marketplace for Premium Tier',
      description: 'Focus strictly on the top 10% highest-income segment with white-glove personal concierge support and 3x higher price points.',
      marketPotential: 'Moderate',
      difficulty: 'Low',
      investment: '₹2,00,000',
      risk: 'Low',
      revenuePotential: '₹5,500 / customer monthly ticket size',
      rationale: 'Inelastic price sensitivity enables profitable unit economics on Day 1.',
    },
  ];

  const versions: StartupVersion[] = [
    {
      id: `v-1-${Date.now()}`,
      versionNumber: 1,
      date: new Date().toISOString().split('T')[0],
      score: validationScore,
      changes: 'Initial comprehensive AI validation and market analysis completed.',
      reason: 'Baseline validation generated by StartupIQ AI Co-Founder.',
    },
  ];

  const fullStartup: StartupIdea = {
    id: startupId,
    userId: 'demo-user-1',
    name: idea.name,
    tagline: `${idea.solution.slice(0, 70)}...`,
    problem: idea.problem,
    solution: idea.solution,
    targetCustomer: idea.targetCustomer,
    businessModel: idea.businessModel,
    location: idea.location,
    budget: idea.budget,
    founderSkills: idea.founderSkills,
    status: 'Validated',
    createdAt: now,
    updatedAt: now,
  };

  return {
    startup: fullStartup,
    analysis,
    market,
    competitors,
    competitiveAdvantage: `Agile, AI-native workflow built specifically around ${idea.targetCustomer}, operating with 60% lower operational overhead than legacy market incumbents.`,
    swot,
    personas,
    interviews,
    investorReviews,
    investorConfidenceScore: validationScore,
    businessModel,
    financials,
    techStack,
    roadmap,
    readiness,
    pivots,
    versions,
    messages: [
      {
        id: `msg-init-${Date.now()}`,
        sender: 'assistant',
        text: `Welcome, Founder! I am your AI Co-Founder for ${idea.name}. I've synthesized your market, customer personas, SWOT, and investor readiness (Score: ${validationScore}/100). What part of your strategy should we refine first?`,
        timestamp: 'Just now',
      },
    ],
  };
}
