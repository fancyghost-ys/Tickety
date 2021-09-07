const express = require('express');
const router = express.Router();

const {
    signin,
    signup,
    signout,
} = require('../controllers/auth');
const { validate ,registerRules} = require('../validator');


router.post('/signup',[registerRules,validate],signup);
router.post('/signin',signin);
router.get('/signout',signout);

module.exports = router;