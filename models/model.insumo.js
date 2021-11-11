const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true},
    hash:{type:String,required:true},
    life:{type:Object},
    item:[],
    img:[]

})

module.exports=mongoose.model('Insumo',schema)