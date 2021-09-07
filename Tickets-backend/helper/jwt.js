// const expressJwt = require('express-jwt');
// const config = require('../config/app');

// function authJwt(){
//       const secret= config.JwtSecret
//       const URL = config.appUrl
//       const Port= config.appPort
//       return [expressJwt({
//         secret,
//         algorithms:['HS256'],
//         isRevoked:isAdmin
//       }).unless({
//         path: [
//             {url:/\/signin/,methods:['POST','OPTIONS']},    
//             {url:/\/signup/,methods:['POST','OPTIONS']},    
//             {url:/\/signout/,methods:['GET','OPTIONS']},    
//         ]
//       })  
//      ]
// }


// async function isAdmin (req,payload,done) {
//     if(payload.role !== 3){
//     console.log('Admin Resource! Access denied')
//       done(null,true)
//     }
//     done();
// }


// // exports.isCustomerService = (req,res,next) =>{
// //     if(req.profile.role !== 2){
// //         return res.status(403).json({
// //             error:'Customer Sevice agent Resource! Access denied'
// //         })
// //     }
// //     next();
// // }

// /*        {url:/\/ticket\/myTicket(.*)/,methods:['GET','OPTIONS']},    
//             {url:/\/ticket\/myTicket(.*)/,methods:['GET','OPTIONS']},    
//             {url:/\/ticket\/customerTickets(.*)/,methods:['GET','OPTIONS']},
//             {url:/\/ticket\/submit(.*)/,methods:['PUT','OPTIONS']},    
//     */

// module.exports = authJwt