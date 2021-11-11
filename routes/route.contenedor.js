const express=require('express')
const router= express.Router()
const control=require('../controller/controller.contenedor')


router.get('/:hash',control.dameContenedores)

router.get('/total/:hash',control.dameTotal)



router.post('/',control.nuevoContenedor)


module.exports=router