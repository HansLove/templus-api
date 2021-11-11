const Producto=require('../models/model.producto')
const sha256=require('crypto-js/sha256')



control={}

control.dameProductos=async(req,res)=>{
    const produtos=await Producto.find()
    res.status(200).json({
        "data":produtos
    })
}

control.nuevoProducto=async(req,res)=>{
    var x=await req.body.name+req.body.section[0]
    var _hash=sha256(x).toString()
    var _obj=Object.assign(req.body, {hash:_hash})
    const nuevoP=new Producto(_obj)
    await nuevoP
    .save()
    .then(docs=>{
        res.json({
            data:docs
        })
    }).catch(err=>{
        res.status(400).json({
            error:err,
            status:"Producto save fail"
        })
    })
}





control.dameMiProducto=async(req,res)=>{
    const resultado=await Producto.find({hash:req.params.hash})
    res.status(200).json({
        data:resultado
    })
}


control.borrarProducto=async(req,res)=>{
    await Producto.findByIdAndRemove(req.params.id)
    res.status(200).json({
        data:"Product delete",
        id:req.params.id
    })
}

//Patch
control.editarProducto=async(req,res)=>{
    
    Producto.findByIdAndUpdate(req.params.id,req.body)
    
    .then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
}

control.editarProductoByHash=async(req,res)=>{
    Producto.findOneAndUpdate({hash:req.params.hash},req.body)
    
    .then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
}

module.exports=control