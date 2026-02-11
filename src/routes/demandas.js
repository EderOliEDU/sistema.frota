const express = require('express');
const router = express.Router();
const DemandaController = require('../controllers/demandaController');

router.get('/', DemandaController.listar);
router.get('/:id', DemandaController.obter);
router.post('/', DemandaController.criar);
router.put('/:id', DemandaController.atualizar);
router.delete('/:id', DemandaController.deletar);
router.get('/motorista/:motorista_id/ativas', DemandaController.obterAtivas);

module.exports = router;
