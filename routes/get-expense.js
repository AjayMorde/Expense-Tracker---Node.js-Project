const express =require('express');
const router = express.Router();
const routes=require('../controllers/getExpense');
router.get('/expense',routes.getAllExpense)

module.exports=router