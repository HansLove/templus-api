//const Contenedor=require('../models/model.contenedor')
const Pedido=require('../models/model.pedidos')
const sha256=require('crypto-js/sha256')

control={}


control.damePedidos=async(req,res)=>{
    const pedidos=await Pedido.find()
    res.status(200).json({
        data:pedidos,
        status:true
    })
}

control.pedidosOrdenada=async(req,res)=>{
    const pedidos=await Pedido.find()
    const orden=pedidos.sort((a,b)=>(a.date>b.date)?1:-1)
    res.status(200).json({
        data:orden
    })
}


control.damePedidosUser=async(req,res)=>{
    const pedidos=await Pedido.find({receiver:req.params.hash})
    
    res.status(200).json({
        data:pedidos,
        status:true
    })
}


control.crearPedido=async(req,res)=>{
    const pedido=new Pedido(req.body)
    await pedido.save()
    .then(doc=>{
        res.status(200).json({
            data:doc,
            status:true
        })
    })
}



control.borrarPedido=async(req,res)=>{
    await Pedido.findByIdAndRemove(req.params.id)
    res.status(200).json({
        data:"pedido eliminado",
        status:true
    })
}
module.exports=control;