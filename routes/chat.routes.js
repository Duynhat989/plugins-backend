const express = require('express')
const controler = require('../controller/chat.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/conversation',controler.conversation)
router.post('/find',controler.find)
router.post('/list',controler.list)
router.post('/assistants',controler.assistants)
// router.post('/detroy',controler.detroy)
//--------------
module.exports = router;