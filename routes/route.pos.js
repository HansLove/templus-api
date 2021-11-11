const express=require('express')
const router= express.Router()
const control=require('../controller/controller.pos')


router.get('/:account',control.damePos)

router.get('/:name',control.dameMiPos)

router.post('/',control.nuevaPos)


module.exports=router