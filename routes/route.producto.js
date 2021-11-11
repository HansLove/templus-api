const express=require('express')
const router= express.Router()
const control=require('../controller/controller.producto')


router.get('/',control.dameProductos)

router.get('/:hash',control.dameMiProducto)

router.post('/',control.nuevoProducto)

router.patch('/:hash',control.editarProductoByHash)



module.exports=router