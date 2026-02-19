const db = require('../db');

class Veiculo {
  static async listar() {
    const query = 'SELECT * FROM veiculos ORDER BY id DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async listarAtivos() {
    const query = 'SELECT * FROM veiculos WHERE ativo = true ORDER BY id DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async obterPorId(id) {
    const query = 'SELECT * FROM veiculos WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async obterPorTipo(tipo) {
    const query = 'SELECT * FROM veiculos WHERE tipo = $1 ORDER BY id DESC';
    const result = await db.query(query, [tipo]);
    return result.rows;
  }

  static async criar(dados) {
    const query = `
      INSERT INTO veiculos (placa, tipo, marca, modelo, ano, capacidade, observacoes, ativo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, true)
      RETURNING *
    `;
    const result = await db.query(query, [
      dados.placa,
      dados.tipo,
      dados.marca,
      dados.modelo,
      dados.ano,
      dados.capacidade || null,
      dados.observacoes || null
    ]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const campos = [];
    const valores = [];
    let index = 1;

    if (dados.placa !== undefined) {
      campos.push(`placa = $${index++}`);
      valores.push(dados.placa);
    }
    if (dados.tipo !== undefined) {
      campos.push(`tipo = $${index++}`);
      valores.push(dados.tipo);
    }
    if (dados.marca !== undefined) {
      campos.push(`marca = $${index++}`);
      valores.push(dados.marca);
    }
    if (dados.modelo !== undefined) {
      campos.push(`modelo = $${index++}`);
      valores.push(dados.modelo);
    }
    if (dados.ano !== undefined) {
      campos.push(`ano = $${index++}`);
      valores.push(dados.ano);
    }
    if (dados.capacidade !== undefined) {
      campos.push(`capacidade = $${index++}`);
      valores.push(dados.capacidade);
    }
    if (dados.ativo !== undefined) {
      campos.push(`ativo = $${index++}`);
      valores.push(dados.ativo);
    }
    if (dados.observacoes !== undefined) {
      campos.push(`observacoes = $${index++}`);
      valores.push(dados.observacoes);
    }

    if (campos.length === 0) return null;

    valores.push(id);
    const query = `UPDATE veiculos SET ${campos.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await db.query(query, valores);
    return result.rows[0];
  }

  static async deletar(id) {
    const query = 'DELETE FROM veiculos WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = Veiculo;
