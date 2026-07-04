import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  clearSavedResearch,
  readSavedResearch,
  removeSavedResearch,
} from "../lib/savedResearch";
import type {
  SavedResearchItem,
  SavedResearchKind,
} from "../lib/savedResearch";
import "../App.css";

type LibraryFilter = "all" | SavedResearchKind;

const libraryFilters: {
  id: LibraryFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All saved research",
  },
  {
    id: "publication",
    label: "Publications",
  },
  {
    id: "insight",
    label: "Insights",
  },
];

function SavedLibraryPage() {
  const [savedItems, setSavedItems] = useState<
    SavedResearchItem[]
  >([]);

  const [activeFilter, setActiveFilter] =
    useState<LibraryFilter>("all");

  const refreshSavedItems = () => {
    setSavedItems(readSavedResearch());
  };

  useEffect(() => {
    refreshSavedItems();

    window.addEventListener(
      "storage",
      refreshSavedItems,
    );

    window.addEventListener(
      "dri-saved-research-updated",
      refreshSavedItems,
    );

    return () => {
      window.removeEventListener(
        "storage",
        refreshSavedItems,
      );

      window.removeEventListener(
        "dri-saved-research-updated",
        refreshSavedItems,
      );
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return savedItems;
    }

    return savedItems.filter(
      (item) => item.kind === activeFilter,
    );
  }, [activeFilter, savedItems]);

  const publicationCount = savedItems.filter(
    (item) => item.kind === "publication",
  ).length;

  const insightCount = savedItems.filter(
    (item) => item.kind === "insight",
  ).length;

  const formatSavedDate = (savedAt?: string) => {
    if (!savedAt) {
      return "Saved recently";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(savedAt));
  };

  return (
    <div className="siteShell savedLibraryPage">
      <header className="siteHeader">
        <Link
          className="brand"
          to="/"
          aria-label="Dietz Research Institute"
        >
          <img
            className="brandLogoImage"
            src="/brand/DRI_Primary_Logo.png"
            alt="Dietz Research Institute"
          />
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
          <Link to="/search">Search</Link>

          <Link className="activeNav" to="/library">
            Saved
          </Link>
          <Link to="/studio">Studio</Link>
        </nav>

        <Link className="subscribeButton" to="/subscribe">
          Subscribe
        </Link>
      </header>

      <main>
        <section className="savedLibraryHero">
          <div className="savedLibraryHeroCopy">
            <p className="eyebrow">
              Personal research library
            </p>

            <h1>
              Save the intelligence
              <span> worth returning to.</span>
            </h1>

            <p>
              Build a private collection of DRI publications,
              strategic reports, and emerging insights for
              continued reading and analysis.
            </p>
          </div>

          <div className="savedLibraryMetrics">
            <div>
              <strong>{savedItems.length}</strong>
              <span>Total saved records</span>
            </div>

            <div>
              <strong>{publicationCount}</strong>
              <span>Publications</span>
            </div>

            <div>
              <strong>{insightCount}</strong>
              <span>Insights</span>
            </div>
          </div>
        </section>

        <section className="savedLibraryWorkspace">
          <div className="savedLibraryHeading">
            <div>
              <p className="eyebrow">
                Saved intelligence
              </p>

              <h2>Your research collection</h2>
            </div>

            <p>
              Saved records remain on this browser until they
              are individually removed or the library is
              cleared.
            </p>
          </div>

          <div className="savedLibraryControls">
            <div
              className="savedLibraryFilters"
              role="tablist"
              aria-label="Saved research filters"
            >
              {libraryFilters.map((filter) => {
                const filterCount =
                  filter.id === "all"
                    ? savedItems.length
                    : filter.id === "publication"
                      ? publicationCount
                      : insightCount;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={
                      activeFilter === filter.id
                    }
                    className={
                      activeFilter === filter.id
                        ? "activeSavedLibraryFilter"
                        : ""
                    }
                    onClick={() =>
                      setActiveFilter(filter.id)
                    }
                  >
                    <span>{filter.label}</span>
                    <strong>{filterCount}</strong>
                  </button>
                );
              })}
            </div>

            {savedItems.length > 0 && (
              <button
                className="clearSavedLibraryButton"
                type="button"
                onClick={() => {
                  clearSavedResearch();
                  setActiveFilter("all");
                }}
              >
                Clear entire library
              </button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div className="savedResearchGrid">
              {filteredItems.map((item, index) => (
                <article
                  className="savedResearchCard"
                  key={`${item.kind}-${item.id}`}
                >
                  <div className="savedResearchCardHeader">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      {item.kind === "publication"
                        ? "Publication"
                        : "Insight"}
                    </span>
                  </div>

                  <div className="savedResearchCardIdentity">
                    <span>{item.id}</span>
                    <p>{item.label}</p>
                  </div>

                  <div className="savedResearchCardContent">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>

                  <div className="savedResearchCardMetadata">
                    <div>
                      <span>Published</span>
                      <strong>{item.date}</strong>
                    </div>

                    <div>
                      <span>Saved</span>
                      <strong>
                        {formatSavedDate(item.savedAt)}
                      </strong>
                    </div>
                  </div>

                  <div className="savedResearchCardActions">
                    <Link to={item.href}>
                      Open research
                      <span>→</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeSavedResearch(
                          item.kind,
                          item.id,
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : savedItems.length > 0 ? (
            <div className="emptySavedLibraryState">
              <span>00</span>
              <h3>
                No saved records match this filter.
              </h3>

              <p>
                Select another category to return to your
                complete saved-research collection.
              </p>

              <button
                type="button"
                onClick={() => setActiveFilter("all")}
              >
                Show all saved research
              </button>
            </div>
          ) : (
            <div className="emptySavedLibraryState">
              <span>00</span>
              <h3>Your research library is empty.</h3>

              <p>
                Open a publication or insight and select
                “Save to library” to begin building your
                personal collection.
              </p>

              <div>
                <Link to="/research">
                  Browse publications
                </Link>

                <Link to="/insights">
                  Browse insights
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="savedLibraryValueSection">
          <div>
            <p className="eyebrow">
              Research continuity
            </p>

            <h2>
              Move from isolated reading to a persistent body
              of knowledge.
            </h2>
          </div>

          <div className="savedLibraryValueGrid">
            <article>
              <span>01</span>
              <h3>Preserve</h3>
              <p>
                Keep consequential reports and insights
                available for continued reference.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Compare</h3>
              <p>
                Collect research from different divisions to
                examine relationships across systems.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Revisit</h3>
              <p>
                Return to earlier assessments as new evidence
                and developments emerge.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Develop</h3>
              <p>
                Use saved intelligence as the foundation for
                deeper questions and future research.
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
          <Link to="/insights">Insights</Link>
          <Link to="/search">Search</Link>
          <Link to="/library">Saved</Link>
        </div>

        <p className="copyright">
          © 2026 Dietz Research Institute
        </p>
      </footer>
    </div>
  );
}

export default SavedLibraryPage;
