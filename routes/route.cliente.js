const express=require('express')
const router=express.Router()
const control=require('../controller/controller.clientes')

router.get('/',control.dameCliente)

module.exports=router;