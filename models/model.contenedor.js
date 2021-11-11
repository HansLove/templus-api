const mongoose=require('mongoose')

const schema=mongoose.Schema({
    hash:{type:String,required:true},//A quien le pertenece
    start:{type:String,required:true},
    end:{type:String,required:true},
    amount:{type:Object,required:true},
    chance:{type:Number, default:0},

})

module.exports=mongoose.model('Contenedor',schema)