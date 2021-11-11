const Producto=require('../models/model.producto')
const Negocio=require('../models/model.negocio')
const metodos={}
//const sha256=require('crypto-js/sha256')

metodos.dameProducto=async(_hash)=>{
    const producto=await Producto.find({hash:_hash})
    return producto
}

metodos.damePromedio=async(hashNegocio,hashProducto)=>{
    const neg=await Negocio.find({hash:hashNegocio})
    var menu=await neg[0].menu

    var objeto={}
    for (let index = 0; index < menu.length; index++) {
        const element = menu[index];
        if(element.hash==hashProducto){
            //retortar el promedio: 
            objeto=element.average
            break
        }
        
    }
    return objeto
}

metodos.sumarTotal=async(_objeto,_hashProducto,_int,_unit)=>{
    //Es la primera entrada de este insumo en la lista
    //inicializar un objeto
    if(_objeto[_hashProducto]==undefined) _objeto[_hashProducto]={int:0,unit:'unit'}
    
    _objeto[_hashProducto]={
        int:_objeto[_hashProducto].int+parseInt(_int),
        unidad:_unit
    }
}

module.exports=metodos