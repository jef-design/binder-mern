const express = require('express')
const {createPost, getPosts, deletePost, likePost,unLikePost} = require('../controllers/postControllers')
const router = express.Router()
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware')


const storage = multer.memoryStorage();
const upload = multer({ storage });
router.use(authMiddleware)


router.post('/create', upload.single('image'), createPost)
router.get('/', getPosts)
router.delete('/:id', deletePost)
router.patch('/like/:id', likePost)
router.patch('/unlike/:id', unLikePost)


module.exports = router
