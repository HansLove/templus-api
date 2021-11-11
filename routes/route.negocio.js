const express=require('express')
const router= express.Router()
const control=require('../controller/controller.negocio')


router.get('/login',control.login)
router.get('/',control.dameNegocios)
router.get('/:hash',control.dameNegocioByName)//Buscar negocio por nombre
router.post('/',control.crearNegocio)

//Edicion
router.patch('/:hash',control.editarNegocio)

//Entregar promedio de venta
//hash del negocio
//product: hash del productp en cuesiton
router.get('/average/:hash/:product',control.dameAverage)
router.get('/price/:hash/:product',control.precioProducto)


//modificar promedio diario de un producto en el menu de un negocio
//hash: id del negocio
router.patch('/menu/:hash/:product/:num',control.modificarMenu)



module.exports=router