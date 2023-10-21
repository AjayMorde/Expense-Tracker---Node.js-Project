const express =require('express');
const router = express.Router();
const routes=require('../controllers/deleteExpense');
router.delete('/delete/:id',routes.deleteExpense);



module.exports=router