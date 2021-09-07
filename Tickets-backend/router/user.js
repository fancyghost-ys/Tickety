const express = require('express')
const router = express.Router();
const { validate, registerRules } = require('../validator');
const { getAllUser,
    userById,
    createNewCustomer,
    updateUser,
    deleteUser,
    countUsers, 
    } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../helper/permission');

// Admin Rules
router.get('/count',requireSignin,isAuth,isAdmin,countUsers)
router.get('/:id',requireSignin,isAuth,isAdmin,userById);
router.get('/',requireSignin,isAuth,isAdmin, getAllUser);
router.post('/newAccount', [registerRules, validate], requireSignin,isAuth,isAdmin,createNewCustomer);
router.put('/:id', [registerRules, validate], requireSignin,isAuth,isAdmin,updateUser);
router.delete('/:id', requireSignin,isAuth,isAdmin,deleteUser);

module.exports = router;

