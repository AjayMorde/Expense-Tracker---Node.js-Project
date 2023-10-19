const express = require('express');
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser');
const sequelize = require('./connections/database');



const addUser = require('./routes/add-user')





app.use(cors());
app.use(bodyparser.json({ extended: false }));
app.use('/add-user', addUser)



sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("server Is started on port 3000");
        })
    })
    .catch(err => {
        console.log(err);
    });
