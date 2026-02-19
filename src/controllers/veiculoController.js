const Veiculo = require('../models/veiculo');

class VeiculoController {
  static async listar(req, res) {
    try {
      const veiculos = await Veiculo.listar();
      res.json({
        sucesso: true,
        total: veiculos.length,
        dados: veiculos
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async listarAtivos(req, res) {
    try {
      const veiculos = await Veiculo.listarAtivos();
      res.json({
        sucesso: true,
        total: veiculos.length,
        dados: veiculos
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obter(req, res) {
    try {
      const veiculo = await Veiculo.obterPorId(req.params.id);
      if (!veiculo) {
        return res.status(404).json({ sucesso: false, erro: 'Veículo não encontrado' });
      }
      res.json({ sucesso: true, dados: veiculo });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obterPorTipo(req, res) {
    try {
      const veiculos = await Veiculo.obterPorTipo(req.params.tipo);
      res.json({
        sucesso: true,
        total: veiculos.length,
        dados: veiculos
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async criar(req, res) {
    try {
      const { placa, tipo, marca, modelo, ano, capacidade, observacoes } = req.body;

      if (!placa || !tipo || !marca || !modelo || !ano) {
        return res.status(400).json({ sucesso: false, erro: 'Campos obrigatórios faltando' });
      }

      const veiculo = await Veiculo.criar({
        placa,
        tipo,
        marca,
        modelo,
        ano,
        capacidade,
        observacoes
      });

      res.status(201).json({ sucesso: true, dados: veiculo });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const veiculo = await Veiculo.atualizar(req.params.id, req.body);
      if (!veiculo) {
        return res.status(404).json({ sucesso: false, erro: 'Veículo não encontrado' });
      }
      res.json({ sucesso: true, dados: veiculo });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async deletar(req, res) {
    try {
      const resultado = await Veiculo.deletar(req.params.id);
      if (!resultado) {
        return res.status(404).json({ sucesso: false, erro: 'Veículo não encontrado' });
      }
      res.json({ sucesso: true, mensagem: 'Veículo deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = VeiculoController;
