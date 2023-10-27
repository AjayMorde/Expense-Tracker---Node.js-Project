const express =require('express');
const router = express.Router();
const routes=require('../controllers/deleteExpense');
const userautheticate=require('../Authenticate/auth');
router.delete('/delete/:id',userautheticate.authenticate,routes.deleteExpense);



module.exports=router