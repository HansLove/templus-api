const Cliente=require('../models/model.clientes')

control={}

control.crearCliente=async(req,res)=>{
    const nuevoCliente=new Cliente(req.body)
    await nuevoCliente.save()
    .then(docs=>{
        res.status(200).json({
            data:docs,
            status:true
        })
    })
}


control.dameCliente=async(req,res)=>{
    const _id=req.body.id
    const clienteBuscado=await Cliente.find({id:_id})
    res.status(200).json({
        data:clienteBuscado,
        status:true
    })
}
module.exports=control;