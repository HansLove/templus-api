const express=require('express')
const router= express.Router()
const control=require('../controller/controller.insumo')


router.get('/',control.dameInsumos)

router.get('/:hash',control.dameUnInsumo)

router.patch('/:hash',control.editarInsumo)

router.post('/',control.nuevoInsumo)


module.exports=router