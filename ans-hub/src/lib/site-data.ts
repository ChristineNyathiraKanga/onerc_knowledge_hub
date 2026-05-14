export type NewsItem = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  place: string;
  color: "leadership" | "branch" | "resource" | "finance";
};

export type EventItem = {
  slug: string;
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  time: string;
  location: string;
  description: string;
  format: "Webinar" | "In-person" | "Hybrid";
};

export const featured: NewsItem = {
  slug: "mali-rc-workplace-first-aid",
  tag: "Resource Mobilisation",
  title: "Mali RC launches workplace first-aid programme generating local income",
  excerpt:
    "Backed by the Netherlands Red Cross under the Resource Mobilisation pillar, the new initiative trains corporate teams while building sustainable revenue for community services.",
  body: "The Mali Red Cross Society has rolled out a nationwide workplace first-aid certification programme that trains corporate employees and reinvests revenue into branch operations. Developed with the Netherlands Red Cross under the Resource Mobilisation pillar, the model is designed to be replicated by peer National Societies across the Alliance.",
  date: "12 May 2026",
  place: "Bamako, Mali",
  color: "resource",
};

export const news: NewsItem[] = [
  featured,
  {
    slug: "steering-group-kampala",
    tag: "Leadership",
    title: "Steering Group convenes in Kampala to set 2026–27 agenda",
    excerpt: "Six National Society leaders aligned the Alliance's two-year roadmap focused on governance and financial autonomy.",
    body: "The Localisation Hub Steering Group, chaired by the Uganda Red Cross Society, met in Kampala for three days of strategic planning. The agenda set priorities for the next two years across all four pillars, with new commitments on transparent governance and locally generated income.",
    date: "08 May 2026",
    place: "Kampala, Uganda",
    color: "leadership",
  },
  {
    slug: "zambia-branch-income",
    tag: "Branch Development",
    title: "Zambia RC pilots branch-led income model across 4 provinces",
    excerpt: "A new framework empowers branches to design and run their own revenue-generating community services.",
    body: "Zambia Red Cross has launched a four-province pilot equipping branches with tools to identify, design and operate locally relevant income-generating activities — from health services to logistics support — under a shared accountability framework.",
    date: "02 May 2026",
    place: "Lusaka, Zambia",
    color: "branch",
  },
  {
    slug: "norcross-ethiopia-toolkit",
    tag: "Finance Development",
    title: "NorCross & Ethiopian RC publish joint financial systems toolkit",
    excerpt: "Open-source guidance helps National Societies modernise core finance, audit and reporting practices.",
    body: "A new open toolkit co-authored by the Norwegian Red Cross and the Ethiopian Red Cross Society distils five years of joint work on financial systems strengthening into practical templates, controls and dashboards for peer National Societies.",
    date: "28 Apr 2026",
    place: "Addis Ababa, Ethiopia",
    color: "finance",
  },
  {
    slug: "south-sudan-domestic-donor",
    tag: "Resource Mobilisation",
    title: "South Sudan RC secures multi-year domestic donor partnership",
    excerpt: "A landmark agreement with a national private-sector consortium will fund branch operations through 2029.",
    body: "South Sudan Red Cross has signed a multi-year partnership with a coalition of domestic private-sector donors, marking a major milestone in the National Society's diversification of funding away from international project cycles.",
    date: "21 Apr 2026",
    place: "Juba, South Sudan",
    color: "resource",
  },
  {
    slug: "ivory-coast-youth",
    tag: "Branch Development",
    title: "Ivory Coast RC trains 1,200 youth volunteers in community first response",
    excerpt: "A national rollout doubles community-based response capacity across 14 branches.",
    body: "The Ivory Coast Red Cross Society completed a six-month volunteer training programme certifying 1,200 youth responders. The cohort doubles community-based emergency response capacity across 14 branches and feeds directly into the Branch Development pillar's learning agenda.",
    date: "14 Apr 2026",
    place: "Abidjan, Ivory Coast",
    color: "branch",
  },
  {
    slug: "ifrc-governance-roundtable",
    tag: "Leadership",
    title: "IFRC hosts governance roundtable on Pan-African Conference commitments",
    excerpt: "National Society Presidents reviewed PAC 2017 progress and shaped the agenda for the next conference.",
    body: "An IFRC-hosted roundtable brought together Presidents and Secretary Generals from across the Alliance to assess progress against Pan-African Conference 2017 commitments and shape the agenda for the next PAC cycle.",
    date: "05 Apr 2026",
    place: "Geneva, Switzerland",
    color: "leadership",
  },
];

export const events: EventItem[] = [
  {
    slug: "branch-income-webinar",
    day: "27", month: "MAY", year: "2026",
    title: "Peer Exchange: Branch-led Income Generation",
    type: "Webinar · Online",
    time: "14:00 EAT · 90 minutes",
    location: "Online",
    description: "A live peer exchange where Zambia, Mali and South Sudan Red Cross share their branch-led income generation models, followed by Q&A with Alliance partners.",
    format: "Webinar",
  },
  {
    slug: "pan-african-forum-2026",
    day: "11", month: "JUN", year: "2026",
    title: "Pan-African Localisation Forum 2026",
    type: "In-person · Nairobi, Kenya",
    time: "3 days · Full agenda",
    location: "Nairobi, Kenya",
    description: "The flagship convening of the Localisation Hub brings together National Society leadership, partners and the broader IFRC network for three days of dialogue, peer learning and strategy.",
    format: "In-person",
  },
  {
    slug: "finance-working-group-jun",
    day: "24", month: "JUN", year: "2026",
    title: "Finance Development Working Group",
    type: "Hybrid · Geneva + Online",
    time: "10:00 CET · Half-day",
    location: "Geneva, Switzerland (Hybrid)",
    description: "Quarterly working group session led by NorCross. Focus areas: audit readiness, multi-currency reporting and the new joint financial systems toolkit.",
    format: "Hybrid",
  },
  {
    slug: "leadership-masterclass-jul",
    day: "09", month: "JUL", year: "2026",
    title: "Leadership Masterclass: Governance Under Pressure",
    type: "Webinar · Online",
    time: "13:00 GMT · 2 hours",
    location: "Online",
    description: "An interactive masterclass for National Society Boards and Senior Leadership on navigating governance challenges during humanitarian crises.",
    format: "Webinar",
  },
  {
    slug: "resource-mob-summit-aug",
    day: "20", month: "AUG", year: "2026",
    title: "Resource Mobilisation Summit",
    type: "In-person · Amsterdam, Netherlands",
    time: "2 days",
    location: "Amsterdam, Netherlands",
    description: "Hosted by the Netherlands Red Cross — a working summit on domestic resource mobilisation, including the Workplace First Aid model and corporate partnerships.",
    format: "In-person",
  },
];

export const pillarColor: Record<string, string> = {
  leadership: "bg-pillar-leadership text-pillar-leadership-foreground",
  branch: "bg-pillar-branch text-pillar-branch-foreground",
  resource: "bg-pillar-resource text-pillar-resource-foreground",
  finance: "bg-pillar-finance text-pillar-finance-foreground",
};

export type Publication = {
  slug: string;
  title: string;
  description: string;
  category: "Toolkit" | "Report" | "Case Study" | "Guideline" | "Brief";
  pillar: "leadership" | "branch" | "resource" | "finance";
  fileType: "PDF" | "DOCX" | "XLSX" | "ZIP";
  size: string;
  pages?: number;
  date: string;
  author: string;
};

export const publications: Publication[] = [
  {
    slug: "financial-systems-toolkit-2026",
    title: "Joint Financial Systems Toolkit",
    description: "Open-source templates, controls, dashboards and audit checklists co-authored by NorCross and the Ethiopian Red Cross.",
    category: "Toolkit",
    pillar: "finance",
    fileType: "ZIP",
    size: "12.4 MB",
    date: "28 Apr 2026",
    author: "NorCross & Ethiopian RC",
  },
  {
    slug: "branch-led-income-playbook",
    title: "Branch-led Income Generation Playbook",
    description: "A practical playbook for designing and operating branch-level income initiatives, drawn from the Zambia RC pilot.",
    category: "Guideline",
    pillar: "branch",
    fileType: "PDF",
    size: "4.1 MB",
    pages: 64,
    date: "02 May 2026",
    author: "Zambia Red Cross",
  },
  {
    slug: "workplace-first-aid-model",
    title: "Workplace First Aid: Operating Model",
    description: "Mali RC's revenue-generating workplace first-aid programme — pricing, partnerships and training curriculum.",
    category: "Case Study",
    pillar: "resource",
    fileType: "PDF",
    size: "2.8 MB",
    pages: 32,
    date: "12 May 2026",
    author: "Mali RC & Netherlands RC",
  },
  {
    slug: "governance-under-pressure",
    title: "Governance Under Pressure: Board Brief",
    description: "Brief for National Society Boards on navigating governance in protracted humanitarian crises.",
    category: "Brief",
    pillar: "leadership",
    fileType: "PDF",
    size: "1.2 MB",
    pages: 14,
    date: "20 Apr 2026",
    author: "IFRC",
  },
  {
    slug: "alliance-annual-report-2025",
    title: "Localisation Hub Annual Report 2025",
    description: "Full-year results across the four pillars, with country-level highlights and 2026 outlook.",
    category: "Report",
    pillar: "leadership",
    fileType: "PDF",
    size: "8.7 MB",
    pages: 96,
    date: "15 Mar 2026",
    author: "Localisation Hub Secretariat",
  },
  {
    slug: "domestic-resource-mobilisation-guide",
    title: "Domestic Resource Mobilisation: Field Guide",
    description: "Tactics for diversifying funding through domestic donors, corporate partnerships and earned income.",
    category: "Guideline",
    pillar: "resource",
    fileType: "PDF",
    size: "3.5 MB",
    pages: 48,
    date: "10 Feb 2026",
    author: "Swiss RC & Netherlands RC",
  },
  {
    slug: "branch-standards-framework",
    title: "Branch Standards Framework v2",
    description: "Updated branch standards covering volunteer engagement, community services and accountability.",
    category: "Toolkit",
    pillar: "branch",
    fileType: "DOCX",
    size: "0.9 MB",
    date: "05 Feb 2026",
    author: "IFRC",
  },
  {
    slug: "audit-readiness-workbook",
    title: "Audit Readiness Workbook",
    description: "Self-assessment workbook for finance teams preparing for external audit cycles.",
    category: "Toolkit",
    pillar: "finance",
    fileType: "XLSX",
    size: "1.1 MB",
    date: "22 Jan 2026",
    author: "NorCross",
  },
];
