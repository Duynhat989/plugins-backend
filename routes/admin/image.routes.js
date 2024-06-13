const express = require('express')
const controler = require('../../controller/admin/images.controller')
const verifyToken = require('../../midleware/auth')
const router = express.Router()

router.post('/register',verifyToken,controler.register)
// router.post('/list',verifyToken,controler.list)
//--------------
module.exports = router;