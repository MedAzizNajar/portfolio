import { Link } from "react-router";
import useApi from "../hooks/useApi.js";
import Etat from "../components/Etat.jsx";

export default function Accueil({ profil }) {

  const {
    data: parcours,
    loading,
    error
  } = useApi("/api/parcours");

  const {
    data: projets,
    loading: loadingProjets,
    error: errorProjets
  } = useApi("/api/projets");

  if (loading || loadingProjets || error || errorProjets) {
    return (
      <Etat
        loading={loading || loadingProjets}
        error={error || errorProjets}
      />
    );
  }

  const {
    experiences = [],
    formations = [],
    certifications = []
  } = parcours || {};

  return (
    <>

      {/* Section accueil */}

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

            <Link
              to="/projets"
              className="button primary"
            >
              Explorer mes projets ↗
            </Link>

            <a
              href={profil.github}
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              GitHub ↗
            </a>

          </div>

        </div>

        {/* Illustration technologique */}

        <div className="tech-visual">

          <p className="visual-label">
            INGÉNIERIE INFORMATIQUE
          </p>

          <svg
            viewBox="0 0 340 300"
            className="circuit"
            fill="none"
          >

            <circle
              cx="170"
              cy="150"
              r="118"
              stroke="#c8a779"
              strokeDasharray="2 7"
            />

            <circle
              cx="170"
              cy="150"
              r="92"
              stroke="#766345"
            />

            <circle
              cx="170"
              cy="150"
              r="72"
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
              x="120"
              y="100"
              width="100"
              height="100"
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
            {String(projets?.length || 0).padStart(2, "0")}
          </strong>
          <span>Projets présentés</span>
        </div>

        <div>
          <strong>M2</strong>
          <span>Ingénierie informatique</span>
        </div>

      </div>

      {/* À propos */}

      <section className="section about" id="about">

        <div className="section-heading">

          <p className="eyebrow">02 / PROFIL</p>

          <h2>À propos de moi<span>.</span></h2>

        </div>

        <p className="lead">
          {profil.description}
        </p>

        <div className="tags">

          {(profil.langues || []).map(langue => (
            <span key={langue}>{langue}</span>
          ))}

        </div>

      </section>

      {/* Expériences professionnelles */}

      <section className="section" id="experiences">

        <div className="section-heading">

          <p className="eyebrow">03 / EXPÉRIENCES</p>

          <h2>
            Mon parcours professionnel<span>.</span>
          </h2>

        </div>

        <div className="timeline">

          {experiences.map(exp => (

            <article
              className="panel experience"
              key={exp.entreprise}
            >

              <div className="experience-meta">

                <p className="date">
                  {exp.periode}
                </p>

                <h3>{exp.entreprise}</h3>

                <p className="muted">
                  {exp.lieu}
                </p>

              </div>

              <div>

                <h4>{exp.poste}</h4>

                <ul>

                  {(exp.missions || []).map(mission => (
                    <li key={mission}>
                      {mission}
                    </li>
                  ))}

                </ul>

                <div className="tags">

                  {(exp.technos || []).map(techno => (
                    <span key={techno}>
                      {techno}
                    </span>
                  ))}

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* Formations */}

      <section className="section" id="formations">

        <div className="section-heading">

          <p className="eyebrow">04 / FORMATION</p>

          <h2>
            Mon parcours académique<span>.</span>
          </h2>

        </div>

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

              <p className="muted">
                {c.organisme}
              </p>

            </article>

          ))}

        </div>

      </section>

      {/* Contact */}

      <section className="section" id="contact">

        <div className="contact panel">

          <p className="eyebrow">05 / CONTACT</p>

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

    </>
  );
}