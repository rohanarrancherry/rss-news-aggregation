const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const {verifyAccessToken} = require('./helpers/jwt_helper')

const AuthRoute = require('./Routes/Auth.route')
const FeedRoute = require('./Routes/Feed.route')
const UserRoute = require('./Routes/User.route')

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', AuthRoute)
app.use('/api/feeds', FeedRoute)
app.use('/api/user', UserRoute)
app.use('/api/editor', UserRoute)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
