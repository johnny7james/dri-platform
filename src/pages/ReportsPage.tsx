import { useMemo, useState } from "react";
import { Link } from "react-router";
import "../App.css";

type ReportSeries =
  | "Annual Forecast"
  | "Strategic Report"
  | "Risk Assessment"
  | "Research Dossier";

type Report = {
  id: string;
  title: string;
  subtitle: string;
  series: ReportSeries;
  division: string;
  year: number;
  pages: number;
  description: string;
  topics: string[];
};

const reports: Report[] = [
  {
    id: "DRI-AF-001",
    title: "The State of the Future",
    subtitle: "Annual Global Forecast and Risk Assessment",
    series: "Annual Forecast",
    division: "Multidisciplinary",
    year: 2027,
    pages: 118,
    description:
      "A comprehensive assessment of the technologies, conflicts, economic transitions, and institutional pressures likely to define the coming decade.",
    topics: ["Artificial intelligence", "Global risk", "Energy", "Space"],
  },
  {
    id: "DRI-SR-004",
    title: "The Automation Threshold",
    subtitle: "Labor, Productivity, and Institutional Power",
    series: "Strategic Report",
    division: "Future Systems",
    year: 2026,
    pages: 64,
    description:
      "An investigation into the point at which intelligent automation begins restructuring labor markets, institutions, and economic mobility.",
    topics: ["Automation", "Labor", "Productivity"],
  },
  {
    id: "DRI-RA-003",
    title: "Fragile Systems",
    subtitle: "Cascading Failure in Critical Infrastructure",
    series: "Risk Assessment",
    division: "Global Risk",
    year: 2026,
    pages: 52,
    description:
      "A systems-level assessment of how failures across energy, communications, transportation, and public services can compound into national crises.",
    topics: ["Infrastructure", "Resilience", "Systemic risk"],
  },
  {
    id: "DRI-SR-003",
    title: "The Orbital Economy",
    subtitle: "Markets and Power Beyond the Atmosphere",
    series: "Strategic Report",
    division: "Space Studies",
    year: 2026,
    pages: 71,
    description:
      "A study of the companies, technologies, policies, and geopolitical incentives shaping the emerging commercial orbital economy.",
    topics: ["Commercial space", "Orbital systems", "Policy"],
  },
  {
    id: "DRI-RD-002",
    title: "Networks of Influence",
    subtitle: "Institutions, Information, and Durable Power",
    series: "Research Dossier",
    division: "Historical Analysis",
    year: 2026,
    pages: 83,
    description:
      "A historical analysis of how political, financial, and information networks accumulate and preserve influence across generations.",
    topics: ["Institutions", "Political history", "Power"],
  },
  {
    id: "DRI-RA-002",
    title: "Grid Under Pressure",
    subtitle: "Energy Security in an Electrified World",
    series: "Risk Assessment",
    division: "Energy & Infrastructure",
    year: 2026,
    pages: 46,
    description:
      "An examination of the vulnerabilities facing electrical grids as demand, electrification, extreme weather, and digital dependence accelerate.",
    topics: ["Power grids", "Energy security", "Climate"],
  },
  {
    id: "DRI-SR-002",
    title: "The New Industrial Competition",
    subtitle: "Semiconductors, Minerals, and Strategic Production",
    series: "Strategic Report",
    division: "Economic Intelligence",
    year: 2026,
    pages: 69,
    description:
      "How semiconductors, critical minerals, industrial policy, and artificial intelligence are reshaping global economic competition.",
    topics: ["Industry", "Geoeconomics", "Markets"],
  },
  {
    id: "DRI-RD-001",
    title: "The Architecture of Collapse",
    subtitle: "Institutional Failure Across Civilizations",
    series: "Research Dossier",
    division: "Historical Analysis",
    year: 2025,
    pages: 92,
    description:
      "A comparative investigation into historical societies weakened by institutional rigidity, resource pressure, and declining legitimacy.",
    topics: ["Civilizations", "Collapse", "Institutions"],
  },
];

const seriesOptions = [
  "All series",
  "Annual Forecast",
  "Strategic Report",
  "Risk Assessment",
  "Research Dossier",
];

function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("All series");

  const filteredReports = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return reports.filter((report) => {
      const searchableText = [
        report.title,
        report.subtitle,
        report.series,
        report.division,
        report.description,
        ...report.topics,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery === "" || searchableText.includes(normalizedQuery);

      const matchesSeries =
        selectedSeries === "All series" || report.series === selectedSeries;

      return matchesSearch && matchesSeries;
    });
  }, [searchQuery, selectedSeries]);

  const featuredReport = reports[0];

  return (
    <div className="siteShell reportsPage">
      <header className="siteHeader">
        <Link className="brand" to="/" aria-label="Dietz Research Institute">
          <img
            className="brandLogoImage"
            src="/brand/DRI_Primary_Logo.png"
            alt="Dietz Research Institute"
          />
        </Link>

        <nav className="mainNavigation" aria-label="Main navigation">
          <Link to="/research">Research</Link>
          <Link className="activeNav" to="/reports">
            Reports
          </Link>
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
        <section className="reportsHero">
          <div className="reportsHeroCopy">
            <p className="eyebrow">DRI Publications</p>

            <h1>
              Reports built for
              <span> serious decisions.</span>
            </h1>

            <p>
              Long-form research, strategic assessments, and evidence-driven
              forecasts examining the systems shaping humanity&apos;s future.
            </p>
          </div>

          <div className="reportsHeroMetrics">
            <div>
              <strong>{reports.length}</strong>
              <span>Published reports</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Report series</span>
            </div>

            <div>
              <strong>595</strong>
              <span>Total research pages</span>
            </div>
          </div>
        </section>

        <section className="featuredPublicationSection">
          <div className="featuredPublicationCover">
            <div className="featuredCoverHeader">
              <span>Dietz Research Institute</span>
              <span>{featuredReport.id}</span>
            </div>

            <div className="featuredCoverOrbit">
              <div className="coverOrbitRing coverOrbitRingOne" />
              <div className="coverOrbitRing coverOrbitRingTwo" />
              <span>DRI</span>
            </div>

            <div className="featuredCoverTitle">
              <p>{featuredReport.subtitle}</p>
              <h2>{featuredReport.title}</h2>
              <strong>{featuredReport.year}</strong>
            </div>

            <div className="featuredCoverFooter">
              <span>Annual Forecast</span>
              <span>{featuredReport.pages} pages</span>
            </div>
          </div>

          <div className="featuredPublicationContent">
            <p className="eyebrow">Flagship publication</p>
            <h2>{featuredReport.title} 2027</h2>

            <p className="featuredPublicationSubtitle">
              {featuredReport.subtitle}
            </p>

            <p className="featuredPublicationDescription">
              {featuredReport.description}
            </p>

            <div className="featuredPublicationDetails">
              <div>
                <span>Series</span>
                <strong>{featuredReport.series}</strong>
              </div>

              <div>
                <span>Division</span>
                <strong>{featuredReport.division}</strong>
              </div>

              <div>
                <span>Length</span>
                <strong>{featuredReport.pages} pages</strong>
              </div>
            </div>

            <div className="featuredPublicationActions">
              <Link
                className="featuredReadLink"
                to={`/publication/${featuredReport.id}`}
              >
                Read online
              </Link>
              <button type="button">Download report</button>
            </div>
          </div>
        </section>

        <section className="reportArchiveSection">
          <div className="reportArchiveHeading">
            <div>
              <p className="eyebrow">Report archive</p>
              <h2>Published intelligence</h2>
            </div>

            <p>
              Browse DRI&apos;s major research publications, strategic studies,
              and institutional risk assessments.
            </p>
          </div>

          <div className="reportArchiveControls">
            <div className="reportSearchControl">
              <label htmlFor="report-search">Search reports</label>

              <input
                id="report-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search titles, divisions, or topics"
              />
            </div>

            <div className="reportSeriesControl">
              <label htmlFor="report-series">Report series</label>

              <select
                id="report-series"
                value={selectedSeries}
                onChange={(event) => setSelectedSeries(event.target.value)}
              >
                {seriesOptions.map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </div>

            <p>
              <strong>{filteredReports.length}</strong> reports
            </p>
          </div>

          {filteredReports.length > 0 ? (
            <div className="reportArchiveList">
              {filteredReports.map((report, index) => (
                <article className="reportArchiveItem" key={report.id}>
                  <div className="reportArchiveNumber">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="reportArchiveIdentity">
                    <div>
                      <span>{report.id}</span>
                      <span>{report.year}</span>
                    </div>

                    <p>{report.series}</p>
                  </div>

                  <div className="reportArchiveContent">
                    <p>{report.division}</p>
                    <h3>{report.title}</h3>
                    <h4>{report.subtitle}</h4>
                    <p>{report.description}</p>

                    <div className="reportArchiveTopics">
                      {report.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  </div>

                  <div className="reportArchiveAction">
                    <span>{report.pages} pages</span>
                    <Link
                      className="reportOpenLink"
                      to={`/publication/${report.id}`}
                      aria-label={`Open ${report.title}`}
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
              <h3>No reports found.</h3>
              <p>
                Change the search phrase or select a different report series.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSeries("All series");
                }}
              >
                Reset report filters
              </button>
            </div>
          )}
        </section>

        <section className="reportSeriesSection">
          <div className="reportSeriesHeading">
            <p className="eyebrow">Publication framework</p>
            <h2>Four report series. Four analytical purposes.</h2>
          </div>

          <div className="reportSeriesGrid">
            <article>
              <span>AF</span>
              <h3>Annual Forecast</h3>
              <p>
                DRI&apos;s flagship long-range assessment of emerging risks,
                structural changes, and global opportunities.
              </p>
            </article>

            <article>
              <span>SR</span>
              <h3>Strategic Report</h3>
              <p>
                In-depth research examining major technological, economic,
                political, and scientific transformations.
              </p>
            </article>

            <article>
              <span>RA</span>
              <h3>Risk Assessment</h3>
              <p>
                Structured analysis of vulnerabilities, cascading threats, and
                resilience across critical systems.
              </p>
            </article>

            <article>
              <span>RD</span>
              <h3>Research Dossier</h3>
              <p>
                Investigative studies of institutions, historical forces,
                networks, and complex questions of power.
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

export default ReportsPage;
