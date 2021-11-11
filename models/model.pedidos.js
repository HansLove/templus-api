const mongoose=require('mongoose')

const pedidoSchema=mongoose.Schema({
    sender:{type:String,required:true},
    senderHash:{type:String,required:true},
    senderAddress:{type:String},
    tokenContract:{type:String},
    event:{type:Object,required:true},
    contractId:{type:String},
    receiver:{type:String,required:true},//Address del dueño 
    receiverHash:{type:String},
    amount:{type:String,required:true},
    timelock:{type:String,required:true},

    order:[],
    
    
    
   


})

module.exports=mongoose.model('Pedido',pedidoSchema)