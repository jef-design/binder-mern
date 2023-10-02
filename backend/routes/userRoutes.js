const express = require('express')
const { signUpUser, logInUser, logOutUser,getUserDetails,upDateUser, followUser,UnfollowUser,getUserPost, getUsers, refreshToken, searchBinder, deleteUser } = require('../controllers/userControllers')
const router = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const authMiddleware = require('../middleware/authMiddleware')

// router.post('/refresh', refreshToken)
router.post('/signup', signUpUser)
router.post('/login', logInUser)
router.post('/logout', logOutUser)
router.get('/user/:id', authMiddleware, getUserDetails)
router.patch('/user/:id',upload.single('image'), authMiddleware, upDateUser)
router.get('/user/post/:id', authMiddleware, getUserPost)
router.delete('/user/:id', authMiddleware, deleteUser)
router.patch('/follow/:id', authMiddleware, followUser)
router.patch('/unfollow/:id', authMiddleware, UnfollowUser)
router.get('/users', getUsers)
router.get('/search', authMiddleware, searchBinder)



module.exports = router
