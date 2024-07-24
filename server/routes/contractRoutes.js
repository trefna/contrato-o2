const express = require('express');
const router = express.Router();
const { generateContract, signContract, getContract } = require('../controllers/contractController'); // Asegúrate de que la ruta es correcta

router.post('/generate', generateContract);
router.post('/sign', signContract);
router.get('/:id', getContract);

module.exports = router;
