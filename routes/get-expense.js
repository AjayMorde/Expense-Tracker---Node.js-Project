const express =require('express');
const router = express.Router();
const userautheticate=require('../Authenticate/auth');
const routes=require('../controllers/getExpense');
router.get('/expense',userautheticate.autheticate, routes.getAllExpense)

module.exports=router