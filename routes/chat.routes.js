const express = require('express')
const controler = require('../controller/chat.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/conversation',verifyToken,controler.conversation)
router.post('/find',verifyToken,controler.find)
router.post('/list',verifyToken,controler.list)
// router.post('/detroy',controler.detroy)
//--------------
module.exports = router;