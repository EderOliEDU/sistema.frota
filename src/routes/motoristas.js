const express = require('express');
const router = express.Router();
const MotoristaController = require('../controllers/motoristaController');

router.get('/', MotoristaController.listar);
router.get('/ativos/lista', MotoristaController.listarAtivos);
router.get('/status/:status', MotoristaController.obterPorStatus);
router.get('/:id', MotoristaController.obter);
router.post('/', MotoristaController.criar);
router.put('/:id', MotoristaController.atualizar);
router.delete('/:id', MotoristaController.deletar);

module.exports = router;
