const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller');
const {getUserCategories} = userController
const {addChanneltoEditorList} = userController
const {getEditorChannelList} = userController
const {updateChannelDetails} = userController

router.get('/categories', getUserCategories);
router.post('/editor/addchannel', addChanneltoEditorList);
router.get('/editor/channellist', getEditorChannelList);
router.patch('/editor/channel', updateChannelDetails);


module.exports = router;