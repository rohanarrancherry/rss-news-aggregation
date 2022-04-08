const express = require('express');
const router = express.Router();
const feedController = require('../Controllers/Feed.Controller');
const { getOptions, getByCategory, getDefaultCategory, getByKeyword } = feedController;

router.get('/', getOptions, getDefaultCategory);
router.get('/:category', getOptions, getByCategory);
router.get('/search/:keyword', getOptions, getByKeyword);

module.exports = router;