const Sequelize=require('sequelize');
const sequelize=new Sequelize('ExpenseTrackeApp','root','Ajay@1998',{  
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;