import { useMemo, useState } from "react";
import { Link } from "react-router";
import "../App.css";

type InsightCategory =
  | "Technology"
  | "Global Risk"
  | "Space"
  | "Economics"
  | "Infrastructure"
  | "History";

type Insight = {
  id: string;
  title: string;
  category: InsightCategory;
  division: string;
  date: string;
  readTime: string;
  summary: string;
  signal: string;
  featured?: boolean;
};

const insights: Insight[] = [
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
    featured: true,
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
  },
];

const categoryOptions = [
  "All categories",
  "Technology",
  "Global Risk",
  "Space",
  "Economics",
  "Infrastructure",
  "History",
];

function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All categories");

  const featuredInsight =
    insights.find((insight) => insight.featured) ?? insights[0];

  const filteredInsights = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return insights.filter((insight) => {
      const searchableText = [
        insight.title,
        insight.category,
        insight.division,
        insight.summary,
        insight.signal,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery === "" || searchableText.includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === "All categories" ||
        insight.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All categories");
  };

  return (
    <div className="siteShell insightsPage">
      <header className="siteHeader">
        <Link className="brand" to="/" aria-label="Dietz Research Institute">
          <span className="brandMark">
            <span>DR</span>
          </span>

          <span className="brandText">
            <strong>Dietz Research</strong>
            <span>Institute</span>
          </span>
        </Link>

        <nav className="mainNavigation" aria-label="Main navigation">
          <Link to="/research">Research</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/divisions">Divisions</Link>

          <Link className="activeNav" to="/insights">
            Insights
          </Link>

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
        <section className="insightsHero">
          <div className="insightsHeroCopy">
            <p className="eyebrow">DRI Insights</p>

            <h1>
              Signals before
              <span> consensus.</span>
            </h1>

            <p>
              Concise analysis of emerging developments, institutional shifts,
              and early indicators across the systems DRI monitors.
            </p>
          </div>

          <div className="insightsHeroMetrics">
            <div>
              <strong>{insights.length}</strong>
              <span>Published insights</span>
            </div>

            <div>
              <strong>06</strong>
              <span>Coverage categories</span>
            </div>

            <div>
              <strong>Weekly</strong>
              <span>Publication cycle</span>
            </div>
          </div>
        </section>

        <section className="featuredInsightSection">
          <div className="featuredInsightIdentity">
            <div className="featuredInsightNumber">01</div>

            <div className="featuredInsightMark">
              <span>DRI</span>
              <p>Insight</p>
            </div>
          </div>

          <article className="featuredInsightContent">
            <div className="featuredInsightMeta">
              <span>Featured insight</span>
              <span>{featuredInsight.id}</span>
            </div>

            <p className="featuredInsightCategory">
              {featuredInsight.category} · {featuredInsight.division}
            </p>

            <h2>{featuredInsight.title}</h2>

            <p className="featuredInsightSummary">
              {featuredInsight.summary}
            </p>

            <div className="featuredInsightSignal">
              <span>Key signal</span>
              <p>{featuredInsight.signal}</p>
            </div>

            <div className="featuredInsightFooter">
              <div>
                <span>{featuredInsight.date}</span>
                <span>{featuredInsight.readTime} read</span>
              </div>

              <Link
                className="featuredInsightReadLink"
                to={`/insight/${featuredInsight.id}`}
              >
                Read insight
                <span>→</span>
              </Link>
            </div>
          </article>
        </section>

        <section className="insightArchiveSection">
          <div className="insightArchiveHeading">
            <div>
              <p className="eyebrow">Intelligence stream</p>
              <h2>Recent analysis</h2>
            </div>

            <p>
              Short-form institutional analysis designed to identify meaningful
              changes before they become broadly recognized.
            </p>
          </div>

          <div className="insightArchiveControls">
            <div className="insightSearchField">
              <label htmlFor="insight-search">Search insights</label>

              <input
                id="insight-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search topics, systems, or keywords"
              />
            </div>

            <div className="insightCategoryField">
              <label htmlFor="insight-category">Category</label>

              <select
                id="insight-category"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="insightResultCount">
            Showing <strong>{filteredInsights.length}</strong> of{" "}
            <strong>{insights.length}</strong> insights
          </div>

          {filteredInsights.length > 0 ? (
            <div className="insightArchiveGrid">
              {filteredInsights.map((insight, index) => (
                <article className="insightCard" key={insight.id}>
                  <div className="insightCardHeader">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{insight.id}</span>
                  </div>

                  <div className="insightCardBody">
                    <p className="insightCardCategory">
                      {insight.category}
                    </p>

                    <p className="insightCardDivision">
                      {insight.division}
                    </p>

                    <h3>{insight.title}</h3>
                    <p>{insight.summary}</p>
                  </div>

                  <div className="insightCardSignal">
                    <span>Signal</span>
                    <p>{insight.signal}</p>
                  </div>

                  <div className="insightCardFooter">
                    <div>
                      <span>{insight.date}</span>
                      <span>{insight.readTime}</span>
                    </div>

                    <Link
                      className="insightOpenLink"
                      to={`/insight/${insight.id}`}
                      aria-label={`Read ${insight.title}`}
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
              <h3>No insights found.</h3>
              <p>
                Try another search term or select a different category.
              </p>

              <button type="button" onClick={resetFilters}>
                Reset insight filters
              </button>
            </div>
          )}
        </section>

        <section className="signalFrameworkSection">
          <div className="signalFrameworkHeading">
            <p className="eyebrow">Analytical framework</p>

            <h2>
              From isolated development to meaningful signal.
            </h2>
          </div>

          <div className="signalFrameworkGrid">
            <article>
              <span>01</span>
              <h3>Observe</h3>
              <p>
                Identify new events, capabilities, decisions, and behavioral
                changes across monitored systems.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Connect</h3>
              <p>
                Determine how the development interacts with wider economic,
                technological, historical, and institutional forces.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Interpret</h3>
              <p>
                Separate temporary noise from developments that may represent
                structural change.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Communicate</h3>
              <p>
                Present the signal clearly while preserving uncertainty,
                limitations, and competing explanations.
              </p>
            </article>
          </div>
        </section>

        <section className="insightBriefingSection">
          <div>
            <p className="eyebrow">DRI Weekly Briefing</p>

            <h2>
              The developments worth watching—without the noise.
            </h2>
          </div>

          <form
            className="insightBriefingForm"
            action="/subscribe"
            method="get"
          >
            <label className="srOnly" htmlFor="briefing-email">
              Email address
            </label>

            <input
              id="briefing-email"
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />

            <button type="submit">Join briefing</button>
          </form>
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
          <Link to="/insights">Insights</Link>
        </div>

        <p className="copyright">© 2026 Dietz Research Institute</p>
      </footer>
    </div>
  );
}

export default InsightsPage;
