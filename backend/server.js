import express from "express";
import cors from "cors";
import contenu from "./routes/contenu.js";

// Création de l'application Express
const app = express();

// Configuration du port
const PORT = process.env.PORT ?? 3000;

// Configuration de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(",") ?? "*"
}));

// Route d'accueil de l'API
app.get("/", (req, res) => {
  res.json({
    message: "API Portfolio SGB opérationnelle"
  });
});

// Routes de notre API
app.use("/api", contenu);

// Gestion des routes inconnues
app.use((req, res) => {
  res.status(404).json({
    erreur: "Route inconnue"
  });
});

// Démarrage du serveur en local
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`API sur http://localhost:${PORT}`);
  });
}

// Exportation pour le futur déploiement
export default app;