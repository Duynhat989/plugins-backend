const express = require('express')
const controler = require('../controller/setup.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/register',verifyToken,controler.register)
router.post('/list',verifyToken,controler.list)
router.post('/find',controler.find)
//--------------
module.exports = router;