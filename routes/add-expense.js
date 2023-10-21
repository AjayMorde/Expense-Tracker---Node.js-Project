const express =require('express');
const router = express.Router();
const routes=require('../controllers/addExpense');
router.post('/expense',routes.addExpense)

module.exports=router