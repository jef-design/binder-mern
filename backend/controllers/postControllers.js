const Posts = require("../models/postsModels");
const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const createPost = async (req, res) => {
    const userID = req.user._id;
    const userName = await User.findOne(userID).select("name");

    const {caption} = req.body;

    const file = req.file;
    

    if (!file) {
        const post = await Posts.create({
            userName: userName.name,
            userID,
            caption,
        });
        res.status(200).json({mssg: "post created", post: post});
    }
    

    try {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
            folder: "postimage",
            resource_type: "auto",
        });
        // console.log(result)
        const post = await Posts.create({
            userName: userName.name,
            userID,
            caption,
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });
        res.status(200).json({mssg: "post created", post: post});
    } catch (error) {
        console.log(error);
    }
};

const getPosts = async (req, res) => {
    // console.log(req.cookies.jwt)
    // console.log(req.user._id)
    const posts = await Posts.find({}).sort({createdAt: -1});

    res.status(200).json({mssg: "get post", posts});
};

const deletePost = async (req, res) => {
 
    console.log(req.params.id)
    const deleteID = req.params.id
    const posts = await Posts.findByIdAndDelete(deleteID).sort({createdAt: -1});

    res.status(200).json({mssg: "delete post", posts});
};

const likePost = async (req, res) => {
 
    const postToLikeId = req.params.id
    const likerId = req.body.id
    console.log(postToLikeId, likerId)

   try {
    const postlike = await Posts.findByIdAndUpdate(postToLikeId,{ $push:{likes: {userID: likerId}}})
     res.status(200).json({mssg: 'post like' , postlike})
   } catch (error) {
    res.status(401).json({error: error.message})
   }
};
const unLikePost = async (req, res) => {
 
    const postToUnLikeId = req.params.id
    const unlikerId = req.body.id
    console.log(postToUnLikeId, unlikerId)

   try {
    const postlike = await Posts.findByIdAndUpdate(postToUnLikeId,{ $pull:{likes: {userID: unlikerId}}})
     res.status(200).json({mssg: 'post unlike' , postlike})
   } catch (error) {
    res.status(401).json({error: error.message})
   }
};



module.exports = {createPost, getPosts,deletePost,likePost,unLikePost};
