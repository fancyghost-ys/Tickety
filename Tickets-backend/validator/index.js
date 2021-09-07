const {body, validationResult} = require('express-validator')

exports.registerRules = (() =>{
    return[
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({min: 8}),
    ]
})()


exports.ticketRules = (() =>{
    return[
        body('title').notEmpty(),
        body('status').notEmpty(),
        body('user').notEmpty(),
    ]
})()

exports.validate= (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:'Fill form correctly'})
    }
    next()
}