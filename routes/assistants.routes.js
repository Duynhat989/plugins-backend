const express = require('express')
const controler = require('../controller/assistants.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/setup',controler.createOrUpdateContentAssistant)
router.post('/start',controler.start)
router.post('/chat',controler.chat)
// router.post('/detroy',controler.detroy)
//--------------
module.exports = router;