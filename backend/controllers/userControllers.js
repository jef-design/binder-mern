const Posts = require("../models/postsModels")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken = (res, _id) => {
     const createdtoken = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '2h'})
    //  console.log(createdtoken)

    res.cookie('jwt', createdtoken ,{
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000
    })

    return createdtoken
}

const signUpUser = async (req, res) => {
    const {username, name, email, password} = req.body

    try {
        const user = await User.signup(username,name,email, password)
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            username: user.username,
           email: user.email,
           name: user.name,
        })

    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const logInUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        generateToken(res, user._id)
         res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
         })
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const logOutUser = async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: new Date(1)
    })
    res.status(200).json({message: 'user logged out'})
}
const getUserDetails = async (req, res) => {

    const _id = req.params.id
    const user = await User.find({_id})
    res.status(200).json({message: 'Get user', user})
}
const upDateUser = async (req, res) => {
    const userId = req.params.id
    const {username,name, email, bio} = req.body

    try {
        // const salt = await bcrypt.genSalt(10)
        // const hash = await bcrypt.hash(password, salt)

        const user = await  User.findByIdAndUpdate(userId, {
            username: username,
            name: name, 
            email: email,
            bio: bio,
            // password: hash
            }, { new: true })
        
       
       res.status(200).json(user)
    } catch (error) {
       res.status(401).json({error: error.message})
    }
}

const followUser = async (req, res) => {

    const userTofollowId = req.params.id
    const followerId = req.body.id

   try {
    const user = await User.findByIdAndUpdate(userTofollowId,{ $push:{follower: {userID: followerId}}})
     res.status(200).json({mssg: 'success' , user})
   } catch (error) {
    res.status(401).json({error: error.message})
   }

}
const UnfollowUser = async (req, res) => {

    const userTofollowId = req.params.id
    const followerId = req.body.id

   try {
    const user = await User.findByIdAndUpdate(userTofollowId,{ $pull:{follower: {userID: followerId}}})
     res.status(200).json({mssg: 'unfollow' , user})
   } catch (error) {
    res.status(401).json({error: error.message})
   }

}

const getUserPost = async (req, res) => {

    const user = req.params.id
   
    const posts = await Posts.find({userID: user}).sort({createdAt: -1});
   
    res.status(200).json({mssg: "get user post", posts});
   

}

const getUsers = async (req, res) => {

   
    const users = await User.find({}).sort({createdAt: -1});

    res.status(200).json({mssg: "get all user", users});
   

}



module.exports = {signUpUser, logInUser, logOutUser, getUserDetails, upDateUser, followUser,UnfollowUser,getUserPost,getUsers}
