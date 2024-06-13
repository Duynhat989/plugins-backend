const express = require('express')
const controler = require('../controller/prompt.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/list',controler.list)
router.post('/find',controler.find)
// router.post('/detroy',controler.detroy)
//--------------
module.exports = router;