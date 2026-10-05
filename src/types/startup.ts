export type RiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
export type MilestoneStatus = 'Not Started' | 'In Progress' | 'Completed';
export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface StartupIdea {
  id: string;
  userId: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  businessModel: string;
  location: string;
  budget: string;
  founderSkills: string;
  status: 'Draft' | 'Validated' | 'In Review' | 'Pivoting';
  createdAt: string;
  updatedAt: string;
}

export interface RiskItem {
  id: string;
  title: string;
  severity: RiskSeverity;
  category: 'Market' | 'Customer' | 'Revenue' | 'Technology' | 'Execution' | 'Competition';
  explanation: string;
  evidence: string;
  recommendation: string;
}

export interface StartupAnalysis {
  validationScore: number;
  breakdown: {
    problemStrength: number;
    solutionStrength: number;
    marketOpportunity: number;
    competition: number;
    businessModel: number;
    scalability: number;
    financialFeasibility: number;
    executionRisk: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: RiskItem[];
  recommendations: string[];
}

export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  age: number;
  location: string;
  income: string;
  avatar: string;
  painPoints: string[];
  goals: string[];
  buyingBehavior: string;
  budget: string;
  techAdoption: 'Early Adopter' | 'Pragmatist' | 'Conservative';
  quote: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'user' | 'customer';
  text: string;
  timestamp: string;
}

export interface CustomerInterviewEvaluation {
  interestScore: number; // 0 - 100
  painPointScore: number; // 0 - 100
  willingnessToPay: string;
  objections: string[];
  keyInsights: string[];
  recommendedChanges: string[];
}

export interface InvestorReview {
  id: string;
  persona: 'Angel Investor' | 'Venture Capitalist' | 'Bank Loan Officer' | 'Shark Tank Judge';
  name: string;
  title: string;
  firm: string;
  avatar: string;
  verdict: 'Strong Interest' | 'Interested with Conditions' | 'Needs Traction' | 'High Risk / Pass';
  confidenceScore: number; // 0 - 100
  strengths: string[];
  concerns: string[];
  questions: string[];
  recommendation: string;
}

export interface CompetitorItem {
  id: string;
  name: string;
  pricing: string;
  targetMarket: string;
  strength: string;
  weakness: string;
  differentiator: string;
  marketShare: number;
  pricePoint: number; // 1-10
  featureCompleteness: number; // 1-10
}

export interface SWOTItem {
  id: string;
  text: string;
  impact: 'High' | 'Medium' | 'Low';
  suggestedAction?: string;
}

export interface SWOTAnalysis {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  aiSummary: string;
  strategicActions: string[];
}

export interface BusinessModelCanvas {
  keyPartners: string[];
  keyActivities: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  customerSegments: string[];
  keyResources: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
  recommendedModel: {
    type: string;
    why: string;
    expectedMonthlyRevenue: string;
    advantages: string[];
    risks: string[];
  };
}

export interface FinancialModel {
  currency: string;
  initialInvestment: number;
  monthlyOperatingCost: number;
  employees: number;
  marketingCost: number;
  technologyCost: number;
  pricePerCustomer: number;
  expectedCustomers: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  grossProfit: number;
  burnRate: number;
  breakEvenCustomers: number;
  runwayMonths: number;
  projections: {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
    customers: number;
  }[];
}

export interface TechItem {
  name: string;
  category: string;
  reason: string;
  pros: string[];
}

export interface TechStackRecommendation {
  frontend: TechItem;
  backend: TechItem;
  database: TechItem;
  cloud: TechItem;
  auth: TechItem;
  aiModel: TechItem;
  vectorDb: TechItem;
  apis: TechItem;
  analytics: TechItem;
  storage: TechItem;
}

export interface RoadmapMilestone {
  id: string;
  task: string;
  priority: PriorityLevel;
  estimatedDuration: string;
  dependencies: string;
  status: MilestoneStatus;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  duration: string;
  milestones: RoadmapMilestone[];
}

export interface InvestorReadinessReport {
  overallScore: number;
  categories: {
    name: string;
    score: number;
    weight: string;
    comment: string;
  }[];
  topReasonsToInvest: string[];
  topReasonsToReject: string[];
  improvementRoadmap: string[];
  founderReadiness: {
    overallScore: number;
    technicalSkills: number;
    businessKnowledge: number;
    marketingAcumen: number;
    financialPreparation: number;
    teamStrength: number;
    leadership: number;
    executionCapability: number;
    recommendations: string[];
  };
}

export interface MarketResearchData {
  tam: string;
  sam: string;
  som: string;
  tamValue: number;
  samValue: number;
  somValue: number;
  currency: string;
  cagr: string;
  opportunityScore: number;
  segments: { name: string; percentage: number; value: string }[];
  growthProjection: { year: string; marketSize: number; projectedShare: number }[];
  trends: string[];
  failedPredecessors: {
    name: string;
    whatTheyTried: string;
    whyFailed: string;
    lesson: string;
    howToAvoid: string;
  }[];
}

export interface PivotOption {
  id: string;
  title: string;
  description: string;
  marketPotential: 'High' | 'Very High' | 'Moderate';
  difficulty: 'Low' | 'Medium' | 'High';
  investment: string;
  risk: 'Low' | 'Medium' | 'High';
  revenuePotential: string;
  rationale: string;
}

export interface StartupVersion {
  id: string;
  versionNumber: number;
  date: string;
  score: number;
  changes: string;
  reason: string;
}

export interface CoFounderMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface CompleteStartupData {
  startup: StartupIdea;
  analysis: StartupAnalysis;
  market: MarketResearchData;
  competitors: CompetitorItem[];
  competitiveAdvantage: string;
  swot: SWOTAnalysis;
  personas: CustomerPersona[];
  interviews: Record<string, { messages: InterviewMessage[]; evaluation: CustomerInterviewEvaluation }>;
  investorReviews: InvestorReview[];
  investorConfidenceScore: number;
  businessModel: BusinessModelCanvas;
  financials: FinancialModel;
  techStack: TechStackRecommendation;
  roadmap: RoadmapPhase[];
  readiness: InvestorReadinessReport;
  pivots: PivotOption[];
  versions: StartupVersion[];
  messages: CoFounderMessage[];
}
