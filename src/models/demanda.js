const pool = require('../db/connection');

class Demanda {
  static async criar(dados) {
    const query = `
      INSERT INTO demandas (motorista_id, veiculo_id, solicitante, destino, finalidade, data_saida, status, observacoes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      dados.motorista_id,
      dados.veiculo_id,
      dados.solicitante,
      dados.destino,
      dados.finalidade,
      dados.data_saida,
      'pendente',
      dados.observacoes
    ]);
    return result.rows[0];
  }

  static async listar(filtros = {}) {
    let query = `
      SELECT d.*, m.nome as motorista_nome, v.placa as veiculo_placa
      FROM demandas d
      LEFT JOIN motoristas m ON d.motorista_id = m.id
      LEFT JOIN veiculos v ON d.veiculo_id = v.id
      WHERE 1=1
    `;
    const params = [];

    if (filtros.motorista_id) {
      query += ` AND d.motorista_id = $${params.length + 1}`;
      params.push(filtros.motorista_id);
    }

    if (filtros.status) {
      query += ` AND d.status = $${params.length + 1}`;
      params.push(filtros.status);
    }

    query += ' ORDER BY d.data_saida DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async obterPorId(id) {
    const query = `
      SELECT d.*, m.nome as motorista_nome, v.placa, v.tipo
      FROM demandas d
      LEFT JOIN motoristas m ON d.motorista_id = m.id
      LEFT JOIN veiculos v ON d.veiculo_id = v.id
      WHERE d.id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const updates = [];
    const params = [];
    let paramCount = 1;

    Object.keys(dados).forEach(key => {
      if (key !== 'id') {
        updates.push(`${key} = $${paramCount}`);
        params.push(dados[key]);
        paramCount++;
      }
    });

    params.push(id);
    const query = `
      UPDATE demandas
      SET ${updates.join(', ')}, data_atualizacao = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *;
    `;
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async deletar(id) {
    const query = 'DELETE FROM demandas WHERE id = $1 RETURNING id;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async obterAtivas(motorista_id) {
    const query = `
      SELECT d.*, v.placa, v.tipo
      FROM demandas d
      LEFT JOIN veiculos v ON d.veiculo_id = v.id
      WHERE d.motorista_id = $1 AND d.status IN ('pendente', 'em_andamento')
      ORDER BY d.data_saida ASC;
    `;
    const result = await pool.query(query, [motorista_id]);
    return result.rows;
  }
}

module.exports = Demanda;
