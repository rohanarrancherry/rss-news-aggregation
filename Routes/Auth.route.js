const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', AuthController.register)

router.get('/user/role', AuthController.role)

router.post('/login', AuthController.login)

module.exports = router
