const mongoose=require('mongoose')

const clienteSchema=mongoose.Schema({
    latitud:{type:Number,required:true},
    longitud:{type:Number,required:true},
    nombre:{type:String}
})

module.exports=mongoose.model('Cliente',clienteSchema)