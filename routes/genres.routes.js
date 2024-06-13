const express = require('express')
const controler = require('../controller/genres.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/register',verifyToken,controler.register)
router.post('/list',controler.list)
router.post('/detroy',verifyToken,controler.detroy)
//--------------
module.exports = router;