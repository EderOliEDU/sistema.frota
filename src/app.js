cat > src/app.js << 'EOF'
const express = require('express');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const demandas = require('./routes/demandas');
const motoristas = require('./routes/motoristas');
const veiculos = require('./routes/veiculos');

app.use('/api/demandas', demandas);
app.use('/api/motoristas', motoristas);
app.use('/api/veiculos', veiculos);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
EOF
