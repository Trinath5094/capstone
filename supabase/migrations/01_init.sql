-- StartupIQ PostgreSQL / Supabase Initial Schema
-- Enables pgvector for AI Co-Founder semantic retrieval

create extension if not exists vector;

-- 1. User Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'founder',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Startups
create table if not exists public.startups (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  tagline text,
  problem text not null,
  solution text not null,
  target_customer text not null,
  business_model text,
  location text,
  budget text,
  founder_skills text,
  status text default 'Draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Startup Versions
create table if not exists public.startup_versions (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  version_number int not null,
  content jsonb not null,
  score int,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Analyses
create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  validation_score int not null,
  summary text,
  breakdown jsonb,
  strengths jsonb,
  weaknesses jsonb,
  opportunities jsonb,
  risks jsonb,
  recommendations jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Market Research
create table if not exists public.market_research (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  tam text,
  sam text,
  som text,
  tam_value numeric,
  sam_value numeric,
  som_value numeric,
  cagr text,
  opportunity_score int,
  segments jsonb,
  growth_projection jsonb,
  trends jsonb,
  failed_predecessors jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Competitors
create table if not exists public.competitors (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  name text not null,
  pricing text,
  target_market text,
  strength text,
  weakness text,
  differentiator text,
  market_share numeric,
  price_point int,
  feature_completeness int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. SWOT Analysis
create table if not exists public.swot_analysis (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  strengths jsonb,
  weaknesses jsonb,
  opportunities jsonb,
  threats jsonb,
  ai_summary text,
  strategic_actions jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Customer Personas
create table if not exists public.personas (
  id text primary key,
  startup_id text references public.startups(id) on delete cascade,
  name text not null,
  role text,
  age int,
  location text,
  income text,
  avatar text,
  pain_points jsonb,
  goals jsonb,
  buying_behavior text,
  budget text,
  tech_adoption text,
  quote text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Customer Interviews
create table if not exists public.customer_interviews (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  persona_id text references public.personas(id) on delete cascade,
  messages jsonb,
  evaluation jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Investor Reviews
create table if not exists public.investor_reviews (
  id text primary key,
  startup_id text references public.startups(id) on delete cascade,
  persona text not null,
  name text not null,
  title text,
  firm text,
  avatar text,
  verdict text,
  confidence_score int,
  strengths jsonb,
  concerns jsonb,
  questions jsonb,
  recommendation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Business Models
create table if not exists public.business_models (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  canvas jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. Financial Models
create table if not exists public.financial_models (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  currency text default '₹',
  initial_investment numeric,
  monthly_operating_cost numeric,
  employees int,
  marketing_cost numeric,
  technology_cost numeric,
  price_per_customer numeric,
  expected_customers int,
  monthly_revenue numeric,
  monthly_expenses numeric,
  gross_profit numeric,
  burn_rate numeric,
  break_even_customers int,
  runway_months numeric,
  projections jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. Technology Recommendations
create table if not exists public.technology_recommendations (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  stack jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. Roadmaps
create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  phases jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. Startup Scores & Readiness
create table if not exists public.startup_scores (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  overall_score int not null,
  categories jsonb,
  top_reasons_invest jsonb,
  top_reasons_reject jsonb,
  improvement_roadmap jsonb,
  founder_readiness jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. Conversations & pgvector Semantic Memory
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  title text default 'Co-Founder Chat',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender text not null check (sender in ('user', 'assistant')),
  content text not null,
  embedding vector(1536), -- OpenAI embedding vector
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. Reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  startup_id text references public.startups(id) on delete cascade,
  title text not null,
  report_type text default 'Full Dossier',
  format text default 'PDF',
  url text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. Row Level Security Policies
alter table public.profiles enable row level security;
alter table public.startups enable row level security;
alter table public.analyses enable row level security;
alter table public.market_research enable row level security;

-- Authenticated Users can only select and modify their own data
create policy "Users can view own startups" on public.startups
  for select using (auth.uid() = user_id);

create policy "Users can insert own startups" on public.startups
  for insert with check (auth.uid() = user_id);

create policy "Users can update own startups" on public.startups
  for update using (auth.uid() = user_id);
