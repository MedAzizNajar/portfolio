import { useEffect } from "react";

import {
  Routes,
  Route,
  NavLink,
  Link,
  useLocation
} from "react-router";

import useApi from "./hooks/useApi.js";
import Etat from "./components/Etat.jsx";

import Accueil from "./pages/Accueil.jsx";
import Projets from "./pages/Projets.jsx";
import ProjetDetail from "./pages/ProjetDetail.jsx";
import Competences from "./pages/Competences.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

// Barre de navigation
function Navbar() {

  return (

    <header className="nav-wrap">

      <nav className="navbar shell">

        <Link className="logo" to="/">
          AZIZ<span>.dev</span>
        </Link>

        <div className="nav-links">

          <NavLink to="/" end>
            Accueil
          </NavLink>

          <Link to="/#about">
            À propos
          </Link>

          <Link to="/#experiences">
            Expériences
          </Link>

          <NavLink to="/projets">
            Projets
          </NavLink>

          <NavLink to="/competences">
            Compétences
          </NavLink>

          <Link to="/#formations">
            Formations
          </Link>

        </div>

        <Link
          className="nav-contact"
          to="/#contact"
        >
          Contact ↗
        </Link>

      </nav>

    </header>

  );
}

// Gestion du défilement entre les pages
function ScrollNavigation() {

  const { pathname, hash } = useLocation();

  useEffect(() => {

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    function defiler() {
      const element = document.getElementById(
        hash.slice(1)
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });

        return true;
      }

      return false;
    }

    if (defiler()) return;

    // Attendre que les données soient affichées
    const observer = new MutationObserver(() => {
      if (defiler()) {
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById("root"), {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();

  }, [pathname, hash]);

  return null;
}

// Pied de page
function Footer({ profil }) {

  return (

    <footer className="shell footer">

      <span>
        © {new Date().getFullYear()} {profil.nom}
      </span>

      <span>
        React · Vite · Node.js · Express · JSON
      </span>

      <a
        href={profil.github}
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>

      <button
        className="button secondary"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
      >
        Retour en haut ↑
      </button>

    </footer>

  );
}

// Application principale
export default function App() {

  // Récupérer le profil depuis le backend
  const {
    data: profil,
    loading,
    error
  } = useApi("/api/profil");

  // Gestion du chargement et des erreurs
  if (loading || error || !profil) {
    return (
      <div className="portfolio">
        <main className="shell section">
          <Etat loading={loading} error={error} />
        </main>
      </div>
    );
  }

  return (

    <div className="portfolio">

      <ScrollNavigation />

      <Navbar />

      <main className="shell">

        <Routes>

          {/* Page Accueil */}

          <Route
            path="/"
            element={<Accueil profil={profil} />}
          />

          {/* Page Projets */}

          <Route
            path="/projets"
            element={<Projets />}
          />

          {/* Page détail d'un projet */}

          <Route
            path="/projets/:slug"
            element={<ProjetDetail />}
          />

          {/* Page Compétences */}

          <Route
            path="/competences"
            element={<Competences />}
          />

          {/* Page 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

      <Footer profil={profil} />

    </div>

  );
}