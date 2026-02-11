const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || '172.17.2.6',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'frota',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
  console.error('Erro na conexão com banco:', err);
});

module.exports = pool;
