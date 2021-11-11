const User=require('../models/model.user')
const sha256=require('crypto-js/sha256')
const md5=require('md5')


control={}

control.crearUser=async(req,res)=>{
    const nuevo=new User(req.body)
    await nuevo.save()
    .then(docs=>{
        res.status(200).json({
            data:docs
        })
    })
}


control.dameUsers=async(req,res)=>{
    const user_find=await User.find()
    res.status(200).json({
        data:user_find
    })
}

control.dameUserPorName=async(req,res)=>{
    const resultado=await User.find({username:req.params.username})
    res.status(200).json({
        data:resultado
    })
}

control.editarUser=async(req,res)=>{
    var filter={username:req.params.username}
    await User.updateOne(filter,req.body)
    .then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
}


control.login=async(req,res)=>{
    console.log(req.query)
    
    var status=false
    var _input=req.query.user
    var password=req.query.password
    var user=await User.find({username:_input})
    
    //var h=sha256(_input).toString()
    
    if(user[0].password==password){
        status=true
        
    }
    res.status(200).json({
        status:status,
        user:user[0]
        
    })
}


control.editarContacto=async(req,res)=>{
    const _usuario=await User.find({username:req.params.username})
    var contactos_usuario=_usuario.contacts
    let _id=req.params.id
    var new_list=[]
    for (let index = 0; index < contactos_usuario.length; index++) {
        const element = contactos_usuario[index];

        new_list.push(element)
        
    }
    var filtro={username:req.params.username}

    await User.updateOne(filtro,req.body,{contacts:new_list})
    .then(a=>{
        res.status(200).json({
            status:true,
            data:a
        })
    })
}

control.agregarContacto=async(req,res)=>{
    const _usuario=await User.find({username:req.params.username})
    var contactos_usuario=_usuario[0].contacts  

    var _objeto_contacto=req.body
    contactos_usuario.push(_objeto_contacto)  
    

    var filtro={username:req.params.username}

    await User.updateOne(filtro,{contacts:contactos_usuario})
    .then(a=>{
        res.status(200).json({
            status:true,
            data:a
        })
    })
}

control.dameContacto=async(req,res)=>{
    const _usuario=await User.find({username:req.params.username})
    var contactos_usuario=_usuario[0].contacts 
    res.status(200).json({
        status:true,
        data:contactos_usuario
    })


}


module.exports=control;