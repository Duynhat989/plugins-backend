const express = require('express')
const controler = require('../../controller/admin/comic.controller')
const verifyToken = require('../../midleware/auth')
const router = express.Router()

router.post('/register',verifyToken,controler.register)
router.get('/timeout',controler.comic_timeout)
//--------------
module.exports = router;