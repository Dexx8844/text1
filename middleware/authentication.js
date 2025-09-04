const jwt = require('jsonwebtoken')
const userModel = require ('../models/user.js')
require('dotenv').config();

exports.authenticate = async (req, res, next)=>{
    try {
        const auth = req.header('Authorization')
        if (auth == undefined) {
            return res.status(401).json({
                message: 'token not found'
            })
        }
        const token = auth.split(' ')[1]
        if (token == undefined) {
            return res.status(401).json({
                message: 'token not found'
            })
        }
       const decodedToken = jwt.verify(token, process.env.SECRET)
console.log(decodedToken)
       const user = await userModel.findById(decodedToken.userId)
       if (user == null) {
        return res.status(404).json({
            message: 'authentication failed: user not found'
        })
       }

       req.user = decodedToken

       next()

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError){
            return res.status(401).json({
                message: 'session timed out'
            })
        }
       console.log(error.message) 
       res.status(401).json({
        message: 'internal server error'
       })
    }
}


// const jwt = require('jsonwebtoken');
// const userModel = require ('../models/user.js')
// require('dotenv').config();



// exports.authenticate = async (req, res, next)=>{
//     try {
//         const auth = req.header('Authorization')
//         if (auth == undefined) {
//             return res.status(401).json({
//                 message: 'token not found'
//             })
//         }
//         const token = auth.split(' ')[1]
//         if (token == undefined) {
//             return res.status(401).json({
//                 message: 'token not found'
//             })
//         }
//        const decodedToken = jwt.verify(token, process.env.SECRET)
// console.log(decodedToken)
//        const user = await userModel.findById(decodedToken.userId)
//        if (user == null) {
//         return res.status(404).json({
//             message: 'authentication failed: user not found'
//         })
//        }

//        req.user = decodedToken

//        next()

//     } catch (error) {
//         if (error instanceof jwt.TokenExpiredError){
//             return res.status(401).json({
//                 message: 'session timed out'
//             })
//         }
//        console.log(error.message) 
//        res.status(401).json({
//         message: 'internal server error'
//        })
//     }
// }




// exports.authenticate = async (req, res, next) => {
//     try {
//         const auth = req.headers.authorization;
//         if (!auth) {
//             return res.status(400).json({ message: 'Token not found' });
//         }

//         const token = auth.split(' ')[1];
//         if (!token) {
//             return res.status(404).json({ message: 'Invalid Token' });
//         }

//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findByPk(decodedToken.userId);

//         if (!user) {
//             return res.status(400).json({ message: 'Authentication failed: user not found' });
//         }

//         if (user.isLoggedIn !== decodedToken.isLoggedIn) {
//             return res.status(401).json({
//                 message: 'Unauthorized: you must be logged in to perform this action'
//             });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.log(error.message);
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(400).json({
//                 message: 'Session timeout: Please login to continue'
//             });
//         }
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };