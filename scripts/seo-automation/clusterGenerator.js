// Keyword Cluster & Topic Idea Generator for LaunchGremlin
export const KEYWORD_CLUSTERS = {
  'Website Design': [
    'sub-second website speed guide', 'react vs wordpress for business',
    'core web vitals optimization 2026', 'high converting landing page anatomy'
  ],
  'AI Automation': [
    'how to build custom ai agents for business', 'ai workflow automation for small business',
    'retrieval augmented generation rag guide', 'ai lead qualification chatbots'
  ],
  'Small Business': [
    'local seo domination for small businesses', 'small business tech stack guide 2026',
    'how small businesses compete with enterprises', 'automating small business invoicing and crm'
  ],
  'Startup Growth': [
    'how to build a 72 hour mvp', 'b2b lead generation funnel blueprint',
    'fundraising pitch deck landing page', 'bootstrapping vs vc funding tech stack'
  ],
  'Personal Branding': [
    'building an executive personal brand', 'personal website design for thought leaders',
    'monetizing your expertise online', 'personal branding for founders and executives'
  ]
};

export function suggestNextTopic(clusterName = 'Website Design') {
  const topics = KEYWORD_CLUSTERS[clusterName] || KEYWORD_CLUSTERS['Website Design'];
  const randomIndex = Math.floor(Math.random() * topics.length);
  const baseKeyword = topics[randomIndex];
  
  return {
    cluster: clusterName,
    primaryKeyword: baseKeyword,
    suggestedTitle: `${baseKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}: Complete 2026 Strategy Guide`,
    suggestedSlug: baseKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  };
}
