const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller');
const {getUserCategories} = userController
const {addChanneltoEditorList} = userController
const {getEditorChannelList} = userController
const {updateChannelDetails, deleteChannel} = userController

router.get('/categories', getUserCategories);
router.post('/addchannel', addChanneltoEditorList);
router.get('/channellist', getEditorChannelList);
router.patch('/channel', updateChannelDetails);
router.delete('/channel/:id', deleteChannel);


module.exports = router;