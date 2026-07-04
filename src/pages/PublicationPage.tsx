import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getPublicationById,
  publicationRecords,
} from "../data/publications";
import {
  isResearchSaved,
  toggleSavedResearch,
} from "../lib/savedResearch";
import "../App.css";

function PublicationPage() {
  const { publicationId } = useParams();
  const publication = getPublicationById(publicationId);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [publicationId]);

  useEffect(() => {
    if (publication) {
      setIsSaved(
        isResearchSaved("publication", publication.id),
      );
    }
  }, [publication]);

  if (!publication) {
    return (
      <div className="siteShell publicationNotFoundPage">
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
          <h1>Publication not found.</h1>
          <p>
            The requested research publication does not exist or is no longer
            available at this address.
          </p>
          <Link to="/research">Return to research library</Link>
        </main>
      </div>
    );
  }

  const relatedPublications = publicationRecords
    .filter(
      (item) =>
        item.id !== publication.id &&
        item.division === publication.division,
    )
    .slice(0, 3);

  return (
    <div className="siteShell publicationPage">
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
          <Link to="/insights">Insights</Link>
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
        <section className="publicationHero">
          <div className="publicationHeroIdentity">
            <div className="publicationDocumentMark">
              <span>DRI</span>
              <p>{publication.type}</p>
            </div>

            <p>{publication.id}</p>
          </div>

          <div className="publicationHeroContent">
            <div className="publicationBreadcrumbs">
              <Link to="/research">Research</Link>
              <span>/</span>
              <span>{publication.division}</span>
            </div>

            <p className="eyebrow">{publication.type}</p>
            <h1>{publication.title}</h1>
            <h2>{publication.subtitle}</h2>
            <p className="publicationHeroSummary">{publication.summary}</p>

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
                    id: publication.id,
                    kind: "publication",
                    title: publication.title,
                    subtitle: publication.subtitle,
                    label: `${publication.type} · ${publication.division}`,
                    date: publication.date,
                    href: `/publication/${publication.id}`,
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

            <div className="publicationMetadata">
              <div>
                <span>Published</span>
                <strong>{publication.date}</strong>
              </div>

              <div>
                <span>Division</span>
                <strong>{publication.division}</strong>
              </div>

              <div>
                <span>Reading time</span>
                <strong>{publication.readTime}</strong>
              </div>

              <div>
                <span>Length</span>
                <strong>{publication.pages} pages</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="publicationReadingLayout">
          <aside className="publicationContents">
            <p>Contents</p>

            <nav>
              <a href="#executive-summary">
                <span>01</span>
                Executive summary
              </a>

              <a href="#key-findings">
                <span>02</span>
                Key findings
              </a>

              <a href="#analytical-frame">
                <span>03</span>
                Analytical frame
              </a>

              <a href="#implications">
                <span>04</span>
                Implications
              </a>

              <a href="#methodology">
                <span>05</span>
                Methodology
              </a>
            </nav>

            <button type="button" onClick={() => window.print()}>
              Print or save as PDF
            </button>
          </aside>

          <article className="publicationArticle">
            <section id="executive-summary">
              <p className="publicationSectionNumber">01</p>
              <p className="eyebrow">Executive summary</p>

              <h2>
                Understanding the forces beneath the visible development.
              </h2>

              <p className="publicationLead">{publication.summary}</p>

              <p>
                This publication examines the subject as a connected system
                rather than an isolated trend. The central objective is to
                identify how technological capability, institutional behavior,
                economic incentives, historical context, and public policy
                interact over time.
              </p>

              <p>
                DRI&apos;s analysis distinguishes documented developments from
                interpretation and forward-looking judgment. Forecasts are
                presented as structured assessments rather than statements of
                certainty.
              </p>

              <blockquote>
                The most consequential changes are often visible before their
                importance is widely understood.
              </blockquote>
            </section>

            <section id="key-findings">
              <p className="publicationSectionNumber">02</p>
              <p className="eyebrow">Key findings</p>
              <h2>Three findings define the current assessment.</h2>

              <div className="publicationFindings">
                {publication.focus.map((finding, index) => (
                  <article key={finding}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{finding}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="analytical-frame">
              <p className="publicationSectionNumber">03</p>
              <p className="eyebrow">Analytical frame</p>

              <h2>The questions guiding the investigation.</h2>

              <p>
                Strong research depends upon asking questions that can expose
                assumptions, boundaries, dependencies, and competing
                explanations. This report is organized around the following
                analytical questions:
              </p>

              <ol className="publicationQuestions">
                {publication.questions.map((question, index) => (
                  <li key={question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{question}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="implications">
              <p className="publicationSectionNumber">04</p>
              <p className="eyebrow">Implications</p>

              <h2>What leaders and institutions should examine next.</h2>

              <p>
                The findings suggest that institutional response should focus
                less on predicting one exact outcome and more on developing the
                capacity to operate across multiple plausible conditions.
                Durable strategy requires flexible planning, measurable
                triggers, and clearly assigned responsibility.
              </p>

              <div className="publicationImplicationGrid">
                <article>
                  <span>Institutions</span>
                  <p>
                    Identify where existing structures assume conditions that
                    are rapidly changing.
                  </p>
                </article>

                <article>
                  <span>Leadership</span>
                  <p>
                    Define the indicators that would require a change in
                    strategy, investment, or operational design.
                  </p>
                </article>

                <article>
                  <span>Public policy</span>
                  <p>
                    Distinguish immediate intervention needs from long-term
                    capacity-building requirements.
                  </p>
                </article>

                <article>
                  <span>Research</span>
                  <p>
                    Continue testing the assessment against new evidence,
                    competing explanations, and real-world outcomes.
                  </p>
                </article>
              </div>
            </section>

            <section id="methodology">
              <p className="publicationSectionNumber">05</p>
              <p className="eyebrow">Methodology</p>

              <h2>Structured inquiry and transparent reasoning.</h2>

              <p>
                This publication follows DRI&apos;s four-stage research model:
                define the question, investigate the available evidence,
                analyze relationships and uncertainty, and communicate the
                findings in an accessible form.
              </p>

              <div className="publicationMethodology">
                <div>
                  <span>01</span>
                  <strong>Define</strong>
                  <p>Establish scope, assumptions, and analytical boundaries.</p>
                </div>

                <div>
                  <span>02</span>
                  <strong>Investigate</strong>
                  <p>
                    Gather evidence, context, data, and competing
                    interpretations.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <strong>Analyze</strong>
                  <p>
                    Test relationships, claims, uncertainty, and alternative
                    explanations.
                  </p>
                </div>

                <div>
                  <span>04</span>
                  <strong>Communicate</strong>
                  <p>
                    Present findings clearly without removing necessary nuance.
                  </p>
                </div>
              </div>

              <div className="publicationDisclaimer">
                <span>Research note</span>
                <p>
                  This digital publication is currently a platform prototype.
                  Formal editions will include complete citations, source
                  notes, authorship, revision history, and downloadable report
                  files.
                </p>
              </div>
            </section>
          </article>
        </section>

        <section className="relatedPublicationsSection">
          <div>
            <p className="eyebrow">Continue researching</p>
            <h2>Related publications</h2>
          </div>

          {relatedPublications.length > 0 ? (
            <div className="relatedPublicationGrid">
              {relatedPublications.map((item) => (
                <Link
                  key={item.id}
                  to={`/publication/${item.id}`}
                  className="relatedPublicationCard"
                >
                  <div>
                    <span>{item.id}</span>
                    <span>{item.type}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <span className="relatedPublicationArrow">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <Link className="returnToResearchLink" to="/research">
              Return to the complete research library →
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
          <Link to="/about">About</Link>
        </div>

        <p className="copyright">© 2026 Dietz Research Institute</p>
      </footer>
    </div>
  );
}

export default PublicationPage;
