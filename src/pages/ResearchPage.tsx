import { useMemo, useState } from "react";
import { Link } from "react-router";
import "../App.css";

type PublicationType = "Report" | "Brief" | "Forecast" | "Dossier";

type Publication = {
  id: string;
  title: string;
  division: string;
  type: PublicationType;
  date: string;
  readTime: string;
  description: string;
  topics: string[];
};

const publications: Publication[] = [
  {
    id: "DRI-R001",
    title: "The Automation Threshold",
    division: "Future Systems",
    type: "Report",
    date: "July 2026",
    readTime: "18 min",
    description:
      "Assessing how rapidly intelligent automation could restructure labor, productivity, institutional power, and economic mobility.",
    topics: ["Artificial intelligence", "Automation", "Labor"],
  },
  {
    id: "DRI-B002",
    title: "Fragile Systems",
    division: "Global Risk",
    type: "Brief",
    date: "June 2026",
    readTime: "9 min",
    description:
      "An analysis of the interconnected infrastructure failures capable of producing cascading national and regional crises.",
    topics: ["Infrastructure", "Systemic risk", "Resilience"],
  },
  {
    id: "DRI-F001",
    title: "The State of the Future 2027",
    division: "Future Systems",
    type: "Forecast",
    date: "June 2026",
    readTime: "32 min",
    description:
      "DRI's annual assessment of the technologies, risks, institutions, and structural changes likely to define the next decade.",
    topics: ["Forecasting", "Global systems", "Technology"],
  },
  {
    id: "DRI-R003",
    title: "The Orbital Economy",
    division: "Space Studies",
    type: "Report",
    date: "May 2026",
    readTime: "21 min",
    description:
      "Examining the companies, technologies, policies, and strategic incentives shaping the next era of orbital development.",
    topics: ["Commercial space", "Orbital systems", "Policy"],
  },
  {
    id: "DRI-D001",
    title: "Networks of Influence",
    division: "Historical Analysis",
    type: "Dossier",
    date: "April 2026",
    readTime: "26 min",
    description:
      "A historical study of how financial, political, and information networks accumulate influence across generations.",
    topics: ["Institutions", "Political history", "Power"],
  },
  {
    id: "DRI-B004",
    title: "Grid Under Pressure",
    division: "Energy & Infrastructure",
    type: "Brief",
    date: "March 2026",
    readTime: "11 min",
    description:
      "Evaluating the vulnerabilities emerging across aging electrical grids as demand, extreme weather, and electrification accelerate.",
    topics: ["Energy security", "Power grids", "Climate"],
  },
  {
    id: "DRI-R005",
    title: "The New Industrial Competition",
    division: "Economic Intelligence",
    type: "Report",
    date: "February 2026",
    readTime: "20 min",
    description:
      "How semiconductors, critical minerals, artificial intelligence, and industrial policy are reshaping economic competition.",
    topics: ["Industry", "Markets", "Geoeconomics"],
  },
  {
    id: "DRI-B006",
    title: "Synthetic Reality",
    division: "Future Systems",
    type: "Brief",
    date: "January 2026",
    readTime: "8 min",
    description:
      "Understanding the institutional consequences of synthetic media, generative systems, and declining trust in digital evidence.",
    topics: ["Synthetic media", "AI", "Information"],
  },
  {
    id: "DRI-D002",
    title: "The Architecture of Collapse",
    division: "Historical Analysis",
    type: "Dossier",
    date: "December 2025",
    readTime: "29 min",
    description:
      "Comparing historical cases in which institutional rigidity, resource stress, and declining legitimacy produced systemic failure.",
    topics: ["Civilizations", "Collapse", "Institutions"],
  },
];

const divisionOptions = [
  "All divisions",
  "Future Systems",
  "Global Risk",
  "Space Studies",
  "Economic Intelligence",
  "Energy & Infrastructure",
  "Historical Analysis",
];

const typeOptions = [
  "All types",
  "Report",
  "Brief",
  "Forecast",
  "Dossier",
];

function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All divisions");
  const [selectedType, setSelectedType] = useState("All types");

  const filteredPublications = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return publications.filter((publication) => {
      const searchableText = [
        publication.title,
        publication.description,
        publication.division,
        publication.type,
        ...publication.topics,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      const matchesDivision =
        selectedDivision === "All divisions" ||
        publication.division === selectedDivision;

      const matchesType =
        selectedType === "All types" ||
        publication.type === selectedType;

      return matchesSearch && matchesDivision && matchesType;
    });
  }, [searchQuery, selectedDivision, selectedType]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDivision("All divisions");
    setSelectedType("All types");
  };

  return (
    <div className="siteShell researchLibraryPage">
      <header className="siteHeader">
        <Link className="brand" to="/" aria-label="Dietz Research Institute">
          <img
            className="brandLogoImage"
            src="/brand/DRI_Primary_Logo.png"
            alt="Dietz Research Institute"
          />
        </Link>

        <nav className="mainNavigation" aria-label="Main navigation">
          <Link className="activeNav" to="/research">
            Research
          </Link>
          <Link to="/reports">Reports</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/about">About</Link>

          <Link to="/search">Search</Link>
          <Link to="/library">Saved</Link>
          <Link to="/studio">Studio</Link>
        </nav>

        <Link className="subscribeButton" to="/subscribe">
          Subscribe
        </Link>
      </header>

      <main>
        <section className="researchLibraryHero">
          <div className="libraryHeroCopy">
            <p className="eyebrow">DRI Research Library</p>

            <h1>
              Evidence for
              <span> understanding change.</span>
            </h1>

            <p>
              Explore reports, intelligence briefs, strategic forecasts, and
              investigative dossiers produced across the Dietz Research
              Institute.
            </p>
          </div>

          <div className="libraryHeroIndex">
            <div>
              <strong>{publications.length}</strong>
              <span>Publications</span>
            </div>

            <div>
              <strong>06</strong>
              <span>Research divisions</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Publication formats</span>
            </div>
          </div>
        </section>

        <section className="researchControls" aria-label="Research filters">
          <div className="researchSearchField">
            <label htmlFor="research-search">Search publications</label>

            <div className="searchInputWrapper">
              <span aria-hidden="true">⌕</span>

              <input
                id="research-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search topics, titles, or keywords"
              />
            </div>
          </div>

          <div className="researchSelectField">
            <label htmlFor="division-filter">Division</label>

            <select
              id="division-filter"
              value={selectedDivision}
              onChange={(event) => setSelectedDivision(event.target.value)}
            >
              {divisionOptions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div className="researchSelectField">
            <label htmlFor="type-filter">Publication type</label>

            <select
              id="type-filter"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="clearFiltersButton" onClick={clearFilters}>
            Clear filters
          </button>
        </section>

        <section className="researchResultsSection">
          <div className="researchResultsHeader">
            <div>
              <p className="eyebrow">Publication archive</p>
              <h2>Research and analysis</h2>
            </div>

            <p>
              Showing <strong>{filteredPublications.length}</strong> of{" "}
              <strong>{publications.length}</strong> publications
            </p>
          </div>

          {filteredPublications.length > 0 ? (
            <div className="publicationGrid">
              {filteredPublications.map((publication) => (
                <article className="publicationCard" key={publication.id}>
                  <div className="publicationCardHeader">
                    <span>{publication.id}</span>
                    <span>{publication.type}</span>
                  </div>

                  <div className="publicationCardBody">
                    <p className="publicationDivision">
                      {publication.division}
                    </p>

                    <h3>{publication.title}</h3>

                    <p className="publicationDescription">
                      {publication.description}
                    </p>

                    <div className="publicationTopics">
                      {publication.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  </div>

                  <div className="publicationCardFooter">
                    <div>
                      <span>{publication.date}</span>
                      <span>{publication.readTime} read</span>
                    </div>

                    <Link
                      className="publicationOpenLink"
                      to={`/publication/${publication.id}`}
                      aria-label={`Open ${publication.title}`}
                    >
                      ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="noResearchResults">
              <span>00</span>
              <h3>No publications found.</h3>
              <p>
                Try changing your search terms or removing one of the selected
                filters.
              </p>
              <button type="button" onClick={clearFilters}>
                Reset research filters
              </button>
            </div>
          )}
        </section>

        <section className="researchMethodSection">
          <div>
            <p className="eyebrow">Research standard</p>
            <h2>Structured inquiry. Transparent reasoning.</h2>
          </div>

          <div className="researchMethodGrid">
            <article>
              <span>01</span>
              <h3>Define</h3>
              <p>
                Establish the research question, scope, assumptions, and
                analytical boundaries.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Investigate</h3>
              <p>
                Gather primary evidence, credible data, historical context,
                and competing interpretations.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Analyze</h3>
              <p>
                Identify relationships, test claims, challenge assumptions,
                and evaluate uncertainty.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Communicate</h3>
              <p>
                Translate complex findings into clear, useful, and accessible
                intelligence.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="footerBrand">
          <span className="brandMark smallBrandMark">
            <span>DR</span>
          </span>

          <div>
            <strong>Dietz Research Institute</strong>
            <p>Researching what comes next.</p>
          </div>
        </div>

        <div className="footerLinks">
          <Link to="/research">Research</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/about">About</Link>
        </div>

        <p className="copyright">© 2026 Dietz Research Institute</p>
      </footer>
    </div>
  );
}

export default ResearchPage;
