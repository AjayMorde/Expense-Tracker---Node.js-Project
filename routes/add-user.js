const express =require('express');
const router = express.Router();
const routes=require('../controllers/addUser');
router.post('/add',routes.addUser)

module.exports=router