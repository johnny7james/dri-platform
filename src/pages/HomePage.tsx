import "../App.css";

type Division = {
  code: string;
  name: string;
  description: string;
};

type ResearchItem = {
  category: string;
  title: string;
  date: string;
  description: string;
};

const divisions: Division[] = [
  {
    code: "FS",
    name: "Future Systems",
    description:
      "Artificial intelligence, robotics, biotechnology, automation, and emerging technologies.",
  },
  {
    code: "GR",
    name: "Global Risk",
    description:
      "Conflict, cyber threats, public health, political instability, and systemic risk.",
  },
  {
    code: "SS",
    name: "Space Studies",
    description:
      "Commercial spaceflight, orbital infrastructure, exploration economics, and policy.",
  },
  {
    code: "EI",
    name: "Economic Intelligence",
    description:
      "Markets, industries, labor, automation, and long-term economic transformation.",
  },
  {
    code: "EN",
    name: "Energy & Infrastructure",
    description:
      "Power systems, transportation, water security, resilience, and future cities.",
  },
  {
    code: "HA",
    name: "Historical Analysis",
    description:
      "Civilizations, institutions, geopolitical movements, and lessons from history.",
  },
];

const researchItems: ResearchItem[] = [
  {
    category: "Artificial Intelligence",
    title: "The Automation Threshold",
    date: "July 2026",
    description:
      "Assessing how rapidly intelligent automation could restructure labor, productivity, and institutional power.",
  },
  {
    category: "Global Risk",
    title: "Fragile Systems",
    date: "June 2026",
    description:
      "An analysis of the interconnected infrastructure failures capable of producing cascading national crises.",
  },
  {
    category: "Space Studies",
    title: "The Orbital Economy",
    date: "May 2026",
    description:
      "Examining the companies, technologies, and policy decisions shaping the next era of orbital development.",
  },
];

function App() {
  return (
    <div className="siteShell">
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Dietz Research Institute">
          <span className="brandMark">
            <span>DR</span>
          </span>

          <span className="brandText">
            <strong>Dietz Research</strong>
            <span>Institute</span>
          </span>
        </a>

        <nav className="mainNavigation" aria-label="Main navigation">
          <a href="/research">Research</a>
          <a href="/reports">Reports</a>
          <a href="/divisions">Divisions</a>
          <a href="/insights">Insights</a>
          <a href="/about">About</a>
          <a href="/search">Search</a>
          <a href="/library">Saved</a>
        </nav>

        <a className="subscribeButton" href="/subscribe">
          Subscribe
        </a>
      </header>

      <main id="top">
        <section className="heroSection">
          <div className="heroGlow heroGlowOne" />
          <div className="heroGlow heroGlowTwo" />

          <div className="heroContent">
            <p className="eyebrow">Independent research institute</p>

            <h1>
              Researching what
              <span> comes next.</span>
            </h1>

            <p className="heroDescription">
              The Dietz Research Institute studies the technological,
              economic, political, environmental, and historical forces
              shaping humanity&apos;s future.
            </p>

            <div className="heroActions">
              <a className="primaryAction" href="/research">
                Explore our research
              </a>

              <a className="secondaryAction" href="/reports">
                View latest report
              </a>
            </div>

            <div className="heroMetrics">
              <div>
                <strong>06</strong>
                <span>Research divisions</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Active studies</span>
              </div>

              <div>
                <strong>2027</strong>
                <span>Forecast horizon</span>
              </div>
            </div>
          </div>

          <aside className="featuredReport" id="reports">
            <div className="reportOrbit">
              <div className="orbitRing orbitRingOne" />
              <div className="orbitRing orbitRingTwo" />
              <div className="orbitCore">DRI</div>
            </div>

            <div className="reportTopLine">
              <span>Featured report</span>
              <span>DRI 001</span>
            </div>

            <div className="reportContent">
              <p className="reportCategory">Annual global forecast</p>
              <h2>The State of the Future</h2>
              <p className="reportYear">2027</p>

              <p className="reportDescription">
                A comprehensive assessment of the risks, technologies, and
                structural changes defining the next decade.
              </p>
            </div>

            <a className="reportLink" href="/publication/DRI-AF-001">
              Read the report
              <span>→</span>
            </a>
          </aside>
        </section>

        <section className="missionStrip">
          <div>
            <span>01</span>
            <p>Independent research</p>
          </div>

          <div>
            <span>02</span>
            <p>Long-term perspective</p>
          </div>

          <div>
            <span>03</span>
            <p>Rigorous analysis</p>
          </div>

          <div>
            <span>04</span>
            <p>Public intelligence</p>
          </div>
        </section>

        <section className="divisionSection" id="divisions">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Research divisions</p>
              <h2>Intelligence across critical systems.</h2>
            </div>

            <p>
              DRI organizes multidisciplinary research around the most
              consequential forces shaping civilization and the future.
            </p>
          </div>

          <div className="divisionGrid">
            {divisions.map((division, index) => (
              <article className="divisionCard" key={division.code}>
                <div className="divisionCardTop">
                  <span className="divisionNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="divisionCode">{division.code}</span>
                </div>

                <h3>{division.name}</h3>
                <p>{division.description}</p>

                <a href="/research">
                  Explore division
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="researchSection" id="research">
          <div className="researchIntroduction">
            <p className="eyebrow">Latest intelligence</p>
            <h2>Research for a changing world.</h2>
            <p>
              DRI publications translate complex developments into structured,
              evidence-driven analysis for leaders, institutions, and the
              public.
            </p>

            <a href="/insights">View all research →</a>
          </div>

          <div className="researchList">
            {researchItems.map((item, index) => (
              <article className="researchItem" key={item.title}>
                <div className="researchIndex">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="researchDetails">
                  <div className="researchMeta">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <a href="/insights" aria-label={`Read ${item.title}`}>
                  ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="statementSection" id="about">
          <div className="statementMark">DRI</div>

          <div className="statementContent">
            <p className="eyebrow">Our mandate</p>

            <blockquote>
              “Clarity requires more than knowing what happened. It requires
              understanding the systems that made it possible—and what those
              systems may produce next.”
            </blockquote>

            <p>
              Dietz Research Institute exists to investigate those systems,
              identify emerging patterns, and make serious research accessible.
            </p>
          </div>
        </section>

        <section className="subscribeSection" id="subscribe">
          <div>
            <p className="eyebrow">DRI intelligence briefing</p>
            <h2>Understand what matters before it becomes obvious.</h2>
          </div>

          <form
            className="subscribeForm"
            action="/subscribe"
            method="get"
          >
            <label className="srOnly" htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />

            <button type="submit">Subscribe</button>
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
          <a href="/research">Research</a>
          <a href="/reports">Reports</a>
          <a href="/divisions">Divisions</a>
          <a href="/about">About</a>
        </div>

        <p className="copyright">© 2026 Dietz Research Institute</p>
      </footer>
    </div>
  );
}

export default App;
