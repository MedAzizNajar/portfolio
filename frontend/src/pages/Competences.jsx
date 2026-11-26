import useApi from "../hooks/useApi.js";
import Etat from "../components/Etat.jsx";

export default function Competences() {

  // Recuperer les competences depuis le backend
  const {
    data: competences,
    loading,
    error
  } = useApi("/api/competences");

  // Gestion du chargement et des erreurs
  if (loading || error || !competences) {
    return <Etat loading={loading} error={error} />;
  }

  return (

    <section className="section" id="competences">

      {/* Titre de la page */}

      <div className="section-heading">

        <p className="eyebrow">
          PORTFOLIO / EXPERTISE
        </p>

        <h2>
          Mes compétences<span>.</span>
        </h2>

        <p className="lead">
          Découvrez mes compétences techniques,
          mes outils de développement et les
          technologies que j'utilise dans mes projets.
        </p>

      </div>

      {/* Statistiques */}

      <div
        className="stats"
        style={{ marginBottom: "40px" }}
      >

        <div>
          <strong>{competences.length}</strong>
          <span>Domaines de compétences</span>
        </div>

        <div>
          <strong>
            {competences.reduce(
              (total, groupe) =>
                total + groupe.items.length, 0
            )}
          </strong>

          <span>Compétences et connaissances</span>
        </div>

        <div>
          <strong>M2</strong>
          <span>Ingénierie informatique</span>
        </div>

      </div>

      {/* Affichage des groupes de competences */}

      <div className="skill-grid">

        {competences.map((groupe, index) => (

          <article
            className="panel skill"
            key={groupe.groupe}
          >

            <span className="skill-number">
              {String(index + 1).padStart(2, "0")} /
            </span>

            <h3>{groupe.groupe}</h3>

            <div className="tags">

              {groupe.items.map(item => (

                <span key={item.nom}>
                  {item.nom}
                </span>

              ))}

            </div>

          </article>

        ))}

      </div>

    </section>

  );
}