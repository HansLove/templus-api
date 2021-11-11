const Pedido=require('../models/model.pedidos')
const metodosPedido={}
const sha256=require('crypto-js/sha256')

metodosPedido.dameOrdenada=async()=>{
    const pedidos=await Pedido.find()
    const ordenada=pedidos.sort((a,b)=>(a.date>b.date)?1:-1)
    return ordenada
}

module.exports=metodosPedido