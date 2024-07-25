const express = require('express');
const router = express.Router();
const { generateContract, signContract, getContract } = require('../controllers/contractController');

router.post('/generate', generateContract);
router.post('/sign', signContract);
router.get('/:contractId', getContract);

module.exports = router;
