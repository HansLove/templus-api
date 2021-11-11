const Negocio=require('../models/model.negocio')
const sha256=require('crypto-js/sha256')


control={}

control.crearNegocio=async(req,res)=>{
    var x=await req.body.name+req.body.username+req.body.secret
    var _hash=sha256(x).toString()
    var _objetoFinal=Object.assign(req.body, {hash:_hash})
    const nuevo=new Negocio(_objetoFinal)
    await nuevo.save()
    .then(docs=>{
        res.status(200).json({
            data:docs,
            status:true
        })
    })
}

control.dameNegocios=async(req,res)=>{
    const negs=await Negocio.find()
    res.status(200).json({
        data:negs
    })
}

control.dameNegocioByName=async(req,res)=>{
    const neg=await Negocio.find({hash:req.params.hash})
    res.status(200).json({
        data:neg
    })
}
control.dameHash=async(req,res)=>{
    const negs=await Negocio.find()
    var lista=[]
    for(let i=0;i<negs.length;i++){
        const _input=negs[i].toString()
        const hashCon=sha256(_input).toString()
        var objeto={
            negocio:negs[i],
            hash:hashCon
        }
        lista.push(objeto)
    }
    res.status(200).json({
        data:lista
    }) 
    
}

control.login=async(req,res)=>{
    
    var status=false
    var _input=req.query.user
    var password=req.query.password
    var user=await Negocio.find({username:_input})
   
    if(user[0].secret==password){
        status=true
    }else{
        user={}
    }

    res.status(200).json({
        user:user,
        status:status
        
    })
}

control.editarNegocio=async(req,res)=>{
    var filter={hash:req.params.hash}
    await Negocio.updateOne(filter,req.body)
    .then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
}


control.dameAverage=async(req,res)=>{
    const neg=await Negocio.find({hash:req.params.hash})
    var menu=await neg[0].menu

    var objeto={}

    for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if(element.hash==req.params.product){
            //retortar el promedio: 
            objeto=element.average
            
            break
        }
        
    }
    
    res.status(200).json({
        data:objeto
    })
}

control.precioProducto=async(req,res)=>{
    const neg=await Negocio.find({hash:req.params.hash})
    var menu=await neg[0].menu

    var objeto={}

    for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if(element.hash==req.params.product){
            //retortar el promedio: 
            objeto=element.price
            
            break
        }
        
    }
    
    res.status(200).json({
        data:objeto
    })
}

control.modificarMenu=async(req,res)=>{
    const neg=await Negocio.find({hash:req.params.hash})
    var menu=await neg[0].menu
    var newList=[]
    const num=req.params.num
    const _hash_producto=req.params.product
    
    for (let index = 0; index < menu.length; index++) {
        const element = menu[index]
        if(element.hash==_hash_producto) element.average.int=num
        newList.push(element)
        
    }
    var data_final=await Negocio.updateOne({hash:req.params.hash},{
        menu:newList
    })

    res.status(200).json({
        data:data_final
    })
}
 


module.exports=control