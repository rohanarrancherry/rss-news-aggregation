const express = require('express');
const router = express.Router();
const feedController = require('../Controllers/Feed.Controller');
const { getOptions, getByCategory, getDefaultCategory, getByKeyword, getMasterData,addMasterData } = feedController;

router.get('/', getOptions, getDefaultCategory);
router.get('/:category', getOptions, getByCategory);
router.get('/search/:keyword', getOptions, getByKeyword);
router.get('/masterdata', getMasterData);
router.post('/addmasterdata', addMasterData);

module.exports = router;