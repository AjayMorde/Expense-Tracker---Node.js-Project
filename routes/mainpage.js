
const express = require('express');



const mainpageController = require('../controllers/mainpage');


const router = express.Router();


router.get('/home',mainpageController.gethomePage);
router.get('',mainpageController.geterrorPage)

module.exports = router;

