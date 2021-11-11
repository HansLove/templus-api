const Prov=require('../models/model.provedor')
const sha256=require( 'crypto-js/sha256')


control={}

control.crearProveedor=async(req,res)=>{
    const nuevo=new Prov(req.body)
    await nuevo.save()
    .then(docs=>{
        
        res.status(200).json({
            
            data:docs
        })
    })
}


control.dameProveedores=async(req,res)=>{
    
    const provBuscado=await Prov.find()
    res.status(200).json({
        data:provBuscado,
        status:true
    })
}

control.dameProv=async(req,res)=>{
    const resultado=await Prov.findById(req.params.id)
    res.status(200).json({
        data:resultado
    })
}

control.dameProvHash=async(req,res)=>{
    const resultado=await Prov.find({hash:req.params.hash})
    res.status(200).json({
        data:resultado
    })
}

control.editarProveedor=async(req,res)=>{
    await Prov.findByIdAndUpdate(req.params.id,req.body)
    .then(result=>{
        
        res.status(200).json({
            
            new:result,
            status:true
        })
    })
}
module.exports=control;