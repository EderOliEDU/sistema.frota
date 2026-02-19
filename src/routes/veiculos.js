cat > src/routes/veiculos.js << 'EOF'
const express = require('express');
const router = express.Router();
const VeiculoController = require('../controllers/veiculoController');

router.get('/', VeiculoController.listar);
router.get('/ativos/lista', VeiculoController.listarAtivos);
router.get('/tipo/:tipo', VeiculoController.obterPorTipo);
router.get('/:id', VeiculoController.obter);
router.post('/', VeiculoController.criar);
router.put('/:id', VeiculoController.atualizar);
router.delete('/:id', VeiculoController.deletar);

module.exports = router;
EOF
