const express = require('express');
const router = express.Router();
const premiumFeatures = require('../controllers/premiumFeature');

const authenticate = require('../Authenticate/auth');


router.get('/showLeaderBoard', authenticate.authenticate, premiumFeatures.getUserLeaderBoard );
module.exports = router;