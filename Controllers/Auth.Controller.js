const createError = require('http-errors')
const User = require('../Models/User.model')
const {
    signAccessToken,
} = require('../helpers/jwt_helper')
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res, next) => {
        try {
            const result = req.body
            if (!result.email || !result.password) throw createError.BadRequest()
            const doesExist = await User.findOne({email: result.email})
            if (doesExist)
                return res
                    .status(409)
                    .send({message: "User with given email already Exist!"});
            const user = new User(result)
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id, savedUser.email, savedUser.role)
            res.send({accessToken})
        } catch (error) {
            res.status(500).send({message: "Internal Server Error"});
        }
    },

    login: async (req, res, next) => {
        try {
            const result = req.body
            const user = await User.findOne({email: result.email})
            if (!user)
                return res.status(401).send({message: "Invalid Email or Password"});
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
                return res.status(401).send({message: "Invalid Email or Password"});
            const accessToken = await signAccessToken(user.id, user.email, user.role)
            res.send({accessToken, "role": user.role})
        } catch (error) {
            console.log(error)
            if (error.isJoi === true)
                return res.status(401).send({message: "Invalid Email or Password"});
        }
    },

    role: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const bearerToken = authHeader.split(' ')
            const token = bearerToken[1]
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            res.send({"role": payload.role})
        } catch (error) {
            res.send(error)
        }
    },
}
