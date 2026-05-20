// app.js
const express = require('express');
const app = express();

// body parser
app.use(express.json());

// routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ouvragesRoutes = require('./routes/ouvrages.routes');
const commandeRoutes = require('./routes/commande.routes');
const panierRoutes = require('./routes/panier.routes');
const avisRoutes = require('./routes/avis.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ouvrages', ouvragesRoutes);
app.use('/api/commande', commandeRoutes);
app.use('/api/panier', panierRoutes);
app.use('/api/avis', avisRoutes);

module.exports = app;