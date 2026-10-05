import { CompleteStartupData, StartupIdea, MilestoneStatus, SWOTItem } from '@/types/startup';
import { demoDatabase } from '@/lib/mockData';

const STORAGE_KEY = 'startupiq_startups_db_v1';

export function getStoredStartups(): Record<string, CompleteStartupData> {
  if (typeof window === 'undefined') {
    return demoDatabase;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoDatabase));
      return demoDatabase;
    }
    const parsed = JSON.parse(raw);
    // Ensure demo startups are present
    return { ...demoDatabase, ...parsed };
  } catch (err) {
    console.warn('Failed to read from localStorage, using demo fallback', err);
    return demoDatabase;
  }
}

export function saveStartupData(data: CompleteStartupData): void {
  if (typeof window === 'undefined') return;
  try {
    const db = getStoredStartups();
    db[data.startup.id] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Error saving startup data', err);
  }
}

export function getStartupById(id: string): CompleteStartupData | null {
  const db = getStoredStartups();
  return db[id] || null;
}

export function updateMilestoneStatus(
  startupId: string,
  milestoneId: string,
  status: MilestoneStatus
): void {
  const data = getStartupById(startupId);
  if (!data) return;

  data.roadmap = data.roadmap.map((phase) => ({
    ...phase,
    milestones: phase.milestones.map((m) =>
      m.id === milestoneId ? { ...m, status } : m
    ),
  }));

  saveStartupData(data);
}

export function updateSWOT(
  startupId: string,
  quadrant: 'strengths' | 'weaknesses' | 'opportunities' | 'threats',
  items: SWOTItem[]
): void {
  const data = getStartupById(startupId);
  if (!data) return;

  data.swot[quadrant] = items;
  saveStartupData(data);
}

export function addCoFounderMessage(
  startupId: string,
  sender: 'user' | 'assistant',
  text: string
): void {
  const data = getStartupById(startupId);
  if (!data) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  data.messages.push({
    id: `msg-${Date.now()}`,
    sender,
    text,
    timestamp: timeStr,
  });

  saveStartupData(data);
}

export function deleteStartup(id: string): void {
  if (typeof window === 'undefined') return;
  const db = getStoredStartups();
  delete db[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function resetToDemoData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoDatabase));
}
