const express = require('express');
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser');
const sequelize = require('./connections/database');
const Expense=require('./connections/expense');
const Users=require('./connections/user');



const addUser = require('./routes/add-user');
const userLogin = require('./routes/user-login');
const addExpense=require('./routes/add-expense');
const getExpense=require('./routes/get-expense');
const deleteExpense=require('./routes/delete-expense');






app.use(cors());
app.use(bodyparser.json({ extended: false }));
app.use('/add-user', addUser);
app.use('/user-login',userLogin);
app.use('/add-expense',addExpense);
app.use('/get-expense',getExpense);
app.use('/delete-expense',deleteExpense);

Users.hasMany(Expense);
Expense.belongsTo(Users);

sequelize.sync({force:true})
    .then(() => {
        app.listen(3000, () => {
            console.log("server Is started on port 3000");
        })
    })
    .catch(err => {
        console.log(err);
    });
