const express = require('express');
const { generateContract, signContract, getContract } = require('../controllers/contractController');

const router = express.Router();

router.post('/generate', generateContract);
router.post('/sign', signContract);
router.get('/:contractId', getContract);

module.exports = router;
