const Demanda = require('../models/demanda');

class DemandaController {
  static async listar(req, res) {
    try {
      const filtros = {
        motorista_id: req.query.motorista_id,
        status: req.query.status,
      };

      const demandas = await Demanda.listar(filtros);
      res.json({
        sucesso: true,
        total: demandas.length,
        dados: demandas
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obter(req, res) {
    try {
      const demanda = await Demanda.obterPorId(req.params.id);
      if (!demanda) {
        return res.status(404).json({ sucesso: false, erro: 'Demanda não encontrada' });
      }
      res.json({ sucesso: true, dados: demanda });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async criar(req, res) {
    try {
      const { motorista_id, veiculo_id, solicitante, destino, finalidade, data_saida, observacoes } = req.body;

      if (!motorista_id || !veiculo_id || !solicitante || !destino || !finalidade || !data_saida) {
        return res.status(400).json({ sucesso: false, erro: 'Campos obrigatórios faltando' });
      }

      const demanda = await Demanda.criar({
        motorista_id,
        veiculo_id,
        solicitante,
        destino,
        finalidade,
        data_saida,
        observacoes
      });

      res.status(201).json({ sucesso: true, dados: demanda });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const demanda = await Demanda.atualizar(req.params.id, req.body);
      if (!demanda) {
        return res.status(404).json({ sucesso: false, erro: 'Demanda não encontrada' });
      }
      res.json({ sucesso: true, dados: demanda });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async deletar(req, res) {
    try {
      const resultado = await Demanda.deletar(req.params.id);
      if (!resultado) {
        return res.status(404).json({ sucesso: false, erro: 'Demanda não encontrada' });
      }
      res.json({ sucesso: true, mensagem: 'Demanda deletada com sucesso' });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }

  static async obterAtivas(req, res) {
    try {
      const demandas = await Demanda.obterAtivas(req.params.motorista_id);
      res.json({
        sucesso: true,
        total: demandas.length,
        dados: demandas
      });
    } catch (erro) {
      res.status(500).json({ sucesso: false, erro: erro.message });
    }
  }
}

module.exports = DemandaController;
