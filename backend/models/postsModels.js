const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const postSchema = new Schema({
    userID: {
        type: String,
        required: false,
        ref: 'User'
    },
    // userPicture: {
    //     type: String,
    //     ref: 'User'
    // },
    userName: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false,
    },
    image: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    likes: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            
          }
    }],
    comments: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          comment: {
            type: String,
            ref: 'User'
          }
    }],
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)