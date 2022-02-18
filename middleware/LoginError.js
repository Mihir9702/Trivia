const User = require('../models/User');
const { compareSync } = require('bcryptjs');

module.exports = async (req, res, next) => {


    const { username, password } = req.body;

    const userInDataBase = await User.findOne({ username: username });

    // Check if user is in the database
    if (!userInDataBase) {
        const errorMessage = 'Username or Password is incorrect';
        res.render('auth/login', { errorMessage });
    }

    else {
        // Compare passwords
        const errorMessage = 'Username or Password is incorrect';
        const match = compareSync(password, userInDataBase.password);

        // ❌ Passwords do not match
        if (!match) {
            return res.render('auth/login', { errorMessage });
        }

        // ✅ Passwords match
        else {
            next();
        }
    }

};