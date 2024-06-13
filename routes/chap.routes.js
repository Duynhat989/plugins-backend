const express = require('express')
const controler = require('../controller/admin/chap.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

// router.post('/register',verifyToken,controler.register)
router.post('/view',controler.findOne)
//--------------
module.exports = router;