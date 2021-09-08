const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/app')


exports.signup = async (req, res) => {
    const user = await new User(req.body);
    await user.save().then((user) => {
        if (!user) {
            return res.status(400).json({ error: 'Email already exist' })
        }
        res.status(200).json({ user });
    })
        .catch((error) => {
            return res.status(404).json({ error: error.message })
        }
        )
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(400).json({
                error: 'User with this email does not exist. please signup'
            });
        }
        if (!user.authenicate(password)) {
            return res.status(401).json({
                error: 'Email and Password don\'t match'
            });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, config.JwtSecret);
        res.cookie('token', token, { expiresIn: '1d' })
        const { _id, firstName, email, role } = user;
        return res.status(200).json({ token, user: { _id, firstName, email, role } })
    }).
        catch((error) => {
            return res.status(401).json({ message: error.message })
        })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'You Sigout!!' })
}
