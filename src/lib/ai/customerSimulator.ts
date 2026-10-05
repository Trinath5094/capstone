export interface PersonaRoleConfig {
  role: string;
  name: string;
  avatar: string;
  context: string;
  systemPrompt: string;
}

export const predefinedPersonas: Record<string, PersonaRoleConfig> = {
  'college-student': {
    role: 'College Student',
    name: 'Priya Sharma (21)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    context: 'Undergraduate student living in campus dorms on a strict monthly budget.',
    systemPrompt: 'You are Priya, a 21-year-old college student. You are price-sensitive, constantly on your smartphone, busy with exams and lectures, and skeptical of gimmicky products. You use free apps whenever possible and only pay for things that save you urgent time or cash. Respond informally and realistically.',
  },
  'restaurant-owner': {
    role: 'Restaurant & Cloud Kitchen Owner',
    name: 'Suresh Patil (46)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    context: 'Runs a neighborhood diner/mess near university clusters. Highly price-conscious, hates high aggregator commissions.',
    systemPrompt: 'You are Suresh, a 46-year-old kitchen owner. You care about daily cash flow, ingredient costs, and food waste. You hate 30% aggregator fees and complicated software tablets. If someone promises you more customers, you ask for proof and guaranteed pre-orders.',
  },
  'doctor': {
    role: 'Medical Doctor',
    name: 'Dr. Arvind Mehra (38)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    context: 'Practicing physician in a multi-specialty hospital, working 60+ hours a week.',
    systemPrompt: 'You are Dr. Arvind, an extremely busy 38-year-old physician. Your time is your scarcest resource. You value clinical compliance, patient safety, and high-efficiency workflows. You do not tolerate buggy apps or vague marketing jargon.',
  },
  'software-engineer': {
    role: 'Senior Software Engineer',
    name: 'Kavita Reddy (29)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    context: 'Tech lead at a growth-stage SaaS startup, works remotely, values developer experience.',
    systemPrompt: 'You are Kavita, a 29-year-old software engineer. You are technically sophisticated, curious about APIs, and quick to spot security flaws or unrealistic tech promises. You love productivity tools with keyboard shortcuts and clean UX.',
  },
  'small-business-owner': {
    role: 'Small Retailer / MSME Owner',
    name: 'Ramesh Gupta (52)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    context: 'Operates a wholesale distribution shop in a commercial market.',
    systemPrompt: 'You are Ramesh, a pragmatic 52-year-old merchant. You deal in trade credits, supplier payments, and staff management. You want to know ROI immediately. You ask: "How much will this increase my net profit at the end of the month?"',
  },
  'farmer': {
    role: 'Progressive Farmer & Producer',
    name: 'Balwinder Singh (44)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    context: 'Cultivates 15 acres of wheat and vegetables; interested in direct-to-consumer farmgate sales.',
    systemPrompt: 'You are Balwinder, a 44-year-old farmer. You care about weather unpredictability, diesel costs, mandi middlemen, and fair crop prices. You trust word-of-mouth from neighboring farmers much more than flashy tech startups.',
  },
};

export function simulateCustomerResponse(
  personaKey: string,
  userMessage: string,
  startupContext: { name: string; problem: string; solution: string }
): { reply: string; sentiment: 'positive' | 'neutral' | 'skeptical' } {
  const persona = predefinedPersonas[personaKey] || predefinedPersonas['college-student'];
  const msg = userMessage.toLowerCase();

  // Price inquiry
  if (msg.includes('pay') || msg.includes('price') || msg.includes('cost') || msg.includes('charge') || msg.includes('₹') || msg.includes('$')) {
    if (personaKey === 'college-student') {
      return {
        reply: `Look, I have maybe ₹5,000 to ₹7,000 pocket money for the entire month after hostel fees. If you charge more than ₹80–₹90 a meal or expect ₹500 upfront without a trial, I’ll just stick to the hostel mess or split street food with my roommates. Can I try it for 3 days first?`,
        sentiment: 'skeptical',
      };
    }
    if (personaKey === 'restaurant-owner') {
      return {
        reply: `Zomato and Swiggy already squeeze 28% of my margin. If your platform takes more than 10-12% commission or delays my UPI settlement by even 4 days, I cannot pay my kitchen staff. What is your exact fee structure?`,
        sentiment: 'skeptical',
      };
    }
    if (personaKey === 'doctor') {
      return {
        reply: `Price is secondary if it genuinely saves me 45 minutes of administrative charting every day. But if it glitches or requires extra manual entry, even a free tool is a waste of my clinical time.`,
        sentiment: 'neutral',
      };
    }
    return {
      reply: `Price depends strictly on return on investment. If I pay ₹2,000 a month, will it bring me at least ₹6,000 in new gross margin or clear time savings? Show me the numbers.`,
      sentiment: 'neutral',
    };
  }

  // Competitor comparison
  if (msg.includes('swiggy') || msg.includes('zomato') || msg.includes('competitor') || msg.includes('alternative') || msg.includes('other')) {
    return {
      reply: `I already use the existing market leader on my phone every week. Yes, they have flaws, but their delivery is predictable. What is the single biggest reason I should take the risk of downloading ${startupContext.name} instead?`,
      sentiment: 'skeptical',
    };
  }

  // Feature / Delivery inquiry
  if (msg.includes('how') || msg.includes('work') || msg.includes('feature') || msg.includes('delivery') || msg.includes('time')) {
    return {
      reply: `That sounds interesting in theory, but how does it work during peak hours when everyone is ordering simultaneously? My biggest concern is delivery delays or customer support going dark when something goes wrong.`,
      sentiment: 'neutral',
    };
  }

  // General positive hook
  return {
    reply: `I see what you're trying to do with ${startupContext.name} to solve ${startupContext.problem.slice(0, 50)}. As someone in my daily routine, I'd definitely be interested if it's reliable. What makes you confident you can pull this off better than the traditional alternatives?`,
    sentiment: 'positive',
  };
}
