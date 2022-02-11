const User = require('../models/User');

module.exports = async (req, res, next) => {

    const { username, password, handlename } = req.body;

    const specialChars = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    const alreadyCreatedUser = await User.findOne({ username: username })

    // Check if user has already been created
    if (alreadyCreatedUser) {
        const errorMessage = 'User has already been created';
        return res.render('auth/signup', { errorMessage })
    }

    else if (password.length < 8) {
        const errorMessage = 'Password must be at least 8 characters'
        return res.render('auth/signup', { errorMessage })
    }

    // Check if User is creating account with empty fields
    else if (!username || !password) {
        const errorMessage = 'You must fill out the appropriate fields'
        return res.render('auth/signup', { errorMessage })
    }

    // Check if User is creating account with special characters
    else if (specialChars.test(username) || specialChars.test(handlename)) {
        const errorMessage = 'Username and Handlename should not contain special characters'
        return res.render('auth/signup', { errorMessage })
    }

    // 👍 Passed all checks!  
    else {
        next();
    }

}