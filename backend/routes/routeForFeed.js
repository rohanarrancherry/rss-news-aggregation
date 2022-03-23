const express = require('express');
const router = express.Router();

router.get('/latest', getOptions, getLatestFeed);
router('/home', getSource);
router.get('/:category', getOptions, getFeedByCategory);
router.get('/search/:keyword', getOptions, getFeedByKeyword);

module.exports = router;