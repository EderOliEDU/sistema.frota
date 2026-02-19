cat > src/models/motorista.js << 'EOF'
const db = require('../db');

class Motorista {
  static async listar() {
    const query = 'SELECT * FROM motoristas ORDER BY id DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async listarAtivos() {
    const query = 'SELECT * FROM motoristas WHERE ativo = true ORDER BY id DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async obterPorId(id) {
    const query = 'SELECT * FROM motoristas WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async obterPorStatus(status) {
    const query = 'SELECT * FROM motoristas WHERE status = $1 ORDER BY id DESC';
    const result = await db.query(query, [status]);
    return result.rows;
  }

  static async criar(dados) {
    const query = `
      INSERT INTO motoristas (nome, cpf, cnh, telefone, observacoes, ativo)
      VALUES ($1, $2, $3, $4, $5, true)
      RETURNING *
    `;
    const result = await db.query(query, [
      dados.nome,
      dados.cpf,
      dados.cnh,
      dados.telefone,
      dados.observacoes || null
    ]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const campos = [];
    const valores = [];
    let index = 1;

    if (dados.nome !== undefined) {
      campos.push(`nome = $${index++}`);
      valores.push(dados.nome);
    }
    if (dados.cpf !== undefined) {
      campos.push(`cpf = $${index++}`);
      valores.push(dados.cpf);
    }
    if (dados.cnh !== undefined) {
      campos.push(`cnh = $${index++}`);
      valores.push(dados.cnh);
    }
    if (dados.telefone !== undefined) {
      campos.push(`telefone = $${index++}`);
      valores.push(dados.telefone);
    }
    if (dados.status !== undefined) {
      campos.push(`status = $${index++}`);
      valores.push(dados.status);
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
    const query = `UPDATE motoristas SET ${campos.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await db.query(query, valores);
    return result.rows[0];
  }

  static async deletar(id) {
    const query = 'DELETE FROM motoristas WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = Motorista;
EOF
