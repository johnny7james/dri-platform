import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  readResearchProjects,
  researchStageOrder,
  resetResearchProjects,
  saveResearchProjects,
} from "../lib/researchProjects";
import type {
  ResearchProject,
  ResearchProjectPriority,
  ResearchProjectStage,
  ResearchProjectType,
} from "../lib/researchProjects";
import "../App.css";


const divisions = [
  "Multidisciplinary",
  "Future Systems",
  "Global Risk",
  "Space Studies",
  "Economic Intelligence",
  "Energy & Infrastructure",
  "Historical Analysis",
];

const projectTypes: ResearchProjectType[] = [
  "Report",
  "Brief",
  "Forecast",
  "Dossier",
  "Insight",
];

const priorities: ResearchProjectPriority[] = [
  "Critical",
  "High",
  "Standard",
];

function StudioPage() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);

  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDivision, setNewDivision] = useState("Future Systems");
  const [newType, setNewType] = useState<ResearchProjectType>("Report");
  const [newPriority, setNewPriority] =
    useState<ResearchProjectPriority>("Standard");
  const [newDueDate, setNewDueDate] = useState("");
  const [newLead, setNewLead] = useState("Johnny Dietz");
  const [newObjective, setNewObjective] = useState("");
  const [formError, setFormError] = useState("");

  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("All divisions");
  const [priorityFilter, setPriorityFilter] = useState<
    ResearchProjectPriority | "All priorities"
  >("All priorities");

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const importPortfolioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProjects(readResearchProjects());
  }, []);

  const averageProgress = useMemo(() => {
    if (projects.length === 0) {
      return 0;
    }

    const totalProgress = projects.reduce(
      (total, project) => total + project.progress,
      0,
    );

    return Math.round(totalProgress / projects.length);
  }, [projects]);

  const reviewProjects = projects.filter(
    (project) => project.stage === "Review",
  ).length;

  const criticalProjects = projects.filter(
    (project) => project.priority === "Critical",
  ).length;

  const filteredProjects = useMemo(() => {
    const normalizedSearchQuery = projectSearchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        project.id.toLowerCase().includes(normalizedSearchQuery) ||
        project.title.toLowerCase().includes(normalizedSearchQuery) ||
        project.objective.toLowerCase().includes(normalizedSearchQuery) ||
        project.division.toLowerCase().includes(normalizedSearchQuery);

      const matchesDivision =
        divisionFilter === "All divisions" ||
        project.division === divisionFilter;

      const matchesPriority =
        priorityFilter === "All priorities" ||
        project.priority === priorityFilter;

      return matchesSearch && matchesDivision && matchesPriority;
    });
  }, [divisionFilter, priorityFilter, projectSearchQuery, projects]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId),
    [projects, selectedProjectId],
  );

  const persistProjects = (nextProjects: ResearchProject[]) => {
    setProjects(nextProjects);
    saveResearchProjects(nextProjects);
  };

  const updateProjectProgress = (projectId: string, progress: number) => {
    persistProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              progress,
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    );
  };

  const advanceProject = (projectId: string) => {
    persistProjects(
      projects.map((project) => {
        if (project.id !== projectId) {
          return project;
        }

        const currentStageIndex = researchStageOrder.indexOf(project.stage);
        const nextStage =
          researchStageOrder[
            Math.min(currentStageIndex + 1, researchStageOrder.length - 1)
          ];

        const minimumProgressByStage = {
          Scoping: 10,
          Research: 30,
          Analysis: 50,
          Drafting: 72,
          Review: 90,
        };

        return {
          ...project,
          stage: nextStage,
          progress: Math.max(project.progress, minimumProgressByStage[nextStage]),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const deleteProject = (projectId: string) => {
    persistProjects(projects.filter((project) => project.id !== projectId));
  };

  const updateProjectDetails = (
    projectId: string,
    updates: Partial<ResearchProject>,
  ) => {
    persistProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    );
  };

  const exportProjectPortfolio = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      platform: "Dietz Research Institute",
      workspace: "Research Studio",
      projects,
    };

    const fileBlob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });

    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download = "dri-research-portfolio.json";
    downloadLink.click();

    URL.revokeObjectURL(fileUrl);
  };
  const importProjectPortfolio = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        const importedProjects = payload.projects;

        if (!Array.isArray(importedProjects)) {
          window.alert("Import failed. No projects array was found.");
          return;
        }

        const confirmedImport = window.confirm(
          `Import ${importedProjects.length} projects and replace the current Studio portfolio?`,
        );

        if (!confirmedImport) {
          return;
        }

        persistProjects(importedProjects);
        setSelectedProjectId("");
      } catch {
        window.alert("Import failed. The selected file is not valid JSON.");
      }
    };

    reader.readAsText(selectedFile);
    event.target.value = "";
  };

  const resetProjectPortfolio = () => {
    const confirmedReset = window.confirm(
      "Reset the Research Studio portfolio to the original DRI seed projects?",
    );

    if (!confirmedReset) {
      return;
    }

    setProjects(resetResearchProjects());
  };

  const exportSingleProjectBrief = (project: ResearchProject) => {
    const slug = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const brief = `# ${project.title}

## Project Metadata

- ID: ${project.id}
- Division: ${project.division}
- Type: ${project.type}
- Stage: ${project.stage}
- Priority: ${project.priority}
- Lead: ${project.lead}
- Target Date: ${project.dueDate}
- Progress: ${project.progress}%

## Research Objective

${project.objective || "No objective recorded."}

## Next Action

${project.nextAction || "No next action recorded."}

## Research Notes

${project.notes || "No research notes recorded."}

## Source Queue

${project.sources || "No sources recorded."}
`;

    const fileBlob = new Blob([brief], {
      type: "text/markdown",
    });

    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download = `${project.id}-${slug || "research-brief"}.md`;
    downloadLink.click();

    URL.revokeObjectURL(fileUrl);
  };

  const generateProjectId = () => {
    const largestProjectNumber = projects.reduce((largestNumber, project) => {
      const numericPart = Number(project.id.replace(/\D/g, ""));

      return Number.isFinite(numericPart)
        ? Math.max(largestNumber, numericPart)
        : largestNumber;
    }, 0);

    return `DRI-P-${String(largestProjectNumber + 1).padStart(3, "0")}`;
  };

  const resetCreateForm = () => {
    setNewTitle("");
    setNewDivision("Future Systems");
    setNewType("Report");
    setNewPriority("Standard");
    setNewDueDate("");
    setNewLead("Johnny Dietz");
    setNewObjective("");
    setFormError("");
  };

  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newTitle.trim().length < 3 ||
      newObjective.trim().length < 10 ||
      !newDueDate
    ) {
      setFormError(
        "Enter a project title, target date, and clear research objective.",
      );

      return;
    }

    const timestamp = new Date().toISOString();

    const newProject: ResearchProject = {
      id: generateProjectId(),
      title: newTitle.trim(),
      division: newDivision,
      type: newType,
      stage: "Scoping",
      priority: newPriority,
      dueDate: newDueDate,
      lead: newLead.trim() || "Unassigned",
      objective: newObjective.trim(),
      nextAction: "Define research scope and identify first sources.",
      notes: "",
      sources: "",
      progress: 5,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    persistProjects([newProject, ...projects]);
    resetCreateForm();
    setIsCreatePanelOpen(false);
  };

  const priorityClassName = (priority: ResearchProject["priority"]) => {
    if (priority === "Critical") {
      return "criticalPriority";
    }

    if (priority === "High") {
      return "highPriority";
    }

    return "";
  };

  const formatProjectDate = (dateValue: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${dateValue}T00:00:00`));

  const getProjectTimingStatus = (dateValue: string) => {
    const dueDate = new Date(`${dateValue}T00:00:00`);
    const today = new Date();

    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const dayDifference = Math.ceil(
      (dueDate.getTime() - todayDateOnly.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (dayDifference < 0) {
      return {
        label: "Overdue",
        className: "isOverdue",
      };
    }

    if (dayDifference <= 14) {
      return {
        label: "Due soon",
        className: "isDueSoon",
      };
    }

    return {
      label: "On track",
      className: "isOnTrack",
    };
  };

  const countTextLines = (value?: string) =>
    value
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean).length ?? 0;

  const countWords = (value?: string) =>
    value
      ?.trim()
      .split(/\s+/)
      .filter(Boolean).length ?? 0;

  return (
    <div className="siteShell studioPage">
      <header className="siteHeader">
        <Link className="brand" to="/">
          <img
            className="brandLogoImage"
            src="/brand/DRI_Primary_Logo.png"
            alt="Dietz Research Institute"
          />
        </Link>

        <nav className="mainNavigation">
          <Link to="/research">Research</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Search</Link>
          <Link to="/library">Saved</Link>
          <Link className="activeNav" to="/studio">
            Studio
          </Link>
        </nav>

        <Link className="subscribeButton" to="/subscribe">
          Subscribe
        </Link>
      </header>

      <main>
        <section className="studioHero">
          <div className="studioHeroCopy">
            <p className="eyebrow">DRI Research Operations</p>

            <h1>
              Turn questions into
              <span> institutional research.</span>
            </h1>

            <p>
              Manage active studies from initial scope through research,
              analysis, drafting, and final review.
            </p>
          </div>

          <div className="studioHeroPanel">
            <div>
              <span>Internal workspace</span>
              <span>DRI-OPS</span>
            </div>

            <section>
              <strong>DRI</strong>
              <p>Research Studio</p>
            </section>

            <footer>
              <span>Environment</span>
              <strong>Local prototype</strong>
            </footer>
          </div>
        </section>

        <section className="studioMetrics">
          <article>
            <span>Active projects</span>
            <strong>{projects.length}</strong>
            <p>Across all research divisions</p>
          </article>

          <article>
            <span>In final review</span>
            <strong>{reviewProjects}</strong>
            <p>Approaching publication readiness</p>
          </article>

          <article>
            <span>Critical priority</span>
            <strong>{criticalProjects}</strong>
            <p>Projects requiring attention</p>
          </article>

          <article>
            <span>Average progress</span>
            <strong>{averageProgress}%</strong>
            <p>Across the active portfolio</p>
          </article>
        </section>

        <section className="studioBoardSection">
          <div className="studioBoardHeading">
            <div>
              <p className="eyebrow">Active research portfolio</p>
              <h2>Project command board</h2>
            </div>

            <div className="studioBoardActions">
              <button
                type="button"
                onClick={() =>
                  setIsCreatePanelOpen((currentState) => !currentState)
                }
              >
                {isCreatePanelOpen
                  ? "Close project intake"
                  : "New research project"}
                <span>{isCreatePanelOpen ? "−" : "+"}</span>
              </button>

              <button type="button" onClick={exportProjectPortfolio}>
                Export portfolio
              </button>

              <button
                type="button"
                onClick={() => importPortfolioInputRef.current?.click()}
              >
                Import portfolio
              </button>

              <button type="button" onClick={resetProjectPortfolio}>
                Reset portfolio
              </button>

              <input
                ref={importPortfolioInputRef}
                className="studioHiddenFileInput"
                type="file"
                accept="application/json,.json"
                onChange={importProjectPortfolio}
              />
            </div>
          </div>

          {isCreatePanelOpen && (
            <form className="createStudioProjectForm" onSubmit={createProject}>
              <div className="createStudioProjectHeading">
                <div>
                  <p className="eyebrow">Research intake</p>
                  <h3>Define a new DRI project.</h3>
                </div>

                <p>
                  New projects begin in the Scoping stage with five percent
                  initial progress.
                </p>
              </div>

              <div className="createStudioProjectFields">
                <label>
                  <span>Project title *</span>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                      setFormError("");
                    }}
                    placeholder="Research project title"
                  />
                </label>

                <label>
                  <span>Lead researcher</span>
                  <input
                    type="text"
                    value={newLead}
                    onChange={(event) => setNewLead(event.target.value)}
                    placeholder="Research lead"
                  />
                </label>

                <label>
                  <span>Division *</span>
                  <select
                    value={newDivision}
                    onChange={(event) => setNewDivision(event.target.value)}
                  >
                    {divisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Publication type *</span>
                  <select
                    value={newType}
                    onChange={(event) =>
                      setNewType(event.target.value as ResearchProjectType)
                    }
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Priority *</span>
                  <select
                    value={newPriority}
                    onChange={(event) =>
                      setNewPriority(
                        event.target.value as ResearchProjectPriority,
                      )
                    }
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Target date *</span>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(event) => {
                      setNewDueDate(event.target.value);
                      setFormError("");
                    }}
                  />
                </label>

                <label className="createStudioProjectObjective">
                  <span>Research objective *</span>
                  <textarea
                    value={newObjective}
                    onChange={(event) => {
                      setNewObjective(event.target.value);
                      setFormError("");
                    }}
                    placeholder="Define the central question, scope, or intended research outcome."
                    rows={5}
                  />
                </label>
              </div>

              {formError && (
                <div className="createStudioProjectError" role="alert">
                  {formError}
                </div>
              )}

              <div className="createStudioProjectActions">
                <button type="submit">
                  Create research project
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetCreateForm();
                    setIsCreatePanelOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="studioBoardFilters">
            <label>
              <span>Search projects</span>
              <input
                type="search"
                value={projectSearchQuery}
                onChange={(event) =>
                  setProjectSearchQuery(event.target.value)
                }
                placeholder="Search title, ID, division, or objective"
              />
            </label>

            <label>
              <span>Division</span>
              <select
                value={divisionFilter}
                onChange={(event) => setDivisionFilter(event.target.value)}
              >
                <option value="All divisions">All divisions</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Priority</span>
              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(
                    event.target.value as
                      | ResearchProjectPriority
                      | "All priorities",
                  )
                }
              >
                <option value="All priorities">All priorities</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                setProjectSearchQuery("");
                setDivisionFilter("All divisions");
                setPriorityFilter("All priorities");
              }}
            >
              Clear filters
            </button>
          </div>

          {selectedProject && (
            <section className="studioProjectDetailPanel">
              <div className="studioProjectDetailHeader">
                <div>
                  <p className="eyebrow">Selected research project</p>
                  <h3>{selectedProject.title}</h3>
                </div>

                <div className="studioProjectDetailActions">
                  <button
                    type="button"
                    onClick={() => exportSingleProjectBrief(selectedProject)}
                  >
                    Export brief
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProjectId("")}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="studioProjectEditGrid">
                <label className="studioProjectEditWide">
                  <span>Project title</span>
                  <input
                    type="text"
                    value={selectedProject.title}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        title: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span>Stage</span>
                  <select
                    value={selectedProject.stage}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        stage: event.target.value as ResearchProjectStage,
                      })
                    }
                  >
                    {researchStageOrder.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Priority</span>
                  <select
                    value={selectedProject.priority}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        priority:
                          event.target.value as ResearchProjectPriority,
                      })
                    }
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Type</span>
                  <select
                    value={selectedProject.type}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        type: event.target.value as ResearchProjectType,
                      })
                    }
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Target date</span>
                  <input
                    type="date"
                    value={selectedProject.dueDate}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        dueDate: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span>Lead</span>
                  <input
                    type="text"
                    value={selectedProject.lead}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        lead: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  <span>Progress</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedProject.progress}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        progress: Math.min(
                          100,
                          Math.max(0, Number(event.target.value) || 0),
                        ),
                      })
                    }
                  />
                </label>

                <div>
                  <span>Project ID</span>
                  <strong>{selectedProject.id}</strong>
                </div>

                <label className="studioProjectEditWide">
                  <span>Research objective</span>
                  <textarea
                    rows={5}
                    value={selectedProject.objective}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        objective: event.target.value,
                      })
                    }
                  />
                </label>

                <label className="studioProjectEditWide">
                  <span>Next action</span>
                  <textarea
                    rows={3}
                    value={selectedProject.nextAction ?? ""}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        nextAction: event.target.value,
                      })
                    }
                    placeholder="What is the next concrete research move?"
                  />
                </label>

                <label className="studioProjectEditFull">
                  <span>Research notes</span>
                  <textarea
                    rows={6}
                    value={selectedProject.notes ?? ""}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        notes: event.target.value,
                      })
                    }
                    placeholder="Capture findings, source notes, questions, and draft thoughts."
                  />
                </label>

                <label className="studioProjectEditFull">
                  <span>Source queue</span>
                  <textarea
                    rows={6}
                    value={selectedProject.sources ?? ""}
                    onChange={(event) =>
                      updateProjectDetails(selectedProject.id, {
                        sources: event.target.value,
                      })
                    }
                    placeholder="Paste source links, book titles, datasets, article names, or evidence leads."
                  />
                </label>
              </div>
            </section>
          )}

          <div className="studioStageBoard">
            {researchStageOrder.map((stage, stageIndex) => {
              const stageProjects = filteredProjects.filter(
                (project) => project.stage === stage,
              );

              return (
                <section className="studioStageColumn" key={stage}>
                  <header>
                    <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                    <h3>{stage}</h3>
                    <strong>{stageProjects.length}</strong>
                  </header>

                  {stageProjects.length > 0 ? (
                    stageProjects.map((project) => (
                      <article className="studioProjectCard" key={project.id}>
                        <div>
                          <span>{project.id}</span>

                          <span
                            className={`studioDueStatus ${
                              getProjectTimingStatus(project.dueDate).className
                            }`}
                          >
                            {getProjectTimingStatus(project.dueDate).label}
                          </span>

                          <strong className={priorityClassName(project.priority)}>
                            {project.priority}
                          </strong>
                        </div>

                        <p>{project.division}</p>
                        <h4>{project.title}</h4>

                        <small>{project.objective}</small>

                        <div className="studioProjectMeta">
                          <span>
                            Lead
                            <strong>{project.lead}</strong>
                          </span>

                          <span>
                            Target
                            <strong>{formatProjectDate(project.dueDate)}</strong>
                          </span>

                          <span>
                            Sources
                            <strong>{countTextLines(project.sources)} queued</strong>
                          </span>

                          <span>
                            Notes
                            <strong>{countWords(project.notes)} words</strong>
                          </span>
                        </div>

                        <footer>
                          <span>{project.type}</span>
                          <strong>{project.progress}%</strong>
                        </footer>

                        <input
                          className="studioProgressInput"
                          type="range"
                          min="0"
                          max="100"
                          value={project.progress}
                          onChange={(event) =>
                            updateProjectProgress(
                              project.id,
                              Number(event.target.value),
                            )
                          }
                        />

                        <div className="studioProgressBar">
                          <span style={{ width: `${project.progress}%` }} />
                        </div>

                        <div className="studioCardActions">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                          >
                            Open details
                          </button>

                          <button
                            type="button"
                            disabled={project.stage === "Review"}
                            onClick={() => advanceProject(project.id)}
                          >
                            {project.stage === "Review"
                              ? "Final stage"
                              : "Advance stage"}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <article className="studioProjectCard">
                      <div>
                        <span>EMPTY</span>
                        <strong>None</strong>
                      </div>

                      <p>{stage}</p>
                      <h4>No active projects</h4>

                      <small>
                        Projects assigned to this stage will appear here.
                      </small>

                      <footer>
                        <span>Stage</span>
                        <strong>0%</strong>
                      </footer>

                      <div className="studioProgressBar">
                        <span style={{ width: "0%" }} />
                      </div>
                    </article>
                  )}
                </section>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudioPage;
