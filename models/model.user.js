const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    hash:{type:String},
    username:{
        type:String,
        index: true,
        unique: true
            },
    img:{type:String},
    address:[],
    contacts:[],
    date:{type:Date,default:Date.now},
    password:{type:String,required:true}

})

module.exports=mongoose.model('User',schema)