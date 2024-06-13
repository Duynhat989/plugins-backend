const express = require('express')
const controler = require('../../controller/admin/imgbb.controller')
const verifyToken = require('../../midleware/auth')
const router = express.Router()

router.post('/register',controler.register)
router.post('/find',controler.findOne)
//--------------
module.exports = router;