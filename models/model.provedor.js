const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true},
    hash:{type:String},
    username:{type:String,required:true},
    address:[],
    img:{type:String},
    nature:[],
    item:[]
})

module.exports=mongoose.model('Provedor',schema)