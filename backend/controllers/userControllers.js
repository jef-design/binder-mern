const dotenv = require('dotenv')
dotenv.config()
const Posts = require('../models/postsModels');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const getDataUri = require('../utils/dataUri');

// Access Token
const generateToken = (res, _id) => {
  // const jwtExpires = 900;
  // const jwtRefreshExpires = 86400;
  const jwtExpires = '5m';
  const jwtRefreshExpires = 86400;
  const accToken = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: jwtExpires,
  });

  const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: jwtRefreshExpires,
  });

  const cookieExpires = jwtRefreshExpires * 1000;
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === 'production' ? true : false,
    sameSite: process.env.NODE_ENVIRONMENT === 'production' ? 'none' : 'strict',
    maxAge: cookieExpires,
  });
 
  return {accToken, refreshToken};
};

const refreshTokenRoute = async (req, res) => {
  const authToken = req.cookies.jwt;

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded._id);
    // req.user - user

    if (!user) {
      throw new Error('User not found');
    }
    
    const { accToken, refreshToken } = generateToken(
      res,
      user._id
    );

    res.json({ accToken, refreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    generateToken(res, user._id);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profile_image: user.profile_image.url,
      status: true,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


const signUpUser = async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    const user = await User.signup(username, name, email, password);
    const { accessToken, refreshToken } = generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profile_image: user.profile_image.url,
      status: false,

    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


const logOutUser = async (req, res) => {
  // console.log(req.body)
const {_id} = req.body

  const statusUser = await User.findByIdAndUpdate(_id, {
    status: false
   },
   { new: true }
 ).select('status')
   console.log(statusUser)
  res.cookie('jwt', '', {
    httpOnly: true,
    maxAge: new Date(1),
  });
  res.status(200).json({ message: 'user logged out', statusUser });
};

const getUserDetails = async (req, res) => {
  const _id = req.params.id;
  const user = await User.find({ _id }).populate({
    path: 'follower.userID',
    select: ['name', 'profile_image.url', 'username', 'status'],
  })
  res.status(200).json({ message: 'Get user', user });
};

const upDateUser = async (req, res) => {
 
  const userId = req.params.id;
  const { username, name, email, bio } = req.body;
  const file = req.file;

  if (!file) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        name: name,
        email: email,
        bio: bio,
        status: true
      },
      { new: true }
    );
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profile_image: user.profile_image.url,
    });
  }

  try {
    const fileUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(fileUri.content, {
      folder: 'profile-picture',
      resource_type: 'auto',
    });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        name: name,
        email: email,
        bio: bio,
        profile_image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profile_image: user.profile_image.url,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const userTodelete = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userTodelete);
    res.status(200).json({ mssg: 'success delete', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const followUser = async (req, res) => {
  const userTofollowId = req.params.id;
  const followerId = req.body.id;

  try {
    const user = await User.findByIdAndUpdate(userTofollowId, {
      $push: { follower: { userID: followerId } },
    });
    res.status(200).json({ mssg: 'success', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const UnfollowUser = async (req, res) => {
  const userTofollowId = req.params.id;
  const followerId = req.body.id;

  try {
    const user = await User.findByIdAndUpdate(userTofollowId, {
      $pull: { follower: { userID: followerId } },
    });
    res.status(200).json({ mssg: 'unfollow', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getUserPost = async (req, res) => {
  const user = req.params.id;

  const posts = await Posts.find({ userID: user })
    .sort({ createdAt: -1 })
    .populate({
      path: 'userID',
      select: ['name', 'profile_image.url'], // Specify the fields you want to select from the user's profile_image
    })
    .populate({
      path: 'comments.userID',
      select: ['name', 'profile_image.url'],
    });

  res.status(200).json({ mssg: 'get user post', posts });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json({ mssg: 'get all user', users });
};

const searchBinder = async (req, res) => {
  console.log(req.query);
  const { term } = req.query;

  try {
   
    //const search = await User.searchQuery(term)
    const search = await User.find({ name: { $regex: `^${term}`, $options: 'i' } })
    // const search = await User.find({ $text: { $search: term } }).select('name username profile_image.url')
    console.log('search', search)

    res.status(200).json(search);
  } catch (error) {}
};

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
  searchBinder,
  getUserDetails,
  upDateUser,
  followUser,
  UnfollowUser,
  deleteUser,
  getUserPost,
  getUsers,
  refreshTokenRoute
  
};
