const express = require('express')
const controler = require('../controller/admin/comic.controller')
const router = express.Router()


router.post('/view',controler.findOne)
router.post('/list',controler.list)
//--------------
module.exports = router;