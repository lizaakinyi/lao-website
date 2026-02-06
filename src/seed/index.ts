import type { Payload } from 'payload'

function lexicalParagraph(text: string) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function lexicalHeading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    tag,
    children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function lexicalDoc(children: ReturnType<typeof lexicalParagraph>[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const articles = [
  {
    title: 'Why African Startups Need a Sustainability Strategy From Day One',
    slug: 'why-african-startups-need-sustainability-strategy',
    excerpt:
      'Sustainability is not a luxury for mature companies. For African startups navigating global funding, it is a competitive advantage that starts at inception.',
    category: 'thoughts' as const,
    status: 'published' as const,
    publishedDate: '2026-01-15T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('The Sustainability Imperative'),
      lexicalParagraph(
        'African startups face a unique paradox: the continent hosts some of the world\'s most pressing sustainability challenges, yet many founders treat ESG as an afterthought. This approach is increasingly untenable.',
      ),
      lexicalParagraph(
        'Global investors now screen for sustainability metrics early. A 2025 survey by the African Venture Capital Association found that 68% of LPs factor ESG readiness into due diligence. Founders who embed sustainability from day one are not just doing good — they are de-risking their cap tables.',
      ),
      lexicalHeading('Three Practical Steps'),
      lexicalParagraph(
        'First, map your impact chain. Identify where your operations create environmental or social value, and where they create risk. Second, set measurable targets early, even if modest. Third, communicate your sustainability story in investor materials from the seed stage.',
      ),
      lexicalParagraph(
        'Sustainability strategy is not about perfection. It is about intentionality, measurement, and progress. The startups that understand this today will be the ones attracting global capital tomorrow.',
      ),
    ]),
  },
  {
    title: '5 Funding Myths Holding Back East African Founders',
    slug: '5-funding-myths-holding-back-east-african-founders',
    excerpt:
      'From "you need Silicon Valley connections" to "bootstrapping is always better," these persistent myths are costing founders real opportunities.',
    category: 'funding' as const,
    status: 'published' as const,
    publishedDate: '2026-01-22T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('Myth 1: You Need Silicon Valley Connections'),
      lexicalParagraph(
        'The African VC ecosystem has matured significantly. Local and pan-African funds now deploy more capital than ever. While global networks help, they are not prerequisites. Strong local investor relationships and a clear growth thesis matter more.',
      ),
      lexicalHeading('Myth 2: Bootstrapping Is Always Better'),
      lexicalParagraph(
        'Bootstrapping builds discipline, but it also limits scale. In markets where speed-to-market determines winners, strategic funding accelerates growth without sacrificing control — if the terms are right.',
      ),
      lexicalHeading('Myth 3: Revenue First, Fundraise Later'),
      lexicalParagraph(
        'Pre-revenue fundraising is common globally and increasingly accepted in Africa. What investors want is evidence of product-market fit, not necessarily revenue. Pilot customers, letters of intent, and waitlists demonstrate traction.',
      ),
      lexicalHeading('Myth 4: Grant Money Is Free Money'),
      lexicalParagraph(
        'Grants carry reporting obligations, restricted use clauses, and opportunity costs. They are valuable tools but not substitutes for sustainable revenue models.',
      ),
      lexicalHeading('Myth 5: Only Tech Startups Get Funded'),
      lexicalParagraph(
        'Agribusiness, healthcare, education, and climate adaptation ventures are attracting record investment across Africa. The key is demonstrating scalable impact, not just a tech stack.',
      ),
    ]),
  },
  {
    title: 'The Heart + Strategy Operating System: What It Means for Your Venture',
    slug: 'heart-strategy-operating-system',
    excerpt:
      'Business rigor and human empathy are not opposing forces. The Heart + Strategy framework integrates both to build ventures that scale sustainably.',
    category: 'thoughts' as const,
    status: 'published' as const,
    publishedDate: '2026-01-29T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('Beyond the False Dichotomy'),
      lexicalParagraph(
        'The startup world loves its dichotomies: move fast or be careful, scale or serve, profit or purpose. The Heart + Strategy operating system rejects these false choices.',
      ),
      lexicalParagraph(
        'At its core, this framework asks: How do we build organizations that are simultaneously rigorous in execution and deeply human in culture? The answer lies in systems thinking.',
      ),
      lexicalHeading('The Four Pillars'),
      lexicalParagraph(
        'Purpose-driven strategy: every business decision traces back to a clearly articulated mission. Data-informed empathy: quantitative metrics paired with qualitative human insight. Sustainable growth: scaling at a pace the team and market can sustain. Inclusive leadership: building diverse teams that reflect the markets you serve.',
      ),
      lexicalParagraph(
        'This is not soft management theory. It is a practical operating system that founders across East Africa are using to build ventures that attract talent, retain customers, and scale with integrity.',
      ),
    ]),
  },
  {
    title: 'Q1 2026 Pan-African Venture Capital: Key Trends',
    slug: 'q1-2026-pan-african-venture-capital-trends',
    excerpt:
      'Venture capital flows into Africa shifted meaningfully in early 2026. Here are the trends shaping where capital is going and why.',
    category: 'business-news' as const,
    status: 'published' as const,
    publishedDate: '2026-02-01T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('Overview'),
      lexicalParagraph(
        'Q1 2026 saw $1.2B in disclosed VC funding across Africa, a 15% increase year-over-year. The Big Four markets (Nigeria, Kenya, Egypt, South Africa) captured 72% of deal volume, but smaller ecosystems showed meaningful growth.',
      ),
      lexicalHeading('Sector Shifts'),
      lexicalParagraph(
        'Climate tech surged to 18% of total funding, up from 11% in Q1 2025. Fintech remains dominant at 31% but is diversifying beyond payments into insurance, lending, and wealth management. Healthtech deals doubled, driven by telemedicine and diagnostic AI.',
      ),
      lexicalHeading('Investor Landscape'),
      lexicalParagraph(
        'Pan-African funds are deploying larger tickets. Five funds crossed the $100M AUM threshold this quarter. Meanwhile, DFI co-investment is accelerating, with the IFC and AfDB both launching new blended finance vehicles targeting Series A and B rounds.',
      ),
      lexicalParagraph(
        'The trend is clear: African venture capital is maturing, diversifying, and scaling. Founders who understand these dynamics position themselves to capture the right capital at the right time.',
      ),
    ]),
  },
  {
    title: 'How to Tell Your Startup Story to Global Investors',
    slug: 'how-to-tell-startup-story-global-investors',
    excerpt:
      'Global investors see thousands of pitches. The founders who win are not the ones with the best metrics — they are the ones who tell the most compelling story.',
    category: 'funding' as const,
    status: 'published' as const,
    publishedDate: '2026-02-03T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('The Narrative Advantage'),
      lexicalParagraph(
        'Data wins deals, but narrative opens doors. When a global investor encounters an African startup for the first time, they need context that numbers alone cannot provide. Your story bridges the gap between unfamiliar markets and familiar investment theses.',
      ),
      lexicalHeading('Structure Your Story'),
      lexicalParagraph(
        'Lead with the problem, not the solution. Global investors understand problems. Then show why this problem is acute in your market. Next, demonstrate why your team is uniquely positioned to solve it. Finally, show traction as proof of thesis, not just growth metrics.',
      ),
      lexicalHeading('Common Mistakes'),
      lexicalParagraph(
        'Avoid jargon that assumes market familiarity. Do not compare your startup to Western companies unless the parallel is genuinely illuminating. And never undersell your market — Africa\'s consumer markets are growing faster than any other region.',
      ),
    ]),
  },
  {
    title: 'Rigor with Respect: Building Teams That Scale Across African Markets',
    slug: 'rigor-with-respect-building-teams-across-africa',
    excerpt:
      'Scaling across multiple African markets demands operational rigor. But the most successful companies pair that rigor with deep cultural respect.',
    category: 'thoughts' as const,
    status: 'published' as const,
    publishedDate: '2026-02-05T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('The Multi-Market Challenge'),
      lexicalParagraph(
        'Africa is 54 countries, hundreds of languages, and vastly different regulatory environments. Scaling across these markets requires more than copy-paste expansion. It demands deep local understanding paired with consistent operational standards.',
      ),
      lexicalHeading('Building Cultural Intelligence'),
      lexicalParagraph(
        'The best pan-African teams invest in cultural intelligence as a core competency. This means hiring local leaders, adapting communication styles, and respecting that business norms vary significantly between Nairobi, Lagos, and Johannesburg.',
      ),
      lexicalParagraph(
        'Rigor without respect breeds resentment and turnover. Respect without rigor creates inconsistency and missed targets. The companies that find the balance between both are the ones that successfully scale from one market to five.',
      ),
    ]),
  },
  {
    title: 'ESG Reporting for African SMEs: A Practical Starting Point',
    slug: 'esg-reporting-african-smes-practical-guide',
    excerpt:
      'ESG reporting doesn\'t have to be overwhelming. Here is a pragmatic framework for African SMEs to start measuring and communicating their impact.',
    category: 'business-news' as const,
    status: 'published' as const,
    publishedDate: '2026-01-08T09:00:00.000Z',
    content: lexicalDoc([
      lexicalHeading('Why SMEs Need ESG Reporting'),
      lexicalParagraph(
        'ESG reporting is no longer just for listed companies. As supply chains globalize and impact investors grow, African SMEs that can demonstrate ESG readiness access better financing terms, larger contracts, and premium partnerships.',
      ),
      lexicalHeading('Start Simple'),
      lexicalParagraph(
        'Begin with what you can measure today. Track energy consumption, employee diversity metrics, and community impact. Use simple spreadsheets before investing in specialized software. The goal is consistency, not comprehensiveness.',
      ),
      lexicalHeading('Frameworks That Work'),
      lexicalParagraph(
        'The GRI Standards offer a modular approach that SMEs can adopt incrementally. Start with GRI 2 (General Disclosures) and add sector-specific standards as your reporting matures. The African Development Bank\'s SME reporting guidelines are another practical resource.',
      ),
      lexicalParagraph(
        'The most important step is the first one. Investors and partners care more about trajectory than perfection. Start reporting now, improve over time.',
      ),
    ]),
  },
]

const tools = [
  {
    title: 'Startup Budget Calculator',
    slug: 'startup-budget-calculator',
    description: lexicalDoc([
      lexicalHeading('Plan Your First 12 Months'),
      lexicalParagraph(
        'A comprehensive budgeting template designed for early-stage African startups. Covers team costs, infrastructure, marketing, and runway calculations with built-in currency conversion for KES, NGN, ZAR, and USD.',
      ),
      lexicalParagraph(
        'Download the spreadsheet, input your assumptions, and get a clear picture of your burn rate, runway, and funding needs. Includes benchmarks from 50+ African startups across sectors.',
      ),
    ]),
    type: 'downloadable' as const,
    gated: true,
  },
  {
    title: 'Grant Eligibility Checker',
    slug: 'grant-eligibility-checker',
    description: lexicalDoc([
      lexicalHeading('Find Grants You Qualify For'),
      lexicalParagraph(
        'Answer a series of questions about your venture — stage, sector, geography, revenue, team size — and get a curated list of grants and non-dilutive funding opportunities you are likely eligible for.',
      ),
      lexicalParagraph(
        'Our database covers 200+ active grant programs from DFIs, foundations, and government agencies across Africa. Updated quarterly.',
      ),
    ]),
    type: 'interactive' as const,
    gated: true,
    componentName: 'GrantEligibilityChecker',
  },
  {
    title: 'Pitch Deck Review Checklist',
    slug: 'pitch-deck-review-checklist',
    description: lexicalDoc([
      lexicalHeading('Refine Your Pitch Deck'),
      lexicalParagraph(
        'A 30-point checklist based on feedback from 100+ investor meetings. Covers narrative structure, data presentation, market sizing, team positioning, and ask clarity.',
      ),
      lexicalParagraph(
        'Use this before your next investor meeting to ensure your deck communicates the right story with the right data. Includes common mistakes specific to African startup pitches.',
      ),
    ]),
    type: 'downloadable' as const,
    gated: false,
  },
]

const now = new Date()
const events = [
  {
    title: 'Scaling with Heart: Leadership for Growth-Stage Founders',
    slug: 'scaling-with-heart-leadership-workshop',
    date: new Date(now.getFullYear() - 1, 8, 15, 14, 0).toISOString(),
    type: 'speaking' as const,
    location: 'Nairobi Innovation Hub, Kenya',
    description: lexicalDoc([
      lexicalParagraph(
        'Keynote on balancing operational rigor with empathetic leadership as startups scale from 10 to 100 employees. Presented at the East Africa Founders Summit.',
      ),
    ]),
  },
  {
    title: 'Panel: The Future of Impact Investing in Africa',
    slug: 'future-of-impact-investing-africa-panel',
    date: new Date(now.getFullYear() - 1, 10, 22, 10, 0).toISOString(),
    type: 'speaking' as const,
    location: 'Africa Investment Forum, Abidjan',
    description: lexicalDoc([
      lexicalParagraph(
        'Panel discussion with leading impact investors and fund managers exploring how blended finance models are reshaping venture capital across the continent.',
      ),
    ]),
  },
  {
    title: 'Fundraising Masterclass: From Seed to Series A',
    slug: 'fundraising-masterclass-seed-to-series-a',
    date: new Date(now.getFullYear(), now.getMonth() + 1, 12, 15, 0).toISOString(),
    type: 'webinar' as const,
    location: 'Virtual',
    registrationLink: 'https://example.com/register/fundraising-masterclass',
    description: lexicalDoc([
      lexicalParagraph(
        'A 90-minute deep dive into fundraising strategy for African startups moving from seed to Series A. Covers investor targeting, term sheet negotiation, and due diligence preparation.',
      ),
    ]),
  },
  {
    title: 'ESG Workshop: Building Your First Impact Report',
    slug: 'esg-workshop-first-impact-report',
    date: new Date(now.getFullYear(), now.getMonth() + 2, 8, 10, 0).toISOString(),
    type: 'workshop' as const,
    location: 'Virtual',
    registrationLink: 'https://example.com/register/esg-workshop',
    description: lexicalDoc([
      lexicalParagraph(
        'Hands-on workshop guiding SME founders through creating their first ESG impact report. Includes templates, frameworks, and real examples from African companies.',
      ),
    ]),
  },
]

const programs = [
  {
    title: 'Venture Growth Accelerator',
    slug: 'venture-growth-accelerator',
    status: 'open' as const,
    checkoutUrl: 'https://example.com/checkout/vga',
    listingMetadata: {
      summary:
        'A 12-week intensive program for growth-stage African founders ready to scale. Covers fundraising, team building, market expansion, and investor relations.',
    },
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Scale Your Venture with Confidence',
        subtext:
          'A 12-week accelerator designed for African founders who are ready to move from traction to scale. Led by Liza Akinyi with a network of 30+ mentors.',
        cta: { label: 'Apply Now', url: 'https://example.com/checkout/vga' },
      },
      {
        blockType: 'featureGrid' as const,
        columns: '3' as const,
        features: [
          {
            title: 'Fundraising Strategy',
            description: 'Build a compelling investment thesis and master the fundraising process from pitch to close.',
            icon: '💰',
          },
          {
            title: 'Operational Excellence',
            description: 'Implement systems and processes that enable your team to execute consistently at scale.',
            icon: '⚙️',
          },
          {
            title: 'Market Expansion',
            description: 'Develop a multi-market strategy with playbooks for entering new African markets.',
            icon: '🌍',
          },
          {
            title: 'Leadership Development',
            description: 'Build the leadership skills needed to manage growing teams across diverse markets.',
            icon: '🎯',
          },
          {
            title: 'Investor Network',
            description: 'Direct introductions to 50+ active VCs, angels, and DFIs investing in Africa.',
            icon: '🤝',
          },
          {
            title: 'Peer Community',
            description: 'Join a cohort of 15 high-growth founders for accountability, support, and collaboration.',
            icon: '👥',
          },
        ],
      },
      {
        blockType: 'testimonialCarousel' as const,
        reviews: [
          {
            quote:
              'The Venture Growth Accelerator transformed how I think about scaling. The fundraising module alone was worth 10x the investment.',
            author: 'Amara Osei',
            role: 'CEO, AgriFlow (Cohort 3)',
          },
          {
            quote:
              'Liza\'s Heart + Strategy approach helped me build a leadership team that actually reflects our values while hitting aggressive growth targets.',
            author: 'David Kimani',
            role: 'Founder, PayBridge (Cohort 2)',
          },
          {
            quote:
              'The investor introductions were game-changing. We closed our Series A within 3 months of graduating.',
            author: 'Fatima Al-Hassan',
            role: 'CTO, HealthLink Africa (Cohort 1)',
          },
        ],
      },
      {
        blockType: 'pricingCard' as const,
        title: 'Venture Growth Accelerator',
        price: '$2,500',
        features: [
          { feature: '12 weeks of structured curriculum' },
          { feature: 'Weekly 1:1 coaching sessions' },
          { feature: 'Access to 50+ investor network' },
          { feature: 'Peer cohort of 15 founders' },
          { feature: 'Lifetime alumni community access' },
          { feature: 'Post-program support for 6 months' },
        ],
        cta: { label: 'Apply Now', url: 'https://example.com/checkout/vga' },
      },
      {
        blockType: 'accordion' as const,
        items: [
          {
            question: 'Who is this program for?',
            answer: lexicalDoc([
              lexicalParagraph(
                'Growth-stage founders with demonstrated product-market fit, typically post-seed or pre-Series A, operating in African markets.',
              ),
            ]),
          },
          {
            question: 'What is the time commitment?',
            answer: lexicalDoc([
              lexicalParagraph(
                'Expect 8-10 hours per week: 2 hours of live sessions, 2 hours of coaching, and 4-6 hours of implementation work.',
              ),
            ]),
          },
          {
            question: 'Are scholarships available?',
            answer: lexicalDoc([
              lexicalParagraph(
                'Yes. We offer partial scholarships for founders from underrepresented markets. Apply through the standard application and indicate your interest.',
              ),
            ]),
          },
          {
            question: 'What happens after the program?',
            answer: lexicalDoc([
              lexicalParagraph(
                'Graduates receive 6 months of post-program support, lifetime alumni community access, and ongoing investor introductions.',
              ),
            ]),
          },
        ],
      },
    ],
  },
  {
    title: 'ESG Foundations for African Enterprises',
    slug: 'esg-foundations-african-enterprises',
    status: 'waitlist' as const,
    checkoutUrl: 'https://example.com/checkout/esg',
    listingMetadata: {
      summary:
        'A self-paced program helping African SMEs build their first ESG framework. Covers reporting, stakeholder engagement, and compliance with global standards.',
    },
    layout: [
      {
        blockType: 'hero' as const,
        heading: 'Build Your ESG Foundation',
        subtext:
          'A practical, self-paced program for African SMEs ready to implement ESG frameworks that attract global partners and investors.',
        cta: { label: 'Join Waitlist', url: 'https://example.com/checkout/esg' },
      },
      {
        blockType: 'contentSplit' as const,
        alignment: 'textLeft' as const,
        text: lexicalDoc([
          lexicalHeading('Why ESG Matters Now', 'h3'),
          lexicalParagraph(
            'Global supply chains increasingly require ESG compliance. African enterprises that build these capabilities early gain preferential access to international contracts, better financing terms, and stronger brand positioning.',
          ),
          lexicalParagraph(
            'This program makes ESG accessible. No jargon, no overwhelming frameworks — just practical steps you can implement starting this week.',
          ),
        ]),
      },
      {
        blockType: 'featureGrid' as const,
        columns: '4' as const,
        features: [
          { title: 'ESG Basics', description: 'Understanding the landscape and why it matters for your business.', icon: '📊' },
          { title: 'Reporting', description: 'Build your first impact report using GRI-aligned templates.', icon: '📝' },
          { title: 'Stakeholders', description: 'Engage employees, investors, and communities in your ESG journey.', icon: '🤝' },
          { title: 'Compliance', description: 'Navigate regional and global ESG regulations with confidence.', icon: '✅' },
        ],
      },
      {
        blockType: 'pricingCard' as const,
        title: 'ESG Foundations',
        price: 'KES 75,000',
        features: [
          { feature: '8 self-paced modules' },
          { feature: 'Downloadable templates and frameworks' },
          { feature: 'Monthly group coaching calls' },
          { feature: 'ESG reporting toolkit' },
          { feature: 'Certificate of completion' },
        ],
        cta: { label: 'Join Waitlist', url: 'https://example.com/checkout/esg' },
      },
    ],
  },
]

export async function seed(payload: Payload) {
  payload.logger.info('Seeding database...')

  // Clear existing data for idempotency
  const collections = ['articles', 'tools', 'events', 'programs'] as const
  for (const collection of collections) {
    const existing = await payload.find({ collection, limit: 100 })
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id })
    }
  }

  // Seed articles
  for (const article of articles) {
    await payload.create({
      collection: 'articles',
      data: {
        title: article.title,
        slug: article.slug,
        content: article.content as unknown as Record<string, unknown>,
        excerpt: article.excerpt,
        category: article.category,
        status: article.status,
        publishedDate: article.publishedDate,
        author: 'Liza Akinyi',
      },
    })
  }
  payload.logger.info(`Seeded ${articles.length} articles`)

  // Seed tools
  for (const tool of tools) {
    await payload.create({
      collection: 'tools',
      data: {
        title: tool.title,
        slug: tool.slug,
        description: tool.description as unknown as Record<string, unknown>,
        type: tool.type,
        gated: tool.gated,
        ...(tool.componentName ? { componentName: tool.componentName } : {}),
      },
    })
  }
  payload.logger.info(`Seeded ${tools.length} tools`)

  // Seed events
  for (const event of events) {
    await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        slug: event.slug,
        date: event.date,
        type: event.type,
        location: event.location,
        description: event.description as unknown as Record<string, unknown>,
        ...(event.registrationLink ? { registrationLink: event.registrationLink } : {}),
      },
    })
  }
  payload.logger.info(`Seeded ${events.length} events`)

  // Seed programs
  for (const program of programs) {
    await payload.create({
      collection: 'programs',
      data: {
        title: program.title,
        slug: program.slug,
        status: program.status,
        checkoutUrl: program.checkoutUrl,
        listingMetadata: program.listingMetadata,
        layout: program.layout as unknown as Record<string, unknown>[],
      },
    })
  }
  payload.logger.info(`Seeded ${programs.length} programs`)

  payload.logger.info('Seeding complete!')
}
