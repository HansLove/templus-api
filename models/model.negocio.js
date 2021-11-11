const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true},
    hash:{type:String,required:true},
    owners:[],
    address:[],
    provider:[],
    menu:[],
    section:[],
    containers:[],
    username:{type:String,required:true,unique:true},
    img:[],
    secret:{type:String,required:true}
})

module.exports=mongoose.model('Negocio',schema)