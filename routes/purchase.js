const express = require('express');

const purchase = require('../controllers/purchase');

const authenticate = require('../Authenticate/auth');

const router = express.Router();

router.get('/premiummembership', authenticate.autheticate,purchase.purchasepremium);

router.post('/updatetransactionstatus', authenticate.autheticate, purchase.updateTransactionStatus)

module.exports = router;