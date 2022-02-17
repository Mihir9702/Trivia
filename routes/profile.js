const router = require('express').Router();

const User = require('../models/User');

const loggedIn = require('../middleware/LoggedIn');

const { genSaltSync, hashSync } = require('bcryptjs');

router.get('/', loggedIn, (req, res) => {
    res.redirect(`/profile/${req.user._id}`)
})

router.get('/:id', loggedIn, async (req, res) => {
    const user = await User.findById(req.user._id)

    res.render('private/profile', user);
});

router.get('/:id/edit', loggedIn, (req, res) => {
    res.render('private/profile-settings', req.user)
});

router.post('/:id/edit', loggedIn, async (req, res) => {
    const { username, password, handlename } = req.body;
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);

    try {
        if (password) {
            const user = await User.findByIdAndUpdate(req.user._id, {
                username: username,
                password: hash,
                handlename: handlename
            });
            res.redirect(`/profile/${user._id}`)
        } else {
            const user = await User.findByIdAndUpdate(req.user._id, {
                username: username,
                handlename: handlename
            });
            res.redirect(`/profile/${user._id}`)
        }
    } catch (err) {
        console.log(`Update Error: ${err}`)
    }
});

router.get('/:id/delete', loggedIn, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    try {
        req.session.destroy();
        req.app.locals.globalUser = null;
        res.render('private/delete');
    } catch (err) {
        console.log(`Redirecting Err: ${err}`);
    }

});

router.get('/:id/trivias', loggedIn, async (req, res) => {
    const user = await User.findById(req.params.id).populate();

    res.render('private/user-trivias', { user });
});

module.exports = router;