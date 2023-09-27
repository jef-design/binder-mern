const Posts = require("../models/postsModels");
const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const createPost = async (req, res) => {
    const userID = req.user._id;

    const {caption} = req.body;

    const file = req.file;

    if (!file) {
        const post = await Posts.create({
            userID,
            caption,
        });
      return res.status(200).json({mssg: "post created", post: post});
    }
    

    try {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
            folder: "postimage",
            resource_type: "auto",
        });
        // console.log(result)
        const post = await Posts.create({
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

    const posts = await Posts.find({}).sort({createdAt: -1}).populate({
        path: 'userID',
        select: ['name','profile_image.url'],
      }).populate({
        path: 'comments.userID',
        select: ['name','profile_image.url']
      })
    res.status(200).json({mssg: "get post", posts});
};

const deletePost = async (req, res) => {
    
    const deleteID = req.params.id
    const imagePulicId = await Posts.findById(deleteID)
    const postFiltered = imagePulicId.image.public_id
    

    if(!postFiltered){
        
        const posts = await Posts.findByIdAndDelete(deleteID)
        return  res.status(200).json({mssg: "delete post", posts});
        
    }

    try {
        await cloudinary.uploader.destroy(postFiltered)
        const posts = await Posts.findByIdAndDelete(deleteID)
        res.status(200).json({mssg: "delete post", posts});
    } catch (error) {
        res.status(400).json({error})
    }
};

const likePost = async (req, res) => {
 
    const postToLikeId = req.params.id
    const likerId = req.body.id
    

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
   

   try {
    const postlike = await Posts.findByIdAndUpdate(postToUnLikeId,{ $pull:{likes: {userID: unlikerId}}})
     res.status(200).json({mssg: 'post unlike' , postlike})
   } catch (error) {
    res.status(401).json({error: error.message})
   }
};
const commentPost = async (req, res) => {
 
    const postToCommentId = req.params.id
    const {id, comment} = req.body

    // console.log(postToCommentId, commenterId)
    

   try {
    const post = await Posts.findByIdAndUpdate(postToCommentId,{ $push:{comments: {userID: id,comment: comment}}})
     res.status(200).json({mssg: 'post commented' , post})
   } catch (error) {
    res.status(401).json({error: error.message})
   }
};


module.exports = {createPost, getPosts,deletePost,likePost,unLikePost,commentPost};
