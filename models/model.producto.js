const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true,unique:true},
    hash:{type:String,required:true},
    section:[],
    item:[],
    img:[],
    life:{type:Object,required:true}
    

})

module.exports=mongoose.model('Producto',schema)