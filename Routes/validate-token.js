const jwt = require("jsonwebtoken");

const User = require('../modelSchema/userSchema');
const { clone } = require("@hapi/joi/lib/base");
const { checkout } = require("./authRouter");

const verifyUserToken = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) {
        return res.status(200).json({
            status: 0,
            message: 'Access Denied'
        });
    }
    jwt.verify(token, "RANDOM-TOKEN", function (err, decoded) {

        if (err) {
            return res.json({
                status: 2,
                msgType: "error",
                msg: "Access Dined",
                data: `${err.toString()}`
            });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyUserToken;



// const validateToken = async (req, res, next) => {
//     const authorization = req.headers.authorization;

//     let result;
//     if (!authorization) {
//         return res.status(401).json({
//             error: true,
//             message: "Access token is missing"
//         })
//     }

//     const token = req.headers.authorization.split("")[1];
//     const options = {
//         expirein: "1h"
//     };
//     try {
//         let user = await User.findOne({
//             accessToken: token,
//         });
//         if (!user) {
//             result = {
//                 error: true,
//                 message: "Authorization error",
//             }
//             return res.status(403).json(result)
//         }

//         result = jwt.verify(token, process.env.JWT_SECRET, options);

//         if (!user.userId === result.id) {
//             result = {
//               error: true,
//               message: `Invalid token`,
//             };
      
//             return res.status(401).json(result);
//           }
      
//           result["referralCode"] = user.referralCode;
      
//           req.decoded = result;
//           next();

//     }
//     catch (err) {
//         if (err.name === "TokenExpiredError") {
//             result = {
//                 error: true,
//                 message: `TokenExpired`,
//             };
//         } else {
//             result = {
//                 error: true,
//                 message: `Authentication error`,
//             };
//         }
//         return res.status(403).json(result);
//     }
// }
