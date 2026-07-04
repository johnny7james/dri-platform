import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getInsightById, insightRecords } from "../data/insights";
import {
  isResearchSaved,
  toggleSavedResearch,
} from "../lib/savedResearch";
import "../App.css";

function InsightPage() {
  const { insightId } = useParams();
  const insight = getInsightById(insightId);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [insightId]);

  useEffect(() => {
    if (insight) {
      setIsSaved(isResearchSaved("insight", insight.id));
    }
  }, [insight]);

  if (!insight) {
    return (
      <div className="siteShell">
        <header className="siteHeader">
          <Link className="brand" to="/">
            <img
            className="brandLogoImage"
            src="/brand/DRI_Primary_Logo.png"
            alt="Dietz Research Institute"
          />
          </Link>
        </header>

        <main className="publicationNotFound">
          <span>404</span>
          <h1>Insight not found.</h1>
          <p>
            The requested DRI insight does not exist or is no longer available
            at this address.
          </p>
          <Link to="/insights">Return to insights</Link>
        </main>
      </div>
    );
  }

  const relatedInsights = insightRecords
    .filter(
      (item) =>
        item.id !== insight.id &&
        (item.category === insight.category ||
          item.division === insight.division),
    )
    .slice(0, 3);

  return (
    <div className="siteShell insightReaderPage">
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

        <button
          className="subscribeButton publicationPrintButton"
          type="button"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </header>

      <main>
        <section className="insightReaderHero">
          <div className="insightReaderIdentity">
            <div className="insightReaderNumber">
              {insight.id.split("-").at(-1)}
            </div>

            <div className="insightReaderMark">
              <span>DRI</span>
              <p>Insight</p>
            </div>

            <p>{insight.id}</p>
          </div>

          <div className="insightReaderHeroContent">
            <div className="publicationBreadcrumbs">
              <Link to="/insights">Insights</Link>
              <span>/</span>
              <span>{insight.category}</span>
            </div>

            <p className="eyebrow">
              {insight.category} · {insight.division}
            </p>

            <h1>{insight.title}</h1>
            <p className="insightReaderSummary">{insight.summary}</p>

            <div className="readerActionRow">
              <button
                className={
                  isSaved
                    ? "readerSaveButton savedResearchButton"
                    : "readerSaveButton"
                }
                type="button"
                onClick={() => {
                  const nextSavedState = toggleSavedResearch({
                    id: insight.id,
                    kind: "insight",
                    title: insight.title,
                    subtitle: insight.signal,
                    label: `${insight.category} · ${insight.division}`,
                    date: insight.date,
                    href: `/insight/${insight.id}`,
                  });

                  setIsSaved(nextSavedState);
                }}
              >
                {isSaved
                  ? "Saved to library"
                  : "Save to library"}
              </button>

              <Link
                className="readerLibraryLink"
                to="/library"
              >
                Open saved library
                <span>→</span>
              </Link>
            </div>

            <div className="insightReaderMetadata">
              <div>
                <span>Published</span>
                <strong>{insight.date}</strong>
              </div>

              <div>
                <span>Division</span>
                <strong>{insight.division}</strong>
              </div>

              <div>
                <span>Reading time</span>
                <strong>{insight.readTime}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="insightSignalBanner">
          <div>
            <span>Key signal</span>
            <p>{insight.signal}</p>
          </div>
        </section>

        <section className="insightReaderLayout">
          <aside className="insightReaderContents">
            <p>Article contents</p>

            <nav>
              <a href="#assessment">
                <span>01</span>
                Assessment
              </a>

              <a href="#context">
                <span>02</span>
                Context
              </a>

              <a href="#implications">
                <span>03</span>
                Implications
              </a>

              <a href="#indicators">
                <span>04</span>
                Indicators
              </a>

              <a href="#research-note">
                <span>05</span>
                Research note
              </a>
            </nav>

            <button type="button" onClick={() => window.print()}>
              Print or save as PDF
            </button>
          </aside>

          <article className="insightReaderArticle">
            <section id="assessment">
              <p className="publicationSectionNumber">01</p>
              <p className="eyebrow">Assessment</p>

              <h2>A development worth watching before consensus forms.</h2>

              <p className="insightReaderLead">{insight.summary}</p>

              <p>
                DRI assesses this development as an emerging signal rather than
                an isolated event. Its importance comes from the way it
                interacts with larger institutional, technological, economic,
                or historical systems.
              </p>

              <p>
                The outcome is not predetermined. The signal identifies a
                direction of change, while the eventual consequences will
                depend upon adoption, policy, institutional response, and
                competing forces.
              </p>

              <blockquote>{insight.signal}</blockquote>
            </section>

            <section id="context">
              <p className="publicationSectionNumber">02</p>
              <p className="eyebrow">Context</p>

              <h2>The conditions producing the signal.</h2>

              <div className="insightContextList">
                {insight.context.map((paragraph, index) => (
                  <div key={paragraph}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="implications">
              <p className="publicationSectionNumber">03</p>
              <p className="eyebrow">Institutional implications</p>

              <h2>Where the development could matter most.</h2>

              <div className="insightImplicationsGrid">
                {insight.implications.map((implication) => (
                  <article key={implication.title}>
                    <span>{implication.title}</span>
                    <p>{implication.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="indicators">
              <p className="publicationSectionNumber">04</p>
              <p className="eyebrow">Indicators to watch</p>

              <h2>Evidence that would strengthen the assessment.</h2>

              <ol className="insightIndicatorList">
                {insight.indicators.map((indicator, index) => (
                  <li key={indicator}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{indicator}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="research-note">
              <p className="publicationSectionNumber">05</p>
              <p className="eyebrow">Research note</p>

              <h2>Signals are assessments, not certainties.</h2>

              <p>
                DRI Insights are designed to identify developments that may
                become strategically important before sufficient evidence
                exists for a full institutional report.
              </p>

              <p>
                Each assessment should be revised when new evidence emerges.
                Alternative explanations, weak indicators, and contradictory
                developments remain part of the analytical process.
              </p>

              <div className="publicationDisclaimer">
                <span>Prototype notice</span>
                <p>
                  This article is currently part of the DRI digital-platform
                  prototype. Formal editions will include authorship, complete
                  sourcing, citations, revision history, and editorial review.
                </p>
              </div>
            </section>
          </article>
        </section>

        <section className="relatedInsightsSection">
          <div>
            <p className="eyebrow">Continue monitoring</p>
            <h2>Related insights</h2>
          </div>

          {relatedInsights.length > 0 ? (
            <div className="relatedInsightGrid">
              {relatedInsights.map((item) => (
                <Link
                  key={item.id}
                  className="relatedInsightCard"
                  to={`/insight/${item.id}`}
                >
                  <div>
                    <span>{item.id}</span>
                    <span>{item.category}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>

                  <span className="relatedPublicationArrow">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <Link className="returnToResearchLink" to="/insights">
              Return to all DRI insights →
            </Link>
          )}
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

export default InsightPage;
