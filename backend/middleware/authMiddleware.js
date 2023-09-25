const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const authMiddleware = async (req,res, next) => {
    console.log(req.cookies)
    const authToken = req.cookies.jwt;
   
    if(!authToken){
        return res.status(401).json({message: 'Not Authorized, No token'})

    }

   try {
    const {_id} = jwt.verify(authToken, process.env.JWT_SECRET)
    const objId = await User.findOne({_id}).select('_id')
    req.user = objId
    // console.log(req.user._id)
    next()
   } catch (error) {
    return res.status(401).json({message: 'Not Authorized, Invalid token'})
   }

}
module.exports = authMiddleware