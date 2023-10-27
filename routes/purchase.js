const express = require('express');

const purchase = require('../controllers/purchase');

const authenticate = require('../Authenticate/auth');

const router = express.Router();

router.get('/premiummembership', authenticate.authenticate,purchase.purchasepremium);

router.post('/updatetransactionstatus', authenticate.authenticate, purchase.updateTransactionStatus)

module.exports = router;