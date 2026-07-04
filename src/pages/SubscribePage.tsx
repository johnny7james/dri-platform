import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import "../App.css";

type BriefingFrequency = "weekly" | "monthly" | "major-reports";

type SubscriptionRecord = {
  firstName: string;
  email: string;
  organization: string;
  topics: string[];
  frequency: BriefingFrequency;
  subscribedAt: string;
};

const researchTopics = [
  {
    id: "future-systems",
    code: "FS",
    name: "Future Systems",
    description:
      "Artificial intelligence, robotics, biotechnology, and emerging technologies.",
  },
  {
    id: "global-risk",
    code: "GR",
    name: "Global Risk",
    description:
      "Conflict, cyber threats, public health, instability, and systemic risk.",
  },
  {
    id: "space-studies",
    code: "SS",
    name: "Space Studies",
    description:
      "Commercial space, orbital infrastructure, exploration, and policy.",
  },
  {
    id: "economic-intelligence",
    code: "EI",
    name: "Economic Intelligence",
    description:
      "Markets, industrial policy, labor, production, and economic power.",
  },
  {
    id: "energy-infrastructure",
    code: "EN",
    name: "Energy & Infrastructure",
    description:
      "Power systems, transportation, water, resilience, and future cities.",
  },
  {
    id: "historical-analysis",
    code: "HA",
    name: "Historical Analysis",
    description:
      "Institutions, civilizations, political movements, and durable patterns.",
  },
];

const frequencyOptions: {
  id: BriefingFrequency;
  title: string;
  description: string;
}[] = [
  {
    id: "weekly",
    title: "Weekly Intelligence Briefing",
    description:
      "A concise weekly assessment of the developments DRI considers most consequential.",
  },
  {
    id: "monthly",
    title: "Monthly Research Review",
    description:
      "A broader monthly review of major research, reports, and institutional signals.",
  },
  {
    id: "major-reports",
    title: "Major Reports Only",
    description:
      "Receive notifications only when DRI publishes a major report or annual forecast.",
  },
];

function SubscribePage() {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState(emailFromQuery);
  const [organization, setOrganization] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "future-systems",
    "global-risk",
  ]);
  const [frequency, setFrequency] =
    useState<BriefingFrequency>("weekly");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "error" | "success"
  >("idle");

  useEffect(() => {
    const storedSubscription = window.localStorage.getItem(
      "dri-subscription",
    );

    if (!storedSubscription) {
      if (emailFromQuery) {
        setEmail(emailFromQuery);
      }

      return;
    }

    try {
      const parsedSubscription = JSON.parse(
        storedSubscription,
      ) as SubscriptionRecord;

      setFirstName(parsedSubscription.firstName ?? "");
      setOrganization(parsedSubscription.organization ?? "");
      setSelectedTopics(parsedSubscription.topics ?? []);
      setFrequency(parsedSubscription.frequency ?? "weekly");

      if (!emailFromQuery) {
        setEmail(parsedSubscription.email ?? "");
      }
    } catch {
      window.localStorage.removeItem("dri-subscription");
    }
  }, [emailFromQuery]);

  const selectedTopicNames = useMemo(() => {
    return researchTopics
      .filter((topic) => selectedTopics.includes(topic.id))
      .map((topic) => topic.name);
  }, [selectedTopics]);

  const selectedFrequency = frequencyOptions.find(
    (option) => option.id === frequency,
  );

  const toggleTopic = (topicId: string) => {
    setStatus("idle");

    setSelectedTopics((currentTopics) => {
      if (currentTopics.includes(topicId)) {
        return currentTopics.filter(
          (currentTopic) => currentTopic !== topicId,
        );
      }

      return [...currentTopics, topicId];
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (
      !emailIsValid ||
      selectedTopics.length === 0 ||
      !acceptedPolicy
    ) {
      setStatus("error");
      return;
    }

    const subscription: SubscriptionRecord = {
      firstName: firstName.trim(),
      email: normalizedEmail,
      organization: organization.trim(),
      topics: selectedTopics,
      frequency,
      subscribedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      "dri-subscription",
      JSON.stringify(subscription),
    );

    setStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeSubscription = () => {
    window.localStorage.removeItem("dri-subscription");

    setFirstName("");
    setEmail("");
    setOrganization("");
    setSelectedTopics(["future-systems", "global-risk"]);
    setFrequency("weekly");
    setAcceptedPolicy(false);
    setStatus("idle");
  };

  return (
    <div className="siteShell subscribePage">
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

          <Link to="/search">Search</Link>
          <Link to="/library">Saved</Link>
          <Link to="/studio">Studio</Link>
        </nav>

        <Link
          className="subscribeButton activeSubscribeButton"
          to="/subscribe"
        >
          Subscribe
        </Link>
      </header>

      <main>
        <section className="subscribePageHero">
          <div className="subscribePageHeroCopy">
            <p className="eyebrow">
              DRI Intelligence Briefing
            </p>

            <h1>
              Understand what matters
              <span> before it becomes obvious.</span>
            </h1>

            <p>
              Receive selected DRI research, institutional
              analysis, emerging signals, and major reports
              based on the fields most relevant to you.
            </p>
          </div>

          <div className="subscribeHeroPanel">
            <div className="subscribeHeroMark">
              <span>DRI</span>
              <p>Intelligence Briefing</p>
            </div>

            <div className="subscribeHeroDetails">
              <div>
                <span>Coverage</span>
                <strong>Six research divisions</strong>
              </div>

              <div>
                <span>Formats</span>
                <strong>Briefings, insights, and reports</strong>
              </div>

              <div>
                <span>Frequency</span>
                <strong>Selected by the subscriber</strong>
              </div>
            </div>
          </div>
        </section>

        {status === "success" ? (
          <section className="subscriptionSuccessSection">
            <div className="subscriptionSuccessMark">
              <span>✓</span>
            </div>

            <div className="subscriptionSuccessContent">
              <p className="eyebrow">
                Subscription preferences saved
              </p>

              <h2>
                You&apos;re registered for the DRI briefing.
              </h2>

              <p>
                Your current prototype preferences have been
                saved locally on this device. A production
                version will send these preferences to DRI&apos;s
                subscriber database and email-delivery system.
              </p>

              <div className="subscriptionConfirmationGrid">
                <div>
                  <span>Email</span>
                  <strong>{email}</strong>
                </div>

                <div>
                  <span>Briefing frequency</span>
                  <strong>
                    {selectedFrequency?.title}
                  </strong>
                </div>

                <div>
                  <span>Research interests</span>
                  <strong>
                    {selectedTopicNames.join(", ")}
                  </strong>
                </div>
              </div>

              <div className="subscriptionSuccessActions">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                >
                  Update preferences
                </button>

                <Link to="/insights">
                  Read latest insights
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="subscriptionWorkspace">
            <form
              className="subscriptionFormPanel"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="subscriptionFormHeading">
                <p className="eyebrow">
                  Subscriber information
                </p>

                <h2>Build your intelligence briefing.</h2>

                <p>
                  Select the research areas and publication
                  cadence most useful to you.
                </p>
              </div>

              <div className="subscriptionFieldGrid">
                <label className="subscriptionField">
                  <span>First name</span>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder="Optional"
                    autoComplete="given-name"
                  />
                </label>

                <label className="subscriptionField">
                  <span>Email address *</span>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="subscriptionField fullSubscriptionField">
                  <span>Organization or affiliation</span>

                  <input
                    type="text"
                    value={organization}
                    onChange={(event) => {
                      setOrganization(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder="Optional"
                    autoComplete="organization"
                  />
                </label>
              </div>

              <fieldset className="subscriptionTopicSection">
                <legend>Research interests *</legend>

                <p>
                  Select at least one division. You can update
                  these preferences at any time.
                </p>

                <div className="subscriptionTopicGrid">
                  {researchTopics.map((topic) => {
                    const isSelected =
                      selectedTopics.includes(topic.id);

                    return (
                      <label
                        className={
                          isSelected
                            ? "subscriptionTopicCard activeSubscriptionTopic"
                            : "subscriptionTopicCard"
                        }
                        key={topic.id}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleTopic(topic.id)
                          }
                        />

                        <div className="subscriptionTopicHeader">
                          <span>{topic.code}</span>

                          <span aria-hidden="true">
                            {isSelected ? "✓" : "+"}
                          </span>
                        </div>

                        <h3>{topic.name}</h3>
                        <p>{topic.description}</p>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="subscriptionFrequencySection">
                <legend>Briefing frequency *</legend>

                <div className="subscriptionFrequencyGrid">
                  {frequencyOptions.map((option) => (
                    <label
                      className={
                        frequency === option.id
                          ? "subscriptionFrequencyCard activeSubscriptionFrequency"
                          : "subscriptionFrequencyCard"
                      }
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={option.id}
                        checked={frequency === option.id}
                        onChange={() => {
                          setFrequency(option.id);
                          setStatus("idle");
                        }}
                      />

                      <span className="frequencySelectionMark" />

                      <div>
                        <h3>{option.title}</h3>
                        <p>{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="subscriptionConsent">
                <input
                  type="checkbox"
                  checked={acceptedPolicy}
                  onChange={(event) => {
                    setAcceptedPolicy(event.target.checked);
                    setStatus("idle");
                  }}
                />

                <span>
                  I agree to receive DRI research communications
                  and understand that I can update or remove my
                  preferences at any time. *
                </span>
              </label>

              {status === "error" && (
                <div
                  className="subscriptionErrorMessage"
                  role="alert"
                >
                  Enter a valid email address, select at least one
                  research division, and accept the communication
                  policy.
                </div>
              )}

              <div className="subscriptionSubmitRow">
                <button type="submit">
                  Save subscription
                  <span>→</span>
                </button>

                <p>
                  Prototype data is stored only in this
                  browser.
                </p>
              </div>
            </form>

            <aside className="subscriptionSummaryPanel">
              <div className="subscriptionSummaryHeader">
                <span>Your briefing</span>
                <span>DRI-SUB-001</span>
              </div>

              <div className="subscriptionSummaryIdentity">
                <span>DRI</span>
                <p>Subscriber profile</p>
              </div>

              <div className="subscriptionSummaryDetails">
                <section>
                  <span>Research coverage</span>

                  {selectedTopicNames.length > 0 ? (
                    <ul>
                      {selectedTopicNames.map((topicName) => (
                        <li key={topicName}>
                          {topicName}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No divisions selected.</p>
                  )}
                </section>

                <section>
                  <span>Delivery cadence</span>
                  <strong>
                    {selectedFrequency?.title}
                  </strong>
                </section>

                <section>
                  <span>Subscriber</span>
                  <strong>
                    {email || "Email not entered"}
                  </strong>
                </section>
              </div>

              <div className="subscriptionPrototypeNotice">
                <span>Development notice</span>

                <p>
                  This page currently demonstrates the complete
                  subscription experience without transmitting
                  personal information to an external server.
                </p>
              </div>

              {window.localStorage.getItem(
                "dri-subscription",
              ) && (
                <button
                  className="removeLocalSubscription"
                  type="button"
                  onClick={removeSubscription}
                >
                  Remove locally saved preferences
                </button>
              )}
            </aside>
          </section>
        )}

        <section className="subscriptionValueSection">
          <div className="subscriptionValueHeading">
            <p className="eyebrow">
              What subscribers receive
            </p>

            <h2>
              Institutional intelligence without unnecessary
              noise.
            </h2>
          </div>

          <div className="subscriptionValueGrid">
            <article>
              <span>01</span>
              <h3>Emerging signals</h3>
              <p>
                Early analysis of developments that may become
                strategically important.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Major publications</h3>
              <p>
                Notification when DRI releases strategic reports,
                dossiers, and annual forecasts.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Cross-system context</h3>
              <p>
                Connections between technology, economics,
                infrastructure, history, and global risk.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Transparent analysis</h3>
              <p>
                Clear distinctions between evidence,
                interpretation, uncertainty, and forecast.
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

        <p className="copyright">
          © 2026 Dietz Research Institute
        </p>
      </footer>
    </div>
  );
}

export default SubscribePage;
