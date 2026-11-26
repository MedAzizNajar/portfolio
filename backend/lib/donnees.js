import { readFileSync } from "node:fs";

// Fonction pour lire un fichier JSON
function lireJson(url) {
  return JSON.parse(readFileSync(url, "utf8"));
}

// Récupération du profil
export const profil = lireJson(
  new URL("../data/profil.json", import.meta.url)
);

// Récupération des projets
export const projets = lireJson(
  new URL("../data/projets.json", import.meta.url)
);

// Récupération des compétences
export const competences = lireJson(
  new URL("../data/competences.json", import.meta.url)
);

// Récupération du parcours
export const parcours = lireJson(
  new URL("../data/parcours.json", import.meta.url)
);