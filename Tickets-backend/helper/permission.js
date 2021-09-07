const expressJwt = require('express-jwt');
const config = require('../config/app');

const secret= config.JwtSecret
      
exports.requireSignin=
       expressJwt({
        secret,
        algorithms:['HS256'],
        userProperty:'auth'
      });

exports.isAuth = (req,res,next)=>{
    if(!req.auth){
        return res.status(403).json({message:'Acess Denied, Please Signin'})
    }
    next()
}

exports.isAdmin = (req,res,next) =>{
    if(req.auth.role !== 3){
        return res.status(403).json({
            error:'Admin Resource! Access denied'
        })
    }
    next()   
}

exports.isCustomerService = (req,res,next) =>{
    if(req.auth.role < 2 ){
        return res.status(403).json({
            error:'Customer Sevice agent Resource! Access denied'
        })
    }
    next()   
}

exports.extractToken= (req)=> {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token=req.headers.authorization.split(' ')[1];
        console.log(token)
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}