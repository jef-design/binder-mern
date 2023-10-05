const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const authMiddleware = async (req,res, next) => {
    // console.log(req.cookies)
    const authToken = req.cookies.jwt;

    if(!authToken){
        return res.status(401).json({message: 'Not Authorized, No token'})
    }
    
    jwt.verify(authToken, process.env.JWT_REFRESH_SECRET, async function(err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Token Expired',tokenExpired: err});
        }
        else {
            const {_id} = decoded
            req.user = await User.findOne({_id}).select('_id')
            // req.user = objId
            
            next()
          }
      });

}
module.exports = authMiddleware