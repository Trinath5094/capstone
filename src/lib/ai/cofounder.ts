import { CompleteStartupData } from '@/types/startup';

export function getCoFounderResponse(
  data: CompleteStartupData,
  userMessage: string
): string {
  const msg = userMessage.toLowerCase();
  const s = data.startup;
  const a = data.analysis;

  if (msg.includes('risk') || msg.includes('fail') || msg.includes('biggest problem')) {
    const topRisk = a.risks[0];
    return `Looking at ${s.name}, our #1 failure risk right now is: "${topRisk?.title || 'Customer acquisition cost spikes'}".
${topRisk?.explanation || ''}

My recommendation as your co-founder:
${topRisk?.recommendation || 'Focus on building hyper-local viral loops before scaling.'}
We shouldn't spend another rupee on broad ads until this is neutralized.`;
  }

  if (msg.includes('audience') || msg.includes('customer') || msg.includes('who')) {
    return `For ${s.name}, our core target is currently: "${s.targetCustomer}".
In our validation testing, this segment showed an interest score of 88/100, but they are extremely price-sensitive. 
If we expand to secondary audiences too early, our CAC will double. I recommend we focus 100% on the top 500 early adopters in this segment first.`;
  }

  if (msg.includes('revenue') || msg.includes('pricing') || msg.includes('money') || msg.includes('business model')) {
    return `Our current model is ${s.businessModel}.
According to our financial projections, our break-even threshold is ${data.financials.breakEvenCustomers} active paying customers at an average ticket size of ${data.financials.currency}${data.financials.pricePerCustomer}.
If we implement prepaid quarterly passes, our cash flow runway increases by 4.2 months without needing outside capital.`;
  }

  if (msg.includes('investor') || msg.includes('fund') || msg.includes('raise') || msg.includes('shark tank')) {
    return `Our Investor Readiness Score is ${data.readiness.overallScore}/100.
Investors like our problem severity and unit economics, but their main red flag is defensibility and customer churn. 
Before we pitch institutional seed funds, we need 60 consecutive days of paid cohort retention data to prove students don't churn after month one.`;
  }

  if (msg.includes('pivot') || msg.includes('alternative') || msg.includes('change idea')) {
    const p = data.pivots[0];
    return `If ${s.name} faces severe regulatory or seasonal friction, our highest-margin pivot option is:
👉 "${p?.title}": ${p?.description}
It has ${p?.marketPotential} market potential with ${p?.risk} execution risk and estimated revenue of ${p?.revenuePotential}. You can explore this in the Pivot Engine tab anytime.`;
  }

  // Default thoughtful co-founder response
  return `As your co-founder on ${s.name}, I'm focused on moving our validation score from ${a.validationScore}/100 to above 85.
Right now, our biggest operational bottleneck is closing the loop between our initial customer interest and consistent weekly delivery execution.
Should we review our AI Devil's Advocate risks, refine the Business Model Canvas, or run another simulation with our customer personas?`;
}
