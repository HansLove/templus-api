const express=require('express')
const router=express.Router()
const control=require('../controller/controller.proveedor')


router.get('/:id',control.dameProv)
router.get('/hash/:hash',control.dameProvHash)


router.get('/',control.dameProveedores)

router.post('/',control.crearProveedor)

router.patch('/:id',control.editarProveedor)
module.exports=router;