const express = require('express');
const router = express.Router();
const feedController = require('../Controllers/Feed.Controller');
const {
    getOptions,
    getByCategory,
    getDefaultCategory,
    getByKeyword,
    getMasterData,
    addMasterData,
    addUserFeedLog
} = feedController;

router.get('/', getOptions, getDefaultCategory);
router.post('/log', addUserFeedLog);
router.get('/:category', getOptions, getByCategory);
router.get('/masterdata', getMasterData);
router.post('/addmasterdata', addMasterData);

module.exports = router;