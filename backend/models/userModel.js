const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema 

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_image: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    password: {
        type: String,
        required: true
    },
    follower: [{
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
              }
        }],
    following: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        
    },
    status: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
// userSchema.index({name: 'text'});

userSchema.statics.searchQuery = async function (term) {
    const regex = new RegExp(term, 'i'); // Case-insensitive regex pattern

    return this.find({
        $or: [
            { name: regex },       // Search by name
            { username: regex },   // Search by username
        ],
    }).select('name username profile_image.public_id profile_image.url');
};

userSchema.statics.signup = async function(username,name,email, password) {
    const userexist = await this.findOne({email})
    
    if(!username || !name || !email || !password){
        throw Error('All fields must be filled')
    }

    if(userexist){
        throw Error('User exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return await this.create({username,name, email, password: hash})
}
userSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    
  
    if(!user){
        throw Error('Wrong email or password')
    }
    const match = await bcrypt.compare(password, user.password)
    const stt = await this.findOneAndUpdate(user._id, {
       status: true
      },
      { new: true }
    )


    if(!match){
        throw Error('Incorrect password')
    }
    return user
    
}

module.exports = mongoose.model('User', userSchema)