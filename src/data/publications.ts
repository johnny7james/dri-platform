export type PublicationRecord = {
  id: string;
  title: string;
  subtitle: string;
  division: string;
  type: string;
  date: string;
  readTime: string;
  pages: number;
  summary: string;
  focus: string[];
  questions: string[];
};

const createPublication = (
  publication: PublicationRecord,
): PublicationRecord => publication;

export const publicationRecords: PublicationRecord[] = [
  createPublication({
    id: "DRI-AF-001",
    title: "The State of the Future",
    subtitle: "Annual Global Forecast and Risk Assessment",
    division: "Multidisciplinary",
    type: "Annual Forecast",
    date: "June 2026",
    readTime: "32 min",
    pages: 118,
    summary:
      "A comprehensive assessment of the technologies, conflicts, economic transitions, infrastructure pressures, and institutional changes likely to define the coming decade.",
    focus: [
      "Artificial intelligence is moving from individual assistance toward increasingly autonomous operational systems.",
      "Energy capacity, infrastructure resilience, and computational access are becoming central determinants of economic power.",
      "Global institutions are adapting more slowly than the technological and geopolitical systems they are expected to govern.",
    ],
    questions: [
      "Which emerging capabilities could create the largest institutional disruptions?",
      "Where are connected systems most vulnerable to cascading failure?",
      "Which investments could produce the greatest long-term resilience?",
    ],
  }),
  createPublication({
    id: "DRI-F001",
    title: "The State of the Future 2027",
    subtitle: "Annual Global Forecast and Risk Assessment",
    division: "Multidisciplinary",
    type: "Forecast",
    date: "June 2026",
    readTime: "32 min",
    pages: 118,
    summary:
      "DRI's annual assessment of the technologies, risks, institutions, and structural changes likely to define the next decade.",
    focus: [
      "Technological adoption is accelerating faster than many institutions can reorganize.",
      "Economic and security policy are becoming increasingly interconnected.",
      "Resilience will depend upon coordination across energy, information, infrastructure, and governance systems.",
    ],
    questions: [
      "What developments are most likely to produce systemic change?",
      "Which current assumptions are least likely to survive the decade?",
      "Where can early intervention meaningfully reduce future risk?",
    ],
  }),
  createPublication({
    id: "DRI-R001",
    title: "The Automation Threshold",
    subtitle: "Labor, Productivity, and Institutional Power",
    division: "Future Systems",
    type: "Report",
    date: "July 2026",
    readTime: "18 min",
    pages: 64,
    summary:
      "An investigation into the point at which intelligent automation begins restructuring labor markets, institutional workflows, productivity, and economic mobility.",
    focus: [
      "Automation is moving from isolated tasks toward complete operational workflows.",
      "The distribution of productivity gains may matter as much as the gains themselves.",
      "Institutions designed around human processing capacity may require structural redesign.",
    ],
    questions: [
      "Which occupations are most exposed to workflow-level automation?",
      "How will organizations redistribute responsibility when fewer human handoffs are required?",
      "What policies could broaden access to automation-driven productivity gains?",
    ],
  }),
  createPublication({
    id: "DRI-SR-004",
    title: "The Automation Threshold",
    subtitle: "Labor, Productivity, and Institutional Power",
    division: "Future Systems",
    type: "Strategic Report",
    date: "July 2026",
    readTime: "18 min",
    pages: 64,
    summary:
      "An investigation into how intelligent automation may restructure labor, organizational design, productivity, and institutional power.",
    focus: [
      "The unit of automation is expanding from the task to the workflow.",
      "Human oversight may become concentrated in fewer, higher-leverage positions.",
      "Institutional adaptation will determine whether automation expands or restricts opportunity.",
    ],
    questions: [
      "When does assistance become operational replacement?",
      "Which institutions are prepared to redesign around autonomous systems?",
      "How should productivity gains be measured and distributed?",
    ],
  }),
  createPublication({
    id: "DRI-B002",
    title: "Fragile Systems",
    subtitle: "Cascading Failure in Critical Infrastructure",
    division: "Global Risk",
    type: "Brief",
    date: "June 2026",
    readTime: "9 min",
    pages: 52,
    summary:
      "An analysis of interconnected infrastructure failures capable of producing cascading national and regional crises.",
    focus: [
      "Infrastructure systems often depend upon the continued operation of other vulnerable systems.",
      "Institutional boundaries can conceal shared risks and unclear responsibility.",
      "Recovery capacity is frequently less tested than prevention capability.",
    ],
    questions: [
      "Which dependencies could transform a local disruption into a national emergency?",
      "Where do agencies and industries assume another institution is responsible?",
      "Which resilience investments offer the greatest reduction in cascading risk?",
    ],
  }),
  createPublication({
    id: "DRI-RA-003",
    title: "Fragile Systems",
    subtitle: "Cascading Failure in Critical Infrastructure",
    division: "Global Risk",
    type: "Risk Assessment",
    date: "June 2026",
    readTime: "9 min",
    pages: 52,
    summary:
      "A systems-level assessment of how failures across energy, communications, transportation, and public services can compound into national crises.",
    focus: [
      "Connected infrastructure produces efficiency while also creating shared failure pathways.",
      "Crisis escalation is often intensified by coordination failures.",
      "Resilience requires redundancy, institutional clarity, and practiced recovery systems.",
    ],
    questions: [
      "Which critical systems lack viable backup capacity?",
      "How quickly can failures propagate between infrastructure sectors?",
      "Where are recovery responsibilities unclear?",
    ],
  }),
  createPublication({
    id: "DRI-R003",
    title: "The Orbital Economy",
    subtitle: "Markets and Power Beyond the Atmosphere",
    division: "Space Studies",
    type: "Report",
    date: "May 2026",
    readTime: "21 min",
    pages: 71,
    summary:
      "An examination of the companies, technologies, policies, and strategic incentives shaping the next era of commercial orbital development.",
    focus: [
      "Launch cadence and reusable infrastructure are reducing barriers to orbital activity.",
      "Commercial growth is advancing faster than orbital governance.",
      "Communications, navigation, logistics, and servicing may form the foundation of a durable orbital economy.",
    ],
    questions: [
      "Which orbital services can develop sustainable commercial demand?",
      "How should governments manage congestion and debris risk?",
      "Which infrastructure investments could create durable strategic advantage?",
    ],
  }),
  createPublication({
    id: "DRI-SR-003",
    title: "The Orbital Economy",
    subtitle: "Markets and Power Beyond the Atmosphere",
    division: "Space Studies",
    type: "Strategic Report",
    date: "May 2026",
    readTime: "21 min",
    pages: 71,
    summary:
      "A study of the companies, technologies, policies, and geopolitical incentives shaping the emerging commercial orbital economy.",
    focus: [
      "Orbital infrastructure is becoming an extension of terrestrial economic and strategic systems.",
      "Reliable access and service cadence matter more than isolated demonstration missions.",
      "Governance mechanisms remain underdeveloped relative to commercial expansion.",
    ],
    questions: [
      "What creates sustainable demand beyond launch services?",
      "How will strategic competition affect commercial access?",
      "Which standards are required for safe long-term orbital growth?",
    ],
  }),
  createPublication({
    id: "DRI-D001",
    title: "Networks of Influence",
    subtitle: "Institutions, Information, and Durable Power",
    division: "Historical Analysis",
    type: "Dossier",
    date: "April 2026",
    readTime: "26 min",
    pages: 83,
    summary:
      "A historical study of how political, financial, institutional, and information networks accumulate influence across generations.",
    focus: [
      "Durable influence is frequently embedded within institutions rather than individual personalities.",
      "Information access and agenda-setting can produce power without direct control.",
      "Networks survive leadership transitions by preserving relationships, incentives, and institutional memory.",
    ],
    questions: [
      "How does influence persist when visible leadership changes?",
      "Which institutional relationships deserve greater analytical attention?",
      "How can network analysis avoid unsupported assumptions?",
    ],
  }),
  createPublication({
    id: "DRI-RD-002",
    title: "Networks of Influence",
    subtitle: "Institutions, Information, and Durable Power",
    division: "Historical Analysis",
    type: "Research Dossier",
    date: "April 2026",
    readTime: "26 min",
    pages: 83,
    summary:
      "A historical analysis of how political, financial, and information networks accumulate and preserve influence across generations.",
    focus: [
      "Institutional continuity can preserve influence beyond individual tenure.",
      "Networks often operate through incentives and access rather than centralized command.",
      "Evidence must be separated carefully from speculation when analyzing hidden relationships.",
    ],
    questions: [
      "Which relationships are documented and which remain inferential?",
      "How does institutional power reproduce itself?",
      "What analytical safeguards reduce conspiratorial overreach?",
    ],
  }),
  createPublication({
    id: "DRI-B004",
    title: "Grid Under Pressure",
    subtitle: "Energy Security in an Electrified World",
    division: "Energy & Infrastructure",
    type: "Brief",
    date: "March 2026",
    readTime: "11 min",
    pages: 46,
    summary:
      "An assessment of the vulnerabilities emerging across aging electrical grids as demand, electrification, extreme weather, and digital dependence accelerate.",
    focus: [
      "Electricity demand is rising alongside dependence upon uninterrupted digital systems.",
      "Transmission capacity may become a binding constraint on industrial growth.",
      "Grid modernization requires physical investment, regulatory coordination, and improved forecasting.",
    ],
    questions: [
      "Where will electricity demand exceed available capacity?",
      "Which grid components present the highest concentration risk?",
      "How should resilience be balanced against efficiency and affordability?",
    ],
  }),
  createPublication({
    id: "DRI-RA-002",
    title: "Grid Under Pressure",
    subtitle: "Energy Security in an Electrified World",
    division: "Energy & Infrastructure",
    type: "Risk Assessment",
    date: "March 2026",
    readTime: "11 min",
    pages: 46,
    summary:
      "An examination of the vulnerabilities facing electrical grids as demand, electrification, extreme weather, and digital dependence accelerate.",
    focus: [
      "Grid reliability is becoming an economic and national-security concern.",
      "Aging infrastructure must support rapidly changing demand patterns.",
      "Regional energy capacity may increasingly influence investment location.",
    ],
    questions: [
      "Which regions face the largest capacity deficits?",
      "How exposed are critical services to extended outages?",
      "What modernization investments should receive priority?",
    ],
  }),
  createPublication({
    id: "DRI-R005",
    title: "The New Industrial Competition",
    subtitle: "Semiconductors, Minerals, and Strategic Production",
    division: "Economic Intelligence",
    type: "Report",
    date: "February 2026",
    readTime: "20 min",
    pages: 69,
    summary:
      "How semiconductors, critical minerals, artificial intelligence, and industrial policy are reshaping global economic competition.",
    focus: [
      "Production capacity is again being treated as a strategic national asset.",
      "Supply-chain concentration creates economic and geopolitical leverage.",
      "Industrial policy is prioritizing resilience and control alongside efficiency.",
    ],
    questions: [
      "Which industries are becoming strategically indispensable?",
      "Where do supply chains contain critical single points of failure?",
      "How will state investment reshape private competition?",
    ],
  }),
  createPublication({
    id: "DRI-SR-002",
    title: "The New Industrial Competition",
    subtitle: "Semiconductors, Minerals, and Strategic Production",
    division: "Economic Intelligence",
    type: "Strategic Report",
    date: "February 2026",
    readTime: "20 min",
    pages: 69,
    summary:
      "How semiconductors, critical minerals, industrial policy, and artificial intelligence are reshaping global economic competition.",
    focus: [
      "Industrial capacity increasingly determines technological sovereignty.",
      "Critical mineral access is becoming central to manufacturing strategy.",
      "Governments are accepting higher costs in exchange for control and redundancy.",
    ],
    questions: [
      "Which production capabilities are most difficult to replace?",
      "How will subsidies affect international competition?",
      "Where can new industrial ecosystems realistically develop?",
    ],
  }),
  createPublication({
    id: "DRI-B006",
    title: "Synthetic Reality",
    subtitle: "Evidence and Trust in the Generative Era",
    division: "Future Systems",
    type: "Brief",
    date: "January 2026",
    readTime: "8 min",
    pages: 38,
    summary:
      "An examination of the institutional consequences of synthetic media, generative systems, and declining confidence in digital evidence.",
    focus: [
      "Visual plausibility can no longer function as reliable proof of authenticity.",
      "Verification infrastructure will become increasingly important to public trust.",
      "The ability to deny authentic evidence may be as consequential as the ability to create false evidence.",
    ],
    questions: [
      "How should institutions authenticate digital records?",
      "What standards can preserve chains of digital custody?",
      "How will synthetic media alter public expectations of evidence?",
    ],
  }),
  createPublication({
    id: "DRI-D002",
    title: "The Architecture of Collapse",
    subtitle: "Institutional Failure Across Civilizations",
    division: "Historical Analysis",
    type: "Dossier",
    date: "December 2025",
    readTime: "29 min",
    pages: 92,
    summary:
      "A comparative investigation into societies weakened by institutional rigidity, resource pressure, declining legitimacy, and reduced coordination capacity.",
    focus: [
      "Collapse is often a prolonged decline in institutional capability rather than a single event.",
      "Rigid institutions can survive visible warning signs while losing the ability to adapt.",
      "Legitimacy and coordination frequently deteriorate before formal political structures disappear.",
    ],
    questions: [
      "Which indicators distinguish temporary crisis from structural decline?",
      "How do institutions lose adaptive capacity?",
      "What historical comparisons are useful without becoming simplistic?",
    ],
  }),
  createPublication({
    id: "DRI-RD-001",
    title: "The Architecture of Collapse",
    subtitle: "Institutional Failure Across Civilizations",
    division: "Historical Analysis",
    type: "Research Dossier",
    date: "December 2025",
    readTime: "29 min",
    pages: 92,
    summary:
      "A comparative investigation into historical societies weakened by institutional rigidity, resource pressure, and declining legitimacy.",
    focus: [
      "Institutional decline is usually uneven and difficult to recognize from within.",
      "Resource pressure becomes more dangerous when governance loses flexibility.",
      "Societies can preserve symbolic continuity while practical capacity deteriorates.",
    ],
    questions: [
      "How should institutional capacity be measured?",
      "Which forms of resilience repeatedly appear in historical recoveries?",
      "Where do popular collapse narratives distort historical evidence?",
    ],
  }),
];

export function getPublicationById(
  publicationId: string | undefined,
): PublicationRecord | undefined {
  if (!publicationId) {
    return undefined;
  }

  return publicationRecords.find(
    (publication) => publication.id === publicationId,
  );
}
