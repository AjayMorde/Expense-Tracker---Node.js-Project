require('dotenv').config();
const path= require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet=require('helmet');
const compression = require('compression');
const bodyparser = require('body-parser');
const sequelize = require('./connections/database');
const Expense = require('./models/expense');
const Users = require('./models/user');
const Order = require('./models/order');
const Forgotpassword = require('./models/forgotPassword');
const Download=require('./models/download');



const addUser = require('./routes/add-user');
const userName=require('./routes/getUsername');
const userLogin = require('./routes/user-login');
const addExpense = require('./routes/add-expense');
const getExpense = require('./routes/get-expense');
const deleteExpense = require('./routes/delete-expense');
const purchase = require('./routes/purchase');
const premiumFeatures = require('./routes/premiumFeatures');
const forgotPassword=  require('./routes/forgotPassword');
const report= require('./routes/reports');




app.use(express.static(path.join(__dirname+ 'public')));  
app.use(cors());
app.use(bodyparser.json({ extended: false }));
app.use(helmet());
app.use(compression());

app.use('/add-user', addUser);
app.use('/user-login', userLogin);
app.use('/getUser', userName); 
app.use('/add-expense', addExpense);
app.use('/get-expense', getExpense);
app.use('/delete-expense', deleteExpense);
app.use('/purchase', purchase);
app.use('/premiumuser', premiumFeatures);
app.use('/password', forgotPassword);
app.use('/report',report);


Users.hasMany(Expense);
Expense.belongsTo(Users);


Users.hasMany(Order);
Order.belongsTo(Users);


Users.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Users);

Users.hasMany(Download);
Download.belongsTo(Users);


sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("server Is started on port 3000");
        })
    })
    .catch(err => {
        console.log(err);
    });
