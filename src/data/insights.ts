export type InsightRecord = {
  id: string;
  title: string;
  category: string;
  division: string;
  date: string;
  readTime: string;
  summary: string;
  signal: string;
  context: string[];
  implications: {
    title: string;
    description: string;
  }[];
  indicators: string[];
};

export const insightRecords: InsightRecord[] = [
  {
    id: "DRI-I-001",
    title: "The Quiet Acceleration of Autonomous Work",
    category: "Technology",
    division: "Future Systems",
    date: "July 3, 2026",
    readTime: "6 min",
    summary:
      "Artificial intelligence is moving beyond isolated assistance and toward interconnected systems capable of completing entire operational workflows.",
    signal:
      "The consequential shift may not be better individual tools, but systems that increasingly require fewer human handoffs.",
    context: [
      "The first major wave of workplace artificial intelligence focused on assisting individuals with writing, analysis, communication, and software development.",
      "A newer generation of systems is beginning to connect multiple tools, data sources, and decision points into longer operational sequences.",
      "This changes the unit of automation. Instead of replacing one task, organizations may begin redesigning entire workflows around systems that can plan, execute, verify, and escalate exceptions.",
    ],
    implications: [
      {
        title: "Organizational design",
        description:
          "Companies may require fewer coordination layers when autonomous systems can transfer information and complete routine approvals.",
      },
      {
        title: "Workforce strategy",
        description:
          "Human value may shift toward judgment, accountability, relationship management, and handling unusual conditions.",
      },
      {
        title: "Institutional power",
        description:
          "Organizations controlling advanced automation infrastructure could gain disproportionate productivity and information advantages.",
      },
      {
        title: "Public policy",
        description:
          "Labor policy may need to address workflow displacement rather than focusing only on the automation of individual occupations.",
      },
    ],
    indicators: [
      "Growth in enterprise systems capable of completing multi-step workflows",
      "Reduction in routine management and coordination positions",
      "Expansion of human oversight roles focused on exceptions",
      "Measurable productivity gaps between automated and non-automated firms",
    ],
  },
  {
    id: "DRI-I-002",
    title: "Why Grid Resilience Is Becoming Economic Policy",
    category: "Infrastructure",
    division: "Energy & Infrastructure",
    date: "July 1, 2026",
    readTime: "5 min",
    summary:
      "Electrical reliability is becoming inseparable from industrial strategy as computing, manufacturing, transportation, and communications grow more power-intensive.",
    signal:
      "Energy capacity may become a stronger determinant of regional investment than traditional tax incentives.",
    context: [
      "Modern industrial growth increasingly depends upon access to reliable, scalable, and competitively priced electricity.",
      "Data centers, semiconductor manufacturing, electrified transportation, and advanced production systems can place significant new demands on regional grids.",
      "Areas unable to provide adequate transmission, generation, and interconnection capacity may struggle to attract strategically important industries.",
    ],
    implications: [
      {
        title: "Regional competition",
        description:
          "Energy availability may become a decisive factor when companies choose locations for advanced facilities.",
      },
      {
        title: "Infrastructure finance",
        description:
          "Grid modernization could increasingly be treated as an economic-development investment rather than only a utility expense.",
      },
      {
        title: "National security",
        description:
          "Reliable domestic energy systems support industrial production, communications, logistics, and defense capacity.",
      },
      {
        title: "Planning",
        description:
          "Governments may need to align energy forecasting with industrial, housing, and transportation policy.",
      },
    ],
    indicators: [
      "Industrial projects delayed because of grid interconnection limits",
      "Regional competition for data centers and advanced manufacturing",
      "Expansion of transmission investment and energy-storage capacity",
      "Economic-development packages that include guaranteed power access",
    ],
  },
  {
    id: "DRI-I-003",
    title: "Orbital Congestion Is No Longer a Future Problem",
    category: "Space",
    division: "Space Studies",
    date: "June 28, 2026",
    readTime: "7 min",
    summary:
      "The rapid expansion of satellite constellations is creating new demands for coordination, debris mitigation, and enforceable orbital governance.",
    signal:
      "Commercial growth is advancing faster than the institutions responsible for managing shared orbital environments.",
    context: [
      "Low Earth orbit is supporting a rapidly expanding number of communications, imaging, scientific, and security satellites.",
      "More active spacecraft create additional coordination requirements and increase the complexity of collision avoidance.",
      "Current governance systems rely heavily on national licensing, voluntary coordination, and incomplete international standards.",
    ],
    implications: [
      {
        title: "Commercial risk",
        description:
          "Operators may face increasing costs related to tracking, maneuvering, insurance, and regulatory compliance.",
      },
      {
        title: "Governance",
        description:
          "International institutions may require clearer standards for responsibility, disposal, and orbital behavior.",
      },
      {
        title: "Strategic competition",
        description:
          "Congested orbital regions could become points of diplomatic and security tension.",
      },
      {
        title: "Infrastructure",
        description:
          "Tracking, servicing, and debris-removal capabilities may become essential components of the orbital economy.",
      },
    ],
    indicators: [
      "Rising frequency of collision-avoidance maneuvers",
      "New binding debris-mitigation requirements",
      "Growth in commercial space situational-awareness services",
      "International disputes involving orbital access or interference",
    ],
  },
  {
    id: "DRI-I-004",
    title: "The Return of Strategic Industrial Policy",
    category: "Economics",
    division: "Economic Intelligence",
    date: "June 24, 2026",
    readTime: "8 min",
    summary:
      "Governments are increasingly treating semiconductor manufacturing, critical minerals, energy systems, and artificial intelligence as matters of national power.",
    signal:
      "Economic efficiency is being balanced against strategic control, redundancy, and domestic production capacity.",
    context: [
      "For decades, many production systems were optimized primarily around cost, specialization, and global efficiency.",
      "Recent disruptions exposed the strategic consequences of concentrated supply chains and dependence on limited production regions.",
      "Governments are now using subsidies, procurement, regulation, and trade policy to influence the location of critical industries.",
    ],
    implications: [
      {
        title: "Markets",
        description:
          "Investment decisions may increasingly reflect government strategy as well as traditional commercial demand.",
      },
      {
        title: "Trade",
        description:
          "Strategic industries could face more restrictions, localization requirements, and politically motivated competition.",
      },
      {
        title: "Corporate strategy",
        description:
          "Companies may accept higher short-term costs to gain supply security and political alignment.",
      },
      {
        title: "Regional development",
        description:
          "Industrial ecosystems may form around public investment, workforce pipelines, and reliable infrastructure.",
      },
    ],
    indicators: [
      "Expansion of domestic manufacturing subsidies",
      "Export controls involving advanced technologies",
      "Government-backed mineral and semiconductor projects",
      "Long-term procurement agreements supporting strategic industries",
    ],
  },
  {
    id: "DRI-I-005",
    title: "Synthetic Media and the Burden of Proof",
    category: "Technology",
    division: "Future Systems",
    date: "June 20, 2026",
    readTime: "6 min",
    summary:
      "As synthetic media becomes easier to produce, institutions will need stronger methods for verifying authentic evidence and preserving public trust.",
    signal:
      "The default question may shift from whether media looks real to whether its origin can be independently verified.",
    context: [
      "Generative systems can now create convincing images, video, audio, and documents at low cost.",
      "Visual realism is becoming less useful as a test of authenticity.",
      "The same technologies that enable false media can also create plausible denials around genuine evidence.",
    ],
    implications: [
      {
        title: "Journalism",
        description:
          "News organizations may require stronger verification procedures and transparent chains of evidence.",
      },
      {
        title: "Law",
        description:
          "Courts and investigators may place greater emphasis on provenance, metadata, and custody records.",
      },
      {
        title: "Public trust",
        description:
          "Repeated exposure to synthetic media could weaken confidence even in authentic documentation.",
      },
      {
        title: "Technology",
        description:
          "Authentication systems may become embedded into cameras, platforms, and institutional records.",
      },
    ],
    indicators: [
      "Adoption of digital provenance standards",
      "Courts establishing new evidentiary requirements",
      "Media organizations publishing verification records",
      "Growth in authenticated capture and content-signing tools",
    ],
  },
  {
    id: "DRI-I-006",
    title: "Cascading Risk Begins at Institutional Boundaries",
    category: "Global Risk",
    division: "Global Risk",
    date: "June 16, 2026",
    readTime: "9 min",
    summary:
      "Major crises often intensify where agencies, industries, and jurisdictions assume another institution is responsible for the same vulnerability.",
    signal:
      "The most dangerous system failures may exist between organizations rather than inside them.",
    context: [
      "Organizations usually assess risks within their own operational boundaries.",
      "Critical systems, however, depend upon energy providers, telecommunications networks, transportation systems, vendors, regulators, and public agencies.",
      "A vulnerability may remain unaddressed when each organization assumes responsibility belongs elsewhere.",
    ],
    implications: [
      {
        title: "Emergency planning",
        description:
          "Exercises should test cross-organizational handoffs rather than only internal procedures.",
      },
      {
        title: "Governance",
        description:
          "Responsibility for shared risks must be assigned explicitly before a crisis occurs.",
      },
      {
        title: "Private industry",
        description:
          "Companies may need to assess the resilience of external dependencies and public infrastructure.",
      },
      {
        title: "Risk intelligence",
        description:
          "Analysis should map relationships between institutions, not merely catalog individual vulnerabilities.",
      },
    ],
    indicators: [
      "Conflicting emergency plans across agencies",
      "Unclear responsibility for infrastructure restoration",
      "Repeated failures caused by vendor or jurisdictional dependencies",
      "Expansion of cross-sector resilience exercises",
    ],
  },
  {
    id: "DRI-I-007",
    title: "What Historical Collapse Actually Looks Like",
    category: "History",
    division: "Historical Analysis",
    date: "June 11, 2026",
    readTime: "10 min",
    summary:
      "Civilizations rarely disappear in a single moment. Decline more often appears as declining capacity, legitimacy, coordination, and institutional adaptability.",
    signal:
      "Collapse is frequently experienced as a prolonged reduction in what institutions can reliably accomplish.",
    context: [
      "Popular descriptions of collapse often focus on dramatic final events.",
      "Historical evidence more commonly shows extended periods of declining administrative reach, weakened infrastructure, political fragmentation, and reduced public confidence.",
      "Formal institutions may continue to exist long after their practical capabilities have deteriorated.",
    ],
    implications: [
      {
        title: "Historical analysis",
        description:
          "Institutional capacity may be a more useful measure of decline than symbolic political continuity.",
      },
      {
        title: "Public policy",
        description:
          "Maintenance, administrative competence, and institutional adaptability are central components of resilience.",
      },
      {
        title: "Risk assessment",
        description:
          "Gradual deterioration can be more difficult to recognize than sudden crisis.",
      },
      {
        title: "Communication",
        description:
          "Historical comparison should clarify mechanisms rather than produce simplistic predictions.",
      },
    ],
    indicators: [
      "Declining reliability of basic public services",
      "Reduced ability to complete large infrastructure projects",
      "Persistent loss of institutional legitimacy",
      "Growing reliance on informal systems replacing public capacity",
    ],
  },
  {
    id: "DRI-I-008",
    title: "Water Systems Are Becoming Strategic Infrastructure",
    category: "Infrastructure",
    division: "Energy & Infrastructure",
    date: "June 6, 2026",
    readTime: "7 min",
    summary:
      "Population growth, aging systems, industrial demand, and climate volatility are increasing the strategic importance of water infrastructure.",
    signal:
      "Water availability may increasingly shape industrial geography, urban development, and regional political stability.",
    context: [
      "Water systems support households, agriculture, power generation, manufacturing, data centers, and public health.",
      "Aging pipes, treatment facilities, groundwater stress, and climate variability create overlapping pressures.",
      "Economic planning often assumes water availability without treating it as a strategic capacity constraint.",
    ],
    implications: [
      {
        title: "Industrial development",
        description:
          "Water-intensive projects may increasingly depend upon regional supply and recycling capacity.",
      },
      {
        title: "Urban planning",
        description:
          "Housing and population growth may be limited by infrastructure that cannot expand quickly.",
      },
      {
        title: "Public health",
        description:
          "Aging treatment and distribution systems can create direct health and trust consequences.",
      },
      {
        title: "Regional stability",
        description:
          "Competition over shared water resources may produce economic and political conflict.",
      },
    ],
    indicators: [
      "Industrial projects constrained by water availability",
      "Expansion of water-recycling infrastructure",
      "Increasing municipal repair backlogs",
      "Interstate or regional disputes over water allocation",
    ],
  },
  {
    id: "DRI-I-009",
    title: "The Economics of Permanent Lunar Access",
    category: "Space",
    division: "Space Studies",
    date: "May 30, 2026",
    readTime: "8 min",
    summary:
      "Sustained lunar access depends less on individual missions than on transportation cadence, infrastructure reuse, communications, and predictable demand.",
    signal:
      "The first durable lunar economy will likely emerge from logistics and infrastructure before resource extraction.",
    context: [
      "Historic lunar missions were designed as discrete national achievements rather than recurring economic systems.",
      "Permanent access requires reliable transportation, communications, navigation, power, storage, maintenance, and surface logistics.",
      "The strongest early commercial opportunities may therefore involve services that reduce the cost and complexity of repeated missions.",
    ],
    implications: [
      {
        title: "Commercial strategy",
        description:
          "Companies may find more durable demand in enabling infrastructure than in speculative resource extraction.",
      },
      {
        title: "Government policy",
        description:
          "Public missions can create anchor demand for commercial transportation and surface services.",
      },
      {
        title: "Standards",
        description:
          "Interoperable systems will be important for international and commercial participation.",
      },
      {
        title: "Investment",
        description:
          "Infrastructure businesses may require long time horizons and predictable mission cadence.",
      },
    ],
    indicators: [
      "Recurring lunar transportation contracts",
      "Deployment of communications and navigation infrastructure",
      "Standardization of lunar interfaces and equipment",
      "Commercial surface-power, storage, or logistics services",
    ],
  },
];

export function getInsightById(
  insightId: string | undefined,
): InsightRecord | undefined {
  if (!insightId) {
    return undefined;
  }

  return insightRecords.find((insight) => insight.id === insightId);
}
