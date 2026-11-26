import { useState } from "react";
import { Link } from "react-router";
import useApi from "../hooks/useApi.js";
import Etat from "../components/Etat.jsx";

// Composant de filtrage
function FiltreTags({ tags, actif, onChange }) {

  return (
    <div className="filters">

      {["Tous", ...tags].map(tag => (

        <button
          key={tag}
          className={actif === tag ? "active" : ""}
          onClick={() => onChange(tag)}
          aria-pressed={actif === tag}
        >
          {tag}
        </button>

      ))}

    </div>
  );
}

// Composant pour afficher une carte de projet
function ProjetCard({ projet }) {

  const symboles = {
    "assistant-mistral": "AI",
    "servo-moteur": "IoT",
    "jeu-visual-basic": "VB",
    "portfolio-web": "</>"
  };

  return (

    <article className="panel project">

      <div className={`project-art art-${projet.slug}`}>

        <span className="art-code">
          {symboles[projet.slug] || "DEV"}
        </span>

        <span className="art-index">
          {projet.tags.join(" / ")}
        </span>

      </div>

      <div className="project-content">

        <p className="date">
          {projet.tags.join(" / ")}
          {projet.annee ? ` · ${projet.annee}` : ""}
        </p>

        <h3>
          <Link to={`/projets/${projet.slug}`}>
            {projet.titre}
          </Link>
        </h3>

        <p className="muted">
          {projet.resume}
        </p>

        <div className="tags">

          {projet.technos.map(techno => (

            <span key={techno}>
              {techno}
            </span>

          ))}

        </div>

        <Link
          to={`/projets/${projet.slug}`}
          className="text-link"
        >
          Découvrir le projet ↗
        </Link>

      </div>

    </article>

  );
}

// Page principale des projets
export default function Projets() {

  const {
    data: projets,
    loading,
    error
  } = useApi("/api/projets");

  const [tagActif, setTagActif] = useState("Tous");

  // Gestion du chargement et des erreurs
  if (loading || error || !projets) {
    return <Etat loading={loading} error={error} />;
  }

  // Récupération des tags sans doublons
  const tags = [
    ...new Set(projets.flatMap(p => p.tags))
  ].sort();

  // Filtrage des projets
  const visibles = tagActif === "Tous"
    ? projets
    : projets.filter(p => p.tags.includes(tagActif));

  return (

    <section className="section" id="projets">

      <div className="section-heading">

        <p className="eyebrow">
          PORTFOLIO / RÉALISATIONS
        </p>

        <h2>Mes projets<span>.</span></h2>

        <p className="lead">
          Découvrez mes réalisations dans les domaines
          de l'intelligence artificielle, des systèmes
          embarqués et du développement informatique.
        </p>

      </div>

      <FiltreTags
        tags={tags}
        actif={tagActif}
        onChange={setTagActif}
      />

      <p className="muted" style={{ marginBottom: "25px" }}>
        {visibles.length} projet(s)
      </p>

      <div className="project-grid">

        {visibles.map(projet => (

          <ProjetCard
            key={projet.slug}
            projet={projet}
          />

        ))}

      </div>

      {visibles.length === 0 && (
        <p>Aucun projet dans cette catégorie.</p>
      )}

    </section>

  );
}