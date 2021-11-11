const { CalcularProbabilidadVida } = require('../metodo/metodo.contenedor')
const metodosPedido = require('../metodo/metodo.pedidos')
const { dameProducto, damePromedio, sumarTotal } = require('../metodo/metodo.producto')
const Contenedor=require('../models/model.contenedor')


control={}

control.dameContenedores=async(req,res)=>{
    const _objeto={}
    var days={}
    var final_list=[]
    
    const contenedores=await Contenedor.find({hash:req.params.hash})

    for (let index = 0; index < contenedores.length; index++) {
        var CONTENEDOR=contenedores[index]
        var _int=contenedores[index].amount.int
        var _unit=contenedores[index].amount.unit
        var _hashProducto=contenedores[index].amount.hash
        
        // var _producto_contenedor=await dameProducto(_hashProducto)
        var future=new Date(CONTENEDOR.end)
        var current=new Date(CONTENEDOR.start)
        
        
        //Calcular average porque sera necesario en el futuro
        //para 'CalcularProbabildidadVida'
        var _promedio=await damePromedio(CONTENEDOR.hash,
            _hashProducto,_unit)

        //Si no existe un registo de un contenedor con ese producto,
        //lo iniciamos en 0
        if(days[_hashProducto]==undefined)days[_hashProducto]=0

        var proba=await CalcularProbabilidadVida(future,
            current,_promedio,
            _int)
        
        var add_days=proba[0]
        var _esperanza=proba[1]
        days[_hashProducto]=days[_hashProducto]+add_days

        CONTENEDOR.chance=_esperanza
        
        final_list.push(CONTENEDOR)
        
        //Esta funcion se encarga de ir sumando el total de los productos.
        sumarTotal(_objeto,_hashProducto,_int)
        
    }

    
    res.status(200).json({
        "data":final_list,
        "objeto":_objeto
    })
}

control.dameTotal=async(req,res)=>{
    const _objeto={}
    var _lista=[]
    
    const contenedores=await Contenedor.find({hash:req.params.hash})
    for (let index = 0; index < contenedores.length; index++) {
        var _int=contenedores[index].amount.int
        var _unit=contenedores[index].amount.unit
        var _hashProducto=contenedores[index].amount.hash

        var thing={int:_int,unit:_unit,hash:_hashProducto}

        function checar(){
            for (let index = 0; index < _lista.length; index++) {
                const element = _lista[index].hash;
                if(element===_hashProducto)return true
                
            } 
            return false
        }

        var resu=checar()
        if(!resu){
             _lista.push(thing)
        }
    
    }
    res.status(200).json({
        
        "list":_lista
    })
}


control.nuevoContenedor=async(req,res)=>{
    const nuevoContenedor=new Contenedor(req.body)
    await nuevoContenedor
    .save()
    .then(docs=>{
        console.log("Exito, contenedor guardado",docs)
        res.json({
            data:docs,
            status:true
        })
    }).catch(err=>{
        res.status(400).json({
            error:err,
            status:"Contenor save fail"
        })
    })
}


module.exports=control