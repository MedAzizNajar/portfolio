import { Link, useParams } from "react-router";
import useApi from "../hooks/useApi.js";
import Etat from "../components/Etat.jsx";

export default function ProjetDetail() {

  // Recuperer le slug depuis l'URL
  const { slug } = useParams();

  // Recuperer le projet depuis le backend
  const {
    data: projet,
    loading,
    error
  } = useApi(`/api/projets/${slug}`);

  // Gestion du chargement et des erreurs
  if (loading || error || !projet) {
    return (
      <section className="section">

        <Link to="/projets" className="text-link">
          ← Retour aux projets
        </Link>

        <Etat loading={loading} error={error} />

      </section>
    );
  }

  const symboles = {
    "assistant-mistral": "AI",
    "servo-moteur": "IoT",
    "jeu-visual-basic": "VB",
    "portfolio-web": "</>"
  };

  return (

    <section className="section">

      {/* Retour vers les projets */}

      <Link
        to="/projets"
        className="button secondary"
      >
        ← Retour aux projets
      </Link>

      {/* Titre du projet */}

      <div
        className="section-heading"
        style={{ marginTop: "35px" }}
      >

        <p className="eyebrow">
          PORTFOLIO / DÉTAIL DU PROJET
        </p>

        <h2>{projet.titre}<span>.</span></h2>

        <p className="date">
          {projet.tags.join(" / ")}
          {projet.annee ? ` · ${projet.annee}` : ""}
        </p>

      </div>

      {/* Illustration du projet */}

      <div className="panel">

        <div className={`project-art art-${projet.slug}`}>

          <span className="art-code">
            {symboles[projet.slug] || "DEV"}
          </span>

          <span className="art-index">
            {projet.tags.join(" / ")}
          </span>

        </div>

        <div className="project-content">

          <h3>Présentation du projet</h3>

          <p className="lead">
            {projet.resume}
          </p>

          <div className="tags">

            {projet.technos.map(techno => (
              <span key={techno}>{techno}</span>
            ))}

          </div>

        </div>

      </div>

      {/* Realisations */}

      <div
        className="panel skill"
        style={{ marginTop: "30px" }}
      >

        <h3>Ce que j'ai réalisé</h3>

        <ul style={{
          paddingLeft: "20px",
          marginTop: "20px",
          lineHeight: "2",
          color: "var(--muted)"
        }}>

          {(projet.realisations || []).map(r => (

            <li key={r}>{r}</li>

          ))}

        </ul>

      </div>

      {/* Resultat */}

      <div
        className="panel skill"
        style={{ marginTop: "30px" }}
      >

        <h3>Résultat du projet</h3>

        <p className="muted">
          {projet.resultat}
        </p>

      </div>

      {/* Lien GitHub */}

      {projet.lien && (

        <div className="actions">

          <a
            href={projet.lien}
            target="_blank"
            rel="noreferrer"
            className="button primary"
          >
            Consulter le code sur GitHub ↗
          </a>

        </div>

      )}

    </section>

  );
}