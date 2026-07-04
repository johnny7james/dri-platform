import { useState } from "react";
import { Link } from "react-router";
import "../App.css";

type Division = {
  code: string;
  number: string;
  name: string;
  shortName: string;
  statement: string;
  description: string;
  mandate: string;
  priorities: string[];
  methods: string[];
  featuredStudy: {
    type: string;
    title: string;
    description: string;
  };
};

const divisions: Division[] = [
  {
    code: "FS",
    number: "01",
    name: "Future Systems",
    shortName: "Technology and emerging systems",
    statement:
      "Understanding the technologies capable of reorganizing society.",
    description:
      "Future Systems examines artificial intelligence, robotics, biotechnology, automation, quantum technologies, and other emerging systems with civilization-scale implications.",
    mandate:
      "Identify technological inflection points before their economic, political, and institutional consequences become obvious.",
    priorities: [
      "Artificial intelligence and advanced automation",
      "Robotics and autonomous systems",
      "Biotechnology and human enhancement",
      "Quantum and frontier computing",
    ],
    methods: [
      "Technology forecasting",
      "Scenario analysis",
      "Institutional impact assessment",
      "Adoption modeling",
    ],
    featuredStudy: {
      type: "Strategic Report",
      title: "The Automation Threshold",
      description:
        "Assessing when intelligent automation begins restructuring labor, productivity, and institutional power.",
    },
  },
  {
    code: "GR",
    number: "02",
    name: "Global Risk",
    shortName: "Threats, instability, and resilience",
    statement:
      "Mapping the failures capable of spreading across connected systems.",
    description:
      "Global Risk studies conflict, cyber threats, public health emergencies, political instability, infrastructure disruption, and the cascading behavior of complex systems.",
    mandate:
      "Detect emerging vulnerabilities, clarify pathways of escalation, and identify practical opportunities for resilience.",
    priorities: [
      "Conflict and geopolitical instability",
      "Cybersecurity and information threats",
      "Public health and biological risk",
      "Cascading infrastructure failure",
    ],
    methods: [
      "Risk modeling",
      "Threat assessment",
      "Systems mapping",
      "Resilience analysis",
    ],
    featuredStudy: {
      type: "Risk Assessment",
      title: "Fragile Systems",
      description:
        "An analysis of interconnected infrastructure failures capable of producing cascading national crises.",
    },
  },
  {
    code: "SS",
    number: "03",
    name: "Space Studies",
    shortName: "Orbital systems and frontier development",
    statement:
      "Studying the economic and strategic architecture beyond Earth.",
    description:
      "Space Studies examines commercial spaceflight, orbital infrastructure, planetary science, exploration economics, space policy, and the strategic competition shaping the extraterrestrial frontier.",
    mandate:
      "Explain how access to space is transforming science, commerce, security, and humanity’s long-term development.",
    priorities: [
      "Commercial launch and orbital markets",
      "Lunar and planetary development",
      "Space policy and governance",
      "Orbital infrastructure and security",
    ],
    methods: [
      "Market analysis",
      "Policy research",
      "Mission architecture review",
      "Strategic forecasting",
    ],
    featuredStudy: {
      type: "Strategic Report",
      title: "The Orbital Economy",
      description:
        "Examining the companies, technologies, and policies defining the next era of orbital development.",
    },
  },
  {
    code: "EI",
    number: "04",
    name: "Economic Intelligence",
    shortName: "Markets, industry, and structural change",
    statement:
      "Interpreting the forces reshaping production, labor, and power.",
    description:
      "Economic Intelligence studies markets, strategic industries, labor transformation, industrial policy, corporate power, supply chains, and long-term economic transitions.",
    mandate:
      "Clarify how technological and geopolitical change alters the distribution of capital, production, opportunity, and influence.",
    priorities: [
      "Strategic industries and supply chains",
      "Labor and productivity transformation",
      "Corporate and institutional power",
      "Geoeconomics and industrial policy",
    ],
    methods: [
      "Market intelligence",
      "Industry mapping",
      "Economic modeling",
      "Comparative policy analysis",
    ],
    featuredStudy: {
      type: "Strategic Report",
      title: "The New Industrial Competition",
      description:
        "How semiconductors, critical minerals, and industrial policy are reshaping global economic power.",
    },
  },
  {
    code: "EN",
    number: "05",
    name: "Energy & Infrastructure",
    shortName: "Power, transportation, and resilient systems",
    statement:
      "Examining the foundations modern civilization cannot function without.",
    description:
      "Energy & Infrastructure researches electrical grids, transportation, water systems, energy security, urban resilience, climate adaptation, and the physical networks supporting modern life.",
    mandate:
      "Assess the durability, efficiency, and strategic importance of the infrastructure systems upon which societies depend.",
    priorities: [
      "Electrical grids and energy security",
      "Transportation and logistics",
      "Water and critical infrastructure",
      "Climate adaptation and resilient cities",
    ],
    methods: [
      "Infrastructure assessment",
      "Failure-path analysis",
      "Capacity modeling",
      "Resilience benchmarking",
    ],
    featuredStudy: {
      type: "Risk Assessment",
      title: "Grid Under Pressure",
      description:
        "Evaluating the vulnerabilities facing electrical grids as demand, electrification, and extreme weather accelerate.",
    },
  },
  {
    code: "HA",
    number: "06",
    name: "Historical Analysis",
    shortName: "Institutions, civilizations, and durable patterns",
    statement:
      "Using history to understand the systems operating beneath events.",
    description:
      "Historical Analysis investigates civilizations, institutions, intelligence operations, political movements, elite networks, social transformations, and recurring patterns of institutional rise and decline.",
    mandate:
      "Apply rigorous historical inquiry to contemporary questions without reducing the past to simplistic analogies.",
    priorities: [
      "Institutional rise and decline",
      "Political and intelligence history",
      "Civilizational transformation",
      "Networks of influence and power",
    ],
    methods: [
      "Archival research",
      "Comparative history",
      "Institutional analysis",
      "Primary-source evaluation",
    ],
    featuredStudy: {
      type: "Research Dossier",
      title: "The Architecture of Collapse",
      description:
        "Comparing historical societies weakened by institutional rigidity, resource pressure, and declining legitimacy.",
    },
  },
];

function DivisionsPage() {
  const [selectedDivisionCode, setSelectedDivisionCode] = useState("FS");

  const selectedDivision =
    divisions.find((division) => division.code === selectedDivisionCode) ??
    divisions[0];

  return (
    <div className="siteShell divisionsPage">
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
          <Link className="activeNav" to="/divisions">
            Divisions
          </Link>
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
        <section className="divisionsHero">
          <div className="divisionsHeroCopy">
            <p className="eyebrow">Research architecture</p>

            <h1>
              Six divisions.
              <span> One mandate.</span>
            </h1>

            <p>
              DRI brings specialized fields into one analytical institution,
              allowing technological, economic, historical, political, and
              physical systems to be studied together.
            </p>
          </div>

          <div className="divisionsHeroMetrics">
            <div>
              <strong>06</strong>
              <span>Research divisions</span>
            </div>

            <div>
              <strong>24</strong>
              <span>Research priorities</span>
            </div>

            <div>
              <strong>01</strong>
              <span>Integrated institute</span>
            </div>
          </div>
        </section>

        <section className="divisionDirectorySection">
          <div className="divisionDirectoryHeading">
            <div>
              <p className="eyebrow">Institutional directory</p>
              <h2>Select a research division.</h2>
            </div>

            <p>
              Each division maintains a specialized mandate while contributing
              to multidisciplinary research across the institute.
            </p>
          </div>

          <div className="divisionSelector" role="tablist">
            {divisions.map((division) => (
              <button
                key={division.code}
                type="button"
                role="tab"
                aria-selected={selectedDivisionCode === division.code}
                className={
                  selectedDivisionCode === division.code
                    ? "divisionSelectorButton activeDivisionSelector"
                    : "divisionSelectorButton"
                }
                onClick={() => setSelectedDivisionCode(division.code)}
              >
                <span>{division.number}</span>

                <div>
                  <strong>{division.code}</strong>
                  <p>{division.name}</p>
                </div>
              </button>
            ))}
          </div>

          <article
            className="selectedDivisionPanel"
            key={selectedDivision.code}
          >
            <div className="selectedDivisionIdentity">
              <div className="selectedDivisionCode">
                <span>{selectedDivision.code}</span>
              </div>

              <div className="selectedDivisionNumber">
                {selectedDivision.number}
              </div>
            </div>

            <div className="selectedDivisionMain">
              <p className="eyebrow">{selectedDivision.shortName}</p>

              <h2>{selectedDivision.name}</h2>

              <blockquote>{selectedDivision.statement}</blockquote>

              <p className="selectedDivisionDescription">
                {selectedDivision.description}
              </p>

              <div className="selectedDivisionMandate">
                <span>Division mandate</span>
                <p>{selectedDivision.mandate}</p>
              </div>
            </div>

            <div className="selectedDivisionData">
              <section>
                <p className="divisionDataLabel">Research priorities</p>

                <ol>
                  {selectedDivision.priorities.map((priority, index) => (
                    <li key={priority}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{priority}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <p className="divisionDataLabel">Core methods</p>

                <div className="divisionMethodTags">
                  {selectedDivision.methods.map((method) => (
                    <span key={method}>{method}</span>
                  ))}
                </div>
              </section>

              <section className="divisionFeaturedStudy">
                <div>
                  <span>Featured study</span>
                  <span>{selectedDivision.featuredStudy.type}</span>
                </div>

                <h3>{selectedDivision.featuredStudy.title}</h3>
                <p>{selectedDivision.featuredStudy.description}</p>

                <Link to="/research">
                  View research
                  <span>→</span>
                </Link>
              </section>
            </div>
          </article>
        </section>

        <section className="crossDivisionSection">
          <div className="crossDivisionHeading">
            <p className="eyebrow">Integrated research model</p>

            <h2>
              The world does not organize itself into academic departments.
            </h2>

            <p>
              DRI divisions are designed to collaborate because major events
              rarely belong to a single field. Artificial intelligence affects
              labor markets. Energy systems affect national security. History
              shapes institutions. Space development reshapes economics and
              policy.
            </p>
          </div>

          <div className="crossDivisionMatrix">
            <div className="matrixCenter">
              <span>DRI</span>
              <p>Integrated analysis</p>
            </div>

            {divisions.map((division) => (
              <div className="matrixDivision" key={division.code}>
                <strong>{division.code}</strong>
                <span>{division.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="divisionPrinciplesSection">
          <div className="divisionPrinciplesHeading">
            <p className="eyebrow">Operating principles</p>
            <h2>Specialization without isolation.</h2>
          </div>

          <div className="divisionPrinciplesGrid">
            <article>
              <span>01</span>
              <h3>Specialized expertise</h3>
              <p>
                Each division develops domain-specific knowledge, methods, and
                institutional memory.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Shared standards</h3>
              <p>
                Every division follows the same expectations for evidence,
                transparency, uncertainty, and analytical rigor.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Cross-system analysis</h3>
              <p>
                Research teams collaborate when a question crosses
                technological, economic, historical, or political boundaries.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Public accessibility</h3>
              <p>
                Complex research is translated into clear intelligence without
                removing the nuance required for serious understanding.
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

export default DivisionsPage;
