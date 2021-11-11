const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{type:String,required:true},
    list:[]
    

})

module.exports=mongoose.model('Pos',schema)