import { useState } from "react";
import portfolio from "./data/portfolio.json";
import "./App.css";

const {
  profil = {},
  experiences = [],
  projets = [],
  competences = [],
  formations = [],
  certifications = [],
  langues = []
} = portfolio;

const navigation = [
  ["about", "À propos"],
  ["experiences", "Expériences"],
  ["projets", "Projets"],
  ["competences", "Compétences"],
  ["formations", "Formations"]
];

const categories = [
  "Tous",
  ...new Set(projets.flatMap(p => p.tags || []))
];

function Tags({ items = [] }) {
  return (
    <div className="tags">
      {items.map(item => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function SectionTitle({ number, label, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        {number} / {label}
      </p>
      <h2>{children}<span>.</span></h2>
    </div>
  );
}

function TechVisual() {
  return (
    <div className="tech-visual">
      <div className="visual-label">
        INGÉNIERIE INFORMATIQUE
      </div>

      <svg
        viewBox="0 0 340 300"
        className="circuit"
        fill="none"
      >
        <circle
          cx="170" cy="150" r="118"
          stroke="#c8a779"
          strokeDasharray="2 7"
        />

        <circle
          cx="170" cy="150" r="92"
          stroke="#766345"
        />

        <circle
          cx="170" cy="150" r="72"
          stroke="#c8a779"
        />

        <g stroke="#c8a779" strokeWidth="1.4">
          <path d="M112 110H75V55H40" />
          <path d="M112 150H37" />
          <path d="M112 190H75V245H40" />
          <path d="M228 110H265V55H300" />
          <path d="M228 150H303" />
          <path d="M228 190H265V245H300" />
          <path d="M150 92V36H120" />
          <path d="M190 92V36H220" />
          <path d="M150 208V264H120" />
          <path d="M190 208V264H220" />
        </g>

        <rect
          x="120" y="100"
          width="100" height="100"
          rx="6"
          fill="#27241e"
          stroke="#e1bf8e"
        />

        <text
          x="170"
          y="163"
          textAnchor="middle"
          fill="#f2e4ca"
          fontSize="33"
          fontFamily="Georgia"
        >
          AN
        </text>
      </svg>

      <div className="visual-bottom">
        <span>EMBARQUÉ · RÉSEAUX</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function App() {

  const [category, setCategory] = useState("Tous");

  const filtered = category === "Tous"
    ? projets
    : projets.filter(p =>
        (p.tags || []).includes(category)
      );

  return (
    <div className="portfolio">

      {/* Navigation */}

      <header className="nav-wrap">
        <nav className="navbar shell">

          <a className="logo" href="#accueil">
            AZIZ<span>.dev</span>
          </a>

          <div className="nav-links">
            {navigation.map(([id, title]) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
          </div>

          <a className="nav-contact" href="#contact">
            Contact ↗
          </a>

        </nav>
      </header>

      <main className="shell">

        {/* Accueil */}

        <section className="hero" id="accueil">

          <div className="hero-copy">

            <p className="eyebrow">
              01 / PORTFOLIO / INGÉNIERIE
            </p>

            <h1>
              {profil.nom}<span>.</span>
            </h1>

            <h2>{profil.titre}</h2>

            <p className="lead">
              {profil.accroche}
            </p>

            <div className="actions">

              <a
                className="button primary"
                href="#projets"
              >
                Explorer mes projets ↗
              </a>

              <a
                className="button secondary"
                href={profil.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>

            </div>
          </div>

          <TechVisual />

        </section>

        {/* Statistiques */}

        <div className="stats">

          <div>
            <strong>
              {String(experiences.length).padStart(2, "0")}
            </strong>
            <span>Expériences professionnelles</span>
          </div>

          <div>
            <strong>
              {String(projets.length).padStart(2, "0")}
            </strong>
            <span>Projets présentés</span>
          </div>

          <div>
            <strong>M2</strong>
            <span>Ingénierie informatique</span>
          </div>

        </div>

        {/* À propos */}

        <section id="about" className="section about">

          <SectionTitle number="02" label="PROFIL">
            À propos de moi
          </SectionTitle>

          <p className="lead">
            {profil.description || profil.accroche}
          </p>

          <Tags items={langues} />

        </section>

        {/* Expériences professionnelles */}

        <section id="experiences" className="section">

          <SectionTitle number="03" label="EXPÉRIENCES">
            Mon parcours professionnel
          </SectionTitle>

          <div className="timeline">

            {experiences.map(exp => (

              <article
                className="panel experience"
                key={exp.entreprise}
              >

                <div className="experience-meta">

                  <p className="date">{exp.periode}</p>

                  <h3>{exp.entreprise}</h3>

                  <p className="muted">{exp.lieu}</p>

                </div>

                <div>

                  <h4>{exp.poste}</h4>

                  <ul>
                    {(exp.missions || []).map(mission => (
                      <li key={mission}>{mission}</li>
                    ))}
                  </ul>

                  <Tags items={exp.technos} />

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* Projets */}

        <section id="projets" className="section">

          <SectionTitle number="04" label="RÉALISATIONS">
            Mes projets
          </SectionTitle>

          <div className="filters">

            {categories.map(c => (

              <button
                key={c}
                className={category === c ? "active" : ""}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>

            ))}

          </div>

          <div className="project-grid">

            {filtered.map(p => (

              <article
                className="panel project"
                key={p.slug}
              >

                <div className={`project-art art-${p.slug}`}>

                  <span className="art-code">
                    {{
                      "assistant-mistral": "AI",
                      "servo-moteur": "IoT",
                      "jeu-visual-basic": "VB",
                      "portfolio-web": "</>"
                    }[p.slug] || "DEV"}
                  </span>

                  <span className="art-index">
                    {(p.tags || []).join(" / ")}
                  </span>

                </div>

                <div className="project-content">

                  <p className="date">
                    {(p.tags || []).join(" / ")}
                    {p.annee ? ` · ${p.annee}` : ""}
                  </p>

                  <h3>{p.titre}</h3>

                  <p className="muted">{p.resume}</p>

                  <Tags items={p.technos} />

                  {p.lien && (
                    <a
                      className="text-link"
                      href={p.lien}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir sur GitHub ↗
                    </a>
                  )}

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* Compétences */}

        <section id="competences" className="section">

          <SectionTitle number="05" label="EXPERTISE">
            Mes compétences
          </SectionTitle>

          <div className="skill-grid">

            {competences.map((group, index) => (

              <article
                className="panel skill"
                key={group.groupe}
              >

                <span className="skill-number">
                  0{index + 1} /
                </span>

                <h3>{group.groupe}</h3>

                <Tags
                  items={(group.items || []).map(
                    item => item.nom
                  )}
                />

              </article>

            ))}

          </div>

        </section>

        {/* Formations */}

        <section id="formations" className="section">

          <SectionTitle number="06" label="FORMATION">
            Mon parcours académique
          </SectionTitle>

          <div className="timeline">

            {formations.map(f => (

              <article
                className="panel experience"
                key={f.diplome}
              >

                <div>
                  <p className="date">{f.periode}</p>
                  <p className="muted">{f.lieu}</p>
                </div>

                <div>
                  <h3>{f.diplome}</h3>
                  <p>{f.specialite}</p>
                  <p className="muted">{f.ecole}</p>
                </div>

              </article>

            ))}

          </div>

          <h3 className="subheading">
            Formations complémentaires
          </h3>

          <div className="project-grid">

            {certifications.map(c => (

              <article
                className="panel skill"
                key={c.titre}
              >

                <p className="date">{c.periode}</p>
                <h3>{c.titre}</h3>
                <p className="muted">{c.organisme}</p>

              </article>

            ))}

          </div>

        </section>

        {/* Contact */}

        <section id="contact" className="section">

          <div className="contact panel">

            <p className="eyebrow">07 / CONTACT</p>

            <h2>
              Échangeons sur vos projets<span>.</span>
            </h2>

            <p className="muted">
              Découvrez mes travaux et mes projets
              sur GitHub.
            </p>

            <a
              className="button primary"
              href={profil.github}
              target="_blank"
              rel="noreferrer"
            >
              Mon profil GitHub ↗
            </a>

          </div>

        </section>

      </main>

      {/* Pied de page */}

      <footer className="shell footer">

        <span>
          © {new Date().getFullYear()} {profil.nom}
        </span>

        <span>React · Vite · JSON</span>

        <a href="#accueil">Retour en haut ↑</a>

      </footer>

    </div>
  );
}

export default App;