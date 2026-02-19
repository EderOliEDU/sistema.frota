const express = require('express');
const app = express();

// Import motoristas and veiculos routes
const motoristasRoutes = require('./routes/motoristas');
const veiculosRoutes = require('./routes/veiculos');

// Use the routes
app.use('/api/motoristas', motoristasRoutes);
app.use('/api/veiculos', veiculosRoutes);

module.exports = app;
