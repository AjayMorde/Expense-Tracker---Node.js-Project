const express =require('express');
const router = express.Router();
const userautheticate=require('../Authenticate/auth');
const routes=require('../controllers/addExpense');
router.post('/expense',userautheticate.autheticate,routes.addExpense)

module.exports=router