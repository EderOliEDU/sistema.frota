cat > src/controllers/motoristaController.js << 'EOF'
const Motorista = require('../models/motorista');

class MotoristaController {
  static async listar(req, res) {
    try {
      const motoristas = await Motorista.listar();
      res.json({
        sucesso: true,
        total: motoristas.length,
        dados: motoristas
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async listarAtivos(req, res) {
    try {
      const motoristas = await Motorista.listarAtivos();
      res.json({
        sucesso: true,
        total: motoristas.length,
        dados: motoristas
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obter(req, res) {
    try {
      const motorista = await Motorista.obterPorId(req.params.id);
      if (!motorista) {
        return res.status(404).json({ sucesso: false, erro: 'Motorista não encontrado' });
      }
      res.json({ sucesso: true, dados: motorista });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obterPorStatus(req, res) {
    try {
      const motoristas = await Motorista.obterPorStatus(req.params.status);
      res.json({
        sucesso: true,
        total: motoristas.length,
        dados: motoristas
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, cpf, cnh, telefone, observacoes } = req.body;

      if (!nome || !cpf || !cnh || !telefone) {
        return res.status(400).json({ sucesso: false, erro: 'Campos obrigatórios faltando' });
      }

      const motorista = await Motorista.criar({
        nome,
        cpf,
        cnh,
        telefone,
        observacoes
      });

      res.status(201).json({ sucesso: true, dados: motorista });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const motorista = await Motorista.atualizar(req.params.id, req.body);
      if (!motorista) {
        return res.status(404).json({ sucesso: false, erro: 'Motorista não encontrado' });
      }
      res.json({ sucesso: true, dados: motorista });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async deletar(req, res) {
    try {
      const resultado = await Motorista.deletar(req.params.id);
      if (!resultado) {
        return res.status(404).json({ sucesso: false, erro: 'Motorista não encontrado' });
      }
      res.json({ sucesso: true, mensagem: 'Motorista deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = MotoristaController;
EOF
