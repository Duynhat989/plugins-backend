const express = require('express')
const controler = require('../controller/admin/imgbb.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.get('/show',controler.show)
router.get('/avata',controler.showAvata)
//--------------
module.exports = router;