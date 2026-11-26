export default function Etat({ loading, error }) {

  if (loading) {
    return (
      <div className="etat chargement">
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="etat erreur">
        <h3>Une erreur est survenue</h3>
        <p>{error}</p>

        <button
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return null;
}