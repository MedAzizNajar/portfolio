import { Router } from "express";

import {
  profil,
  projets,
  competences,
  parcours
} from "../lib/donnees.js";

const router = Router();

// Route 1 : récupérer le profil
router.get("/profil", (req, res) => {
  res.json(profil);
});

// Route 2 : récupérer les projets
// Avec possibilité de filtrer par tag
router.get("/projets", (req, res) => {
  const { tag } = req.query;

  if (!tag) {
    return res.json(projets);
  }

  res.json(
    projets.filter((p) => p.tags.includes(tag))
  );
});

// Route 3 : récupérer un projet par son slug
router.get("/projets/:slug", (req, res) => {
  const projet = projets.find(
    (p) => p.slug === req.params.slug
  );

  if (!projet) {
    return res.status(404).json({
      erreur: "Projet introuvable"
    });
  }

  res.json(projet);
});

// Route 4 : récupérer les compétences
router.get("/competences", (req, res) => {
  res.json(competences);
});

// Route 5 : récupérer le parcours
router.get("/parcours", (req, res) => {
  res.json(parcours);
});

export default router;