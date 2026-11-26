import { Link } from "react-router";

export default function NotFound() {

  return (

    <section className="section">

      <div className="contact panel">

        <p className="eyebrow">
          PORTFOLIO / ERREUR
        </p>

        <h2 style={{ fontSize: "100px" }}>
          404<span>.</span>
        </h2>

        <h2>Page introuvable</h2>

        <p className="muted">
          Désolé, la page que vous recherchez
          n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="button primary"
        >
          ← Retour à l'accueil
        </Link>

      </div>

    </section>

  );
}