export type ResearchProjectStage =
  | "Scoping"
  | "Research"
  | "Analysis"
  | "Drafting"
  | "Review";

export type ResearchProjectPriority =
  | "Critical"
  | "High"
  | "Standard";

export type ResearchProjectType =
  | "Report"
  | "Brief"
  | "Forecast"
  | "Dossier"
  | "Insight";

export type ResearchProject = {
  id: string;
  title: string;
  division: string;
  type: ResearchProjectType;
  stage: ResearchProjectStage;
  priority: ResearchProjectPriority;
  dueDate: string;
  lead: string;
  objective: string;
  nextAction?: string;
  notes?: string;
  sources?: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

const RESEARCH_PROJECTS_KEY = "dri-research-projects";

export const researchStageOrder: ResearchProjectStage[] = [
  "Scoping",
  "Research",
  "Analysis",
  "Drafting",
  "Review",
];

export const seedResearchProjects: ResearchProject[] = [
  {
    id: "DRI-P-001",
    title: "The State of the Future 2027",
    division: "Multidisciplinary",
    type: "Forecast",
    stage: "Drafting",
    priority: "Critical",
    dueDate: "2026-09-30",
    lead: "Johnny Dietz",
    objective:
      "Produce DRI's annual assessment of technological, geopolitical, economic, and institutional change.",
    progress: 72,
    createdAt: "2026-06-01T12:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "DRI-P-002",
    title: "The Automation Threshold",
    division: "Future Systems",
    type: "Report",
    stage: "Review",
    priority: "High",
    dueDate: "2026-07-31",
    lead: "Johnny Dietz",
    objective:
      "Assess how autonomous systems could restructure labor, productivity, and organizational design.",
    progress: 91,
    createdAt: "2026-06-05T12:00:00.000Z",
    updatedAt: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "DRI-P-003",
    title: "Orbital Infrastructure Index",
    division: "Space Studies",
    type: "Report",
    stage: "Research",
    priority: "High",
    dueDate: "2026-10-15",
    lead: "Johnny Dietz",
    objective:
      "Map the launch, communications, logistics, servicing, and governance systems supporting the orbital economy.",
    progress: 34,
    createdAt: "2026-06-12T12:00:00.000Z",
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "DRI-P-004",
    title: "Critical Infrastructure Failure Atlas",
    division: "Global Risk",
    type: "Dossier",
    stage: "Analysis",
    priority: "Critical",
    dueDate: "2026-08-29",
    lead: "Johnny Dietz",
    objective:
      "Identify shared dependencies and cascading failure pathways across energy, communications, water, and transportation.",
    progress: 56,
    createdAt: "2026-06-15T12:00:00.000Z",
    updatedAt: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "DRI-P-005",
    title: "Water as Strategic Infrastructure",
    division: "Energy & Infrastructure",
    type: "Brief",
    stage: "Scoping",
    priority: "Standard",
    dueDate: "2026-11-20",
    lead: "Johnny Dietz",
    objective:
      "Define the economic and institutional consequences of rising water-system constraints.",
    progress: 12,
    createdAt: "2026-06-27T12:00:00.000Z",
    updatedAt: "2026-06-30T12:00:00.000Z",
  },
  {
    id: "DRI-P-006",
    title: "Institutional Decline Indicators",
    division: "Historical Analysis",
    type: "Dossier",
    stage: "Research",
    priority: "Standard",
    dueDate: "2026-12-12",
    lead: "Johnny Dietz",
    objective:
      "Develop a historically grounded framework for distinguishing temporary crisis from structural institutional decline.",
    progress: 28,
    createdAt: "2026-06-22T12:00:00.000Z",
    updatedAt: "2026-07-01T12:00:00.000Z",
  },
];

export function readResearchProjects(): ResearchProject[] {
  const storedValue = window.localStorage.getItem(RESEARCH_PROJECTS_KEY);

  if (!storedValue) {
    window.localStorage.setItem(
      RESEARCH_PROJECTS_KEY,
      JSON.stringify(seedResearchProjects),
    );

    return seedResearchProjects;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as ResearchProject[];

    if (!Array.isArray(parsedValue)) {
      return seedResearchProjects;
    }

    return parsedValue;
  } catch {
    window.localStorage.setItem(
      RESEARCH_PROJECTS_KEY,
      JSON.stringify(seedResearchProjects),
    );

    return seedResearchProjects;
  }
}

export function saveResearchProjects(projects: ResearchProject[]) {
  window.localStorage.setItem(
    RESEARCH_PROJECTS_KEY,
    JSON.stringify(projects),
  );
}

export function resetResearchProjects() {
  window.localStorage.setItem(
    RESEARCH_PROJECTS_KEY,
    JSON.stringify(seedResearchProjects),
  );

  return seedResearchProjects;
}
