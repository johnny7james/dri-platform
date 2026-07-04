import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { insightRecords } from "../data/insights";
import { publicationRecords } from "../data/publications";
import "../App.css";

type SearchCategory =
  | "All"
  | "Publications"
  | "Insights"
  | "Divisions";

type SearchResult = {
  id: string;
  type: Exclude<SearchCategory, "All">;
  title: string;
  description: string;
  label: string;
  secondaryLabel: string;
  href: string;
  keywords: string[];
};

const divisionRecords: SearchResult[] = [
  {
    id: "FS",
    type: "Divisions",
    title: "Future Systems",
    description:
      "Artificial intelligence, robotics, biotechnology, automation, quantum computing, and emerging technological systems.",
    label: "Research division",
    secondaryLabel: "Technology",
    href: "/divisions",
    keywords: [
      "artificial intelligence",
      "ai",
      "robotics",
      "automation",
      "biotechnology",
      "quantum",
      "technology",
    ],
  },
  {
    id: "GR",
    type: "Divisions",
    title: "Global Risk",
    description:
      "Conflict, cybersecurity, public health, political instability, infrastructure disruption, and systemic risk.",
    label: "Research division",
    secondaryLabel: "Risk and resilience",
    href: "/divisions",
    keywords: [
      "war",
      "conflict",
      "cybersecurity",
      "pandemic",
      "risk",
      "resilience",
      "instability",
    ],
  },
  {
    id: "SS",
    type: "Divisions",
    title: "Space Studies",
    description:
      "Commercial spaceflight, orbital infrastructure, planetary development, exploration economics, and space policy.",
    label: "Research division",
    secondaryLabel: "Space and exploration",
    href: "/divisions",
    keywords: [
      "space",
      "orbit",
      "orbital",
      "moon",
      "lunar",
      "commercial spaceflight",
      "space policy",
    ],
  },
  {
    id: "EI",
    type: "Divisions",
    title: "Economic Intelligence",
    description:
      "Markets, strategic industries, labor transformation, industrial policy, supply chains, and economic power.",
    label: "Research division",
    secondaryLabel: "Economics and markets",
    href: "/divisions",
    keywords: [
      "economics",
      "markets",
      "industry",
      "labor",
      "supply chain",
      "semiconductors",
      "finance",
    ],
  },
  {
    id: "EN",
    type: "Divisions",
    title: "Energy & Infrastructure",
    description:
      "Electrical grids, transportation, water systems, energy security, urban resilience, and climate adaptation.",
    label: "Research division",
    secondaryLabel: "Physical systems",
    href: "/divisions",
    keywords: [
      "energy",
      "infrastructure",
      "electricity",
      "grid",
      "water",
      "transportation",
      "climate",
    ],
  },
  {
    id: "HA",
    type: "Divisions",
    title: "Historical Analysis",
    description:
      "Civilizations, institutions, intelligence operations, political movements, and recurring historical patterns.",
    label: "Research division",
    secondaryLabel: "History and institutions",
    href: "/divisions",
    keywords: [
      "history",
      "civilizations",
      "institutions",
      "collapse",
      "politics",
      "intelligence",
      "power",
    ],
  },
];

const searchResults: SearchResult[] = [
  ...publicationRecords.map(
    (publication): SearchResult => ({
      id: publication.id,
      type: "Publications",
      title: publication.title,
      description: publication.summary,
      label: publication.type,
      secondaryLabel: publication.division,
      href: `/publication/${publication.id}`,
      keywords: [
        publication.subtitle,
        publication.division,
        publication.type,
        ...publication.focus,
        ...publication.questions,
      ],
    }),
  ),
  ...insightRecords.map(
    (insight): SearchResult => ({
      id: insight.id,
      type: "Insights",
      title: insight.title,
      description: insight.summary,
      label: insight.category,
      secondaryLabel: insight.division,
      href: `/insight/${insight.id}`,
      keywords: [
        insight.category,
        insight.division,
        insight.signal,
        ...insight.context,
        ...insight.indicators,
        ...insight.implications.map(
          (implication) =>
            `${implication.title} ${implication.description}`,
        ),
      ],
    }),
  ),
  ...divisionRecords,
];

const searchCategories: SearchCategory[] = [
  "All",
  "Publications",
  "Insights",
  "Divisions",
];

const suggestedSearches = [
  "Artificial intelligence",
  "Space economy",
  "Infrastructure risk",
  "Institutional collapse",
  "Energy security",
  "Industrial policy",
];

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] =
    useState<SearchCategory>("All");

  const filteredResults = useMemo(() => {
    const normalizedQuery = activeQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return searchResults
      .filter((result) => {
        const matchesCategory =
          selectedCategory === "All" ||
          result.type === selectedCategory;

        if (!matchesCategory) {
          return false;
        }

        const searchableText = [
          result.id,
          result.type,
          result.title,
          result.description,
          result.label,
          result.secondaryLabel,
          ...result.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .sort((firstResult, secondResult) => {
        const firstTitleMatch = firstResult.title
          .toLowerCase()
          .includes(normalizedQuery);

        const secondTitleMatch = secondResult.title
          .toLowerCase()
          .includes(normalizedQuery);

        if (firstTitleMatch && !secondTitleMatch) {
          return -1;
        }

        if (!firstTitleMatch && secondTitleMatch) {
          return 1;
        }

        return firstResult.title.localeCompare(secondResult.title);
      });
  }, [activeQuery, selectedCategory]);

  const resultCounts = useMemo(() => {
    return {
      Publications: filteredResults.filter(
        (result) => result.type === "Publications",
      ).length,
      Insights: filteredResults.filter(
        (result) => result.type === "Insights",
      ).length,
      Divisions: filteredResults.filter(
        (result) => result.type === "Divisions",
      ).length,
    };
  }, [filteredResults]);

  const runSearch = (
    query: string,
    category: SearchCategory = selectedCategory,
  ) => {
    const normalizedQuery = query.trim();

    setSearchInput(normalizedQuery);
    setActiveQuery(normalizedQuery);
    setSelectedCategory(category);

    if (normalizedQuery) {
      setSearchParams({ q: normalizedQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
    setActiveQuery("");
    setSelectedCategory("All");
    setSearchParams({});
  };

  return (
    <div className="siteShell searchPage">
      <header className="siteHeader">
        <Link
          className="brand"
          to="/"
          aria-label="Dietz Research Institute"
        >
          <span className="brandMark">
            <span>DR</span>
          </span>

          <span className="brandText">
            <strong>Dietz Research</strong>
            <span>Institute</span>
          </span>
        </Link>

        <nav
          className="mainNavigation"
          aria-label="Main navigation"
        >
          <Link to="/research">Research</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/divisions">Divisions</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/about">About</Link>

          <Link className="activeNav" to="/search">
            Search
          </Link>
          <Link to="/library">Saved</Link>
          <Link to="/studio">Studio</Link>
        </nav>

        <Link className="subscribeButton" to="/subscribe">
          Subscribe
        </Link>
      </header>

      <main>
        <section className="searchHero">
          <div className="searchHeroCopy">
            <p className="eyebrow">
              DRI Intelligence Search
            </p>

            <h1>
              Search the institute&apos;s
              <span> collective intelligence.</span>
            </h1>

            <p>
              Search across research publications, strategic
              reports, emerging insights, and DRI&apos;s six
              institutional divisions.
            </p>
          </div>

          <div className="searchHeroMetrics">
            <div>
              <strong>{publicationRecords.length}</strong>
              <span>Publications indexed</span>
            </div>

            <div>
              <strong>{insightRecords.length}</strong>
              <span>Insights indexed</span>
            </div>

            <div>
              <strong>{divisionRecords.length}</strong>
              <span>Research divisions</span>
            </div>
          </div>
        </section>

        <section className="universalSearchSection">
          <form
            className="universalSearchForm"
            onSubmit={handleSubmit}
          >
            <label htmlFor="universal-search">
              Search DRI intelligence
            </label>

            <div className="universalSearchInputRow">
              <span aria-hidden="true">⌕</span>

              <input
                id="universal-search"
                type="search"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(event.target.value)
                }
                placeholder="Search technology, space, economics, risk, history..."
                autoFocus
              />

              {searchInput && (
                <button
                  className="clearUniversalSearch"
                  type="button"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              )}

              <button
                className="runUniversalSearch"
                type="submit"
              >
                Search
                <span>→</span>
              </button>
            </div>
          </form>

          <div
            className="searchCategoryTabs"
            role="tablist"
            aria-label="Search categories"
          >
            {searchCategories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={
                  selectedCategory === category
                    ? "activeSearchCategory"
                    : ""
                }
                onClick={() => {
                  setSelectedCategory(category);

                  if (searchInput.trim()) {
                    setActiveQuery(searchInput.trim());
                  }
                }}
              >
                <span>{category}</span>

                {activeQuery && category !== "All" && (
                  <strong>
                    {resultCounts[
                      category as keyof typeof resultCounts
                    ] ?? 0}
                  </strong>
                )}

                {activeQuery && category === "All" && (
                  <strong>{filteredResults.length}</strong>
                )}
              </button>
            ))}
          </div>
        </section>

        {!activeQuery ? (
          <section className="searchDiscoverySection">
            <div className="searchDiscoveryHeading">
              <div>
                <p className="eyebrow">Search discovery</p>
                <h2>Begin with a research question.</h2>
              </div>

              <p>
                Search for a topic, system, technology, risk,
                institution, or historical pattern. Results are
                drawn from every major area of the DRI platform.
              </p>
            </div>

            <div className="suggestedSearchGrid">
              {suggestedSearches.map((suggestion, index) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => runSearch(suggestion)}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{suggestion}</p>
                  <strong>→</strong>
                </button>
              ))}
            </div>

            <div className="searchCoverageGrid">
              <article>
                <span>01</span>
                <h3>Publications</h3>
                <p>
                  Major reports, forecasts, risk assessments,
                  research dossiers, and institutional briefs.
                </p>
                <Link to="/research">Open library →</Link>
              </article>

              <article>
                <span>02</span>
                <h3>Insights</h3>
                <p>
                  Concise analysis of emerging developments,
                  early indicators, and structural change.
                </p>
                <Link to="/insights">Open insights →</Link>
              </article>

              <article>
                <span>03</span>
                <h3>Divisions</h3>
                <p>
                  DRI&apos;s six specialized research fields,
                  mandates, methods, and active priorities.
                </p>
                <Link to="/divisions">Open divisions →</Link>
              </article>
            </div>
          </section>
        ) : (
          <section className="searchResultsSection">
            <div className="searchResultsHeading">
              <div>
                <p className="eyebrow">Search results</p>

                <h2>
                  Results for “{activeQuery}”
                </h2>
              </div>

              <p>
                <strong>{filteredResults.length}</strong>{" "}
                matching records
              </p>
            </div>

            {filteredResults.length > 0 ? (
              <div className="universalSearchResults">
                {filteredResults.map((result, index) => (
                  <Link
                    className="universalSearchResult"
                    to={result.href}
                    key={`${result.type}-${result.id}`}
                  >
                    <div className="searchResultNumber">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="searchResultIdentity">
                      <span>{result.id}</span>
                      <p>{result.type}</p>
                    </div>

                    <div className="searchResultContent">
                      <div>
                        <span>{result.label}</span>
                        <span>{result.secondaryLabel}</span>
                      </div>

                      <h3>{result.title}</h3>
                      <p>{result.description}</p>
                    </div>

                    <div className="searchResultArrow">
                      ↗
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="noUniversalSearchResults">
                <span>00</span>
                <h3>No intelligence records found.</h3>

                <p>
                  Try a broader phrase, choose another category,
                  or search one of DRI&apos;s core subjects.
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      runSearch("Artificial intelligence")
                    }
                  >
                    Search artificial intelligence
                  </button>

                  <button
                    type="button"
                    onClick={clearSearch}
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
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
          <Link to="/insights">Insights</Link>
          <Link to="/search">Search</Link>
        </div>

        <p className="copyright">
          © 2026 Dietz Research Institute
        </p>
      </footer>
    </div>
  );
}

export default SearchPage;
