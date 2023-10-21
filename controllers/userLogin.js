const Users = require('../connections/user');
const bcrypt = require('bcrypt');


function isDataValid(data) {
    if (data == undefined || data.length === 0) {
        return true;
    } else {
        return false;
    }
}

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (isDataValid(email) || isDataValid(password)) {
            res.status(402).json({ msg: 'Bad Parameters' })
        }

        const user = await Users.findOne({
            where: { Email: email }
        })

        if (!user) {
            console.log('User not found');
            res.status(404).json({ msg: 'User does not exist' });
        } 
        else {
            // here comparing a hashing password 
            const checkPassword = await bcrypt.compare(password, user.Password);

            if (!checkPassword) {
                console.log('Wrong password');
                res.status(401).json({ msg: 'Wrong password' });
            } else {
                console.log('Login successful');
                res.status(200).json({ Email: user.Email });
            }
        }

    }
    catch (err) {

        console.error('Error:', err);
        res.status(500).json({ msg: ' An error occurred.' });

    }
}
module.exports = { userLogin };