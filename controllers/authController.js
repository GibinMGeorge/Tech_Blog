const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.renderSignUpForm = (req, res) => {
    res.render('signup'); // Render sign-up form view
};

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        req.session.userId = newUser.id; // Set up session
        res.redirect('/blog/dashboard'); // Redirect to dashboard
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up');
    }
};

exports.renderSignInForm = (req, res) => {
    res.render('signin'); // Render sign-in form view
};

exports.signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id; // Set up session
            res.redirect('/blog/dashboard'); // Redirect to dashboard
        } else {
            res.redirect('/auth/signin'); // Redirect back to sign-in page
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing in');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
