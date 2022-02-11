const User = require('../models/User');
const { compareSync } = require('bcryptjs');

module.exports = async (req, res, next) => {

    const errorMessage = 'Username or Password is incorrect'

    const { username, password } = req.body;

    const userInDataBase = await User.findOne({ username: username })

    // Check if user is in the database
    if (!userInDataBase) {
        return res.render('auth/login', { errorMessage })
    }

    else {
        // Compare passwords
        const match = compareSync(password, userInDataBase.password)

        // ❌ Passwords do not match
        if (!match) {
            return res.render('auth/login', { errorMessage })
        }

        // ✅ Passwords match
        else {
            next();
        }
    }

}