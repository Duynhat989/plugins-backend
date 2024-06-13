const express = require('express')
const controler = require('../controller/token.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/audio',controler.audio)
router.post('/add_token',controler.conversation)
router.post('/find',controler.find)
router.post('/speech',controler.speech)
// router.post('/list'.controler.list)
// router.post('/detroy',controler.detroy)
//--------------
module.exports = router;