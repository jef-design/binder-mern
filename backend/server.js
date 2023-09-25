const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
//middlewares


app.use(express.json());
app.use(express.urlencoded({extended: true}));
<<<<<<< HEAD
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['POST','GET','DELETE','PATCH'],
    credentials: true
}))
=======
app.use(cors({
    origin: ["https://binder-mern.vercel.app"],
    credentials: true
}))

>>>>>>> 48cf4afe657d84e6207d8a49344ae202613d3ddf


app.get('/', (req, res, next) => {
    res.send('hello')
    next()
})

app.use('/api/binder', userRoutes)
app.use('/api/binder/post', postRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`Connected to DB and PORT ${PORT}`)
    })
})
.catch((error) => {
    console.log(error.message)
})


