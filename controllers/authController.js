const bcrypt = require('bcrypt');
const User = require('../models/User');

// Render login form
exports.renderSignInForm = (req, res) => {
    res.render('login');
};

// Handle login form submission
exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/dashboard');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

// Render signup form
exports.renderSignUpForm = (req, res) => {
    res.render('signup');
};

// Handle signup form submission
exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up');
    }
};
