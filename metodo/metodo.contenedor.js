const Contenedor=require('../models/model.contenedor')
const sha256=require('crypto-js/sha256')

const metodos={}

//Metodo utilizado para 
//el average se asume esta en dias.
metodos.CalcularProbabilidadVida=async(future,current,average,int)=>{
    //int: integer de la cantidad de insumo en el contenedor
    //unidad: la unidad en la que esta expresada la cantidad del contenedor

    var x=future.getTime()-current.getTime()
    var y=future.getTime()-Date.now()

    var dias_totales=x/(1000*60*60*24)

    var dias_restantes=y/(1000*60*60*24)
    

    if(average.unit!='kg'){
        convertidor(average)
     }
     
    if(dias_restantes<0)return[0,0]
     var diasNecesarios=int/average.int
     
     if(diasNecesarios<dias_restantes){
         //Existe una probabilidad del 100% que se vendera esto
         return[diasNecesarios,100]
     }else{
        
        var consumo_maximo=dias_restantes*average.int
        var final=(consumo_maximo*100)/int

        return [diasNecesarios,final]

     }
    
    
}

function convertidor(_average){
    //Es necesario transformar la unidad de medida a kg
    
    if(_average.unit=='g'){
        _average.int=_average.int/1000
    }
    if(_average.unit=='mg'){
        _average.int=_average.int/1000000
    }
    if(_average.unit=='ml'){
        //A litros
        _average.int=_average.int/1000
    }

}


// metodos.tiempoVida=async(future,current)=>{
//     var x=future.getTime()-current.getTime()
//     var y=future.getTime()-Date.now()

//     var dias_totales=x/(1000*60*60*24)

//     var dias_restantes=y/(1000*60*60*24)
//     var resultado=(dias_restantes*100)/dias_totales
//     return resultado

// }

module.exports= metodos;