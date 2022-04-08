const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller');
const {getUserCategories} = userController

router.get('/categories', getUserCategories);


module.exports = router;