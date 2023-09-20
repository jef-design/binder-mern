const express = require('express')
const { signUpUser, logInUser, logOutUser,getUserDetails,followUser,UnfollowUser,getUserPost, getUsers } = require('../controllers/userControllers')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

router.post('/signup', signUpUser)
router.post('/login', logInUser)
router.post('/logout', logOutUser)
router.get('/user/:id', getUserDetails)
router.get('/user/post/:id', getUserPost)
router.patch('/follow/:id', followUser)
router.patch('/unfollow/:id', UnfollowUser)
router.get('/users', getUsers)


module.exports = router
