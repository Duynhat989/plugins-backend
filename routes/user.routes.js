const express = require('express')
const controler = require('../controller/auth.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/login',controler.login)
router.post('/register',controler.register)
router.post('/avaliable',controler.avaliable)
router.post('/info',verifyToken,controler.info)
router.post('/changepaw',verifyToken,controler.changepassword)
//--------orther
router.post('/forgetpassword',controler.forgetpassword)// 
router.post('/changepassword',controler.changepassword_code)
router.post('/resendcode',controler.resendcode)
//--------------
module.exports = router;