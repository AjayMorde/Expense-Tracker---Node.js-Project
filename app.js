const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const addUser=require('./routes/add-user')





app.use(bodyparser.json({extended:false}));
app.use('/add-user',addUser)
app.listen(3000);