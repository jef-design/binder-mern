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
app.use(cookieParser())
app.use(cors({
    origin: ["https://binder-mern.vercel.app"],
    methods: ['POST','GET','DELETE','PATCH'],
    credentials: true
}))

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


