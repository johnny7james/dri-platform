import { Link } from "react-router";
import "../App.css";

const principles = [
  {
    number: "01",
    title: "Evidence before conclusion",
    description:
      "Research begins with a clearly defined question, credible evidence, and a willingness to revise assumptions.",
  },
  {
    number: "02",
    title: "Clarity without simplification",
    description:
      "Complex subjects should be understandable without stripping away uncertainty, context, or competing interpretations.",
  },
  {
    number: "03",
    title: "Long-term perspective",
    description:
      "DRI studies developments beyond immediate headlines to understand the systems and forces operating underneath them.",
  },
  {
    number: "04",
    title: "Intellectual independence",
    description:
      "Analysis should follow the evidence rather than political pressure, institutional convenience, or predetermined narratives.",
  },
];

const institutionalStandards = [
  "Clearly defined research questions",
  "Traceable evidence and source evaluation",
  "Separation of fact, analysis, and forecast",
  "Explicit treatment of uncertainty",
  "Consideration of competing explanations",
  "Corrections when credible new evidence emerges",
];

function AboutPage() {
  return (
    <div className="siteShell aboutPage">
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
          <Link to="/insights">Insights</Link>

          <Link className="activeNav" to="/about">
            About
          </Link>

          <Link to="/search">Search</Link>
          <Link to="/library">Saved</Link>
          <Link to="/studio">Studio</Link>
        </nav>

        <Link className="subscribeButton" to="/subscribe">
          Subscribe
        </Link>
      </header>

      <main>
        <section className="aboutHero">
          <div className="aboutHeroCopy">
            <p className="eyebrow">About the institute</p>

            <h1>
              Research for a world
              <span> that refuses simplicity.</span>
            </h1>

            <p>
              The Dietz Research Institute is the research and analysis
              institution of Dietz Holdings, created to investigate the
              technological, economic, political, historical, and physical
              systems shaping humanity&apos;s future.
            </p>
          </div>

          <div className="aboutHeroIdentity">
            <div className="aboutIdentityMark">
              <span>DRI</span>
              <p>Established 2026</p>
            </div>

            <div className="aboutIdentityDetails">
              <div>
                <span>Institution</span>
                <strong>Dietz Research Institute</strong>
              </div>

              <div>
                <span>Parent organization</span>
                <strong>Dietz Holdings</strong>
              </div>

              <div>
                <span>Research model</span>
                <strong>Independent multidisciplinary analysis</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="aboutMandateSection">
          <div className="aboutMandateIndex">
            <span>01</span>
            <p>Institutional mandate</p>
          </div>

          <div className="aboutMandateContent">
            <p className="eyebrow">Our purpose</p>

            <h2>
              Understand the systems behind events—and the forces likely to
              shape what happens next.
            </h2>

            <div className="aboutMandateColumns">
              <p>
                Modern challenges rarely belong to one field. Artificial
                intelligence affects labor, national power, education, and
                public trust. Energy systems affect industry, security, and
                climate resilience. Historical institutions continue shaping
                contemporary political and economic behavior.
              </p>

              <p>
                DRI exists to connect those systems. Its role is not merely to
                describe events, but to investigate causes, identify emerging
                patterns, evaluate uncertainty, and communicate serious
                research in an accessible form.
              </p>
            </div>
          </div>
        </section>

        <section className="missionVisionSection">
          <article>
            <div className="missionVisionLabel">
              <span>M</span>
              <p>Mission</p>
            </div>

            <h2>
              Produce rigorous and accessible research on the forces shaping
              civilization and humanity&apos;s future.
            </h2>
          </article>

          <article>
            <div className="missionVisionLabel">
              <span>V</span>
              <p>Vision</p>
            </div>

            <h2>
              Build a trusted institution capable of helping people understand
              change before its consequences become unavoidable.
            </h2>
          </article>
        </section>

        <section className="aboutPrinciplesSection">
          <div className="aboutPrinciplesHeading">
            <div>
              <p className="eyebrow">Research principles</p>
              <h2>The standards behind every conclusion.</h2>
            </div>

            <p>
              DRI&apos;s authority must come from the quality of its reasoning,
              not the confidence of its language or the prestige of its name.
            </p>
          </div>

          <div className="aboutPrinciplesGrid">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="institutionalStandardsSection">
          <div className="institutionalStandardsCopy">
            <p className="eyebrow">Institutional standard</p>

            <h2>
              Trust requires a visible research process.
            </h2>

            <p>
              DRI publications are designed to distinguish documented
              information from analytical interpretation and future-oriented
              judgment. Readers should be able to understand not only what DRI
              concludes, but how those conclusions were reached.
            </p>

            <Link to="/research">
              Explore the research library
              <span>→</span>
            </Link>
          </div>

          <div className="institutionalStandardsList">
            {institutionalStandards.map((standard, index) => (
              <div key={standard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{standard}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="founderSection">
          <div className="founderIdentityPanel">
            <div className="founderMonogram">JD</div>

            <div>
              <span>Founder</span>
              <h3>Johnny Dietz</h3>
              <p>Dietz Holdings</p>
            </div>
          </div>

          <div className="founderStatement">
            <p className="eyebrow">Founder&apos;s statement</p>

            <blockquote>
              “The purpose of DRI is not to pretend that complex questions
              have easy answers. It is to build the discipline, tools, and
              institutional memory required to investigate them seriously.”
            </blockquote>

            <p>
              DRI was established as the research foundation of Dietz
              Holdings—an institution capable of supporting the organization&apos;s
              technology, intelligence, historical, economic, scientific, and
              strategic ventures with deeper analysis.
            </p>
          </div>
        </section>

        <section className="instituteArchitectureSection">
          <div className="instituteArchitectureHeading">
            <p className="eyebrow">Institutional architecture</p>
            <h2>One institute. Six connected fields of inquiry.</h2>
          </div>

          <div className="architectureDiagram">
            <div className="architectureCenter">
              <span>DRI</span>
              <p>Integrated research</p>
            </div>

            <Link to="/divisions">Future Systems</Link>
            <Link to="/divisions">Global Risk</Link>
            <Link to="/divisions">Space Studies</Link>
            <Link to="/divisions">Economic Intelligence</Link>
            <Link to="/divisions">Energy &amp; Infrastructure</Link>
            <Link to="/divisions">Historical Analysis</Link>
          </div>
        </section>

        <section className="aboutCallToAction">
          <div>
            <p className="eyebrow">Begin exploring</p>
            <h2>Researching what comes next.</h2>
          </div>

          <div className="aboutCallToActionLinks">
            <Link to="/research">
              Research library
              <span>→</span>
            </Link>

            <Link to="/reports">
              Major reports
              <span>→</span>
            </Link>

            <Link to="/insights">
              Latest insights
              <span>→</span>
            </Link>
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

export default AboutPage;
