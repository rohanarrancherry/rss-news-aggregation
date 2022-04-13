const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller');
const {getUserCategories} = userController
const {addChanneltoEditorList} = userController
const {getEditorChannelList} = userController
const {updateChannelDetails} = userController

router.get('/categories', getUserCategories);
router.post('/:eId/addchannel', addChanneltoEditorList);
router.get('/:eId/channellist', getEditorChannelList);
router.patch('/:eId/channel', updateChannelDetails);


module.exports = router;