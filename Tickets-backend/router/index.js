const express = require('express');
const router = express.Router();

router.use('/',require('./auth'))
router.use('/user',require('./user'))
router.use('/ticket',require('./ticket'))


module.exports = router