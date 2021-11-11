const Insumo=require('../models/model.insumo')
const sha256=require('crypto-js/sha256')



control={}

control.nuevoInsumo=async(req,res)=>{
    var _hash=sha256(req.body+req.body.name).toString()
    var _obj=Object.assign(req.body, {hash:_hash});
    const nuevo=new Insumo(_obj)
    
    await nuevo.save()
    .then(docs=>{
        res.json({
            "data":docs
        })
    })
}

control.dameInsumos=async(req,res)=>{
    const respuesta=await Insumo.find()
    res.status(200).json({
        data:respuesta
    })
}

control.dameUnInsumo=async(req,res)=>{
    const respuesta=await Insumo.find({hash:req.params.hash})
    res.status(200).json({
        data:respuesta
    })
}

control.editarInsumo=async(req,res)=>{
    
    var _obj=Object.assign(req.body, {hash:_hash});
    await Insumo.findByIdAndUpdate(req.params.hash,_obj).then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
    //await Producto.updateOne(filter,req.body)
    
   
    
}

module.exports=control