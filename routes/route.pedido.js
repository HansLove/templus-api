const express=require('express')
const router=express.Router()
const controller = require('../controller/controller.pedidos')

//Rutas Get
router.get('/',controller.damePedidos)
router.get('/:hash',controller.damePedidosUser)


router.post('/',controller.crearPedido)


router.delete('/:id',controller.borrarPedido)

module.exports=router