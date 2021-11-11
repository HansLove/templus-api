const Pos=require('../models/model.pos')
const sha256=require('crypto-js/sha256')
const Web3 =require( 'web3')
const ContractHashJSON =require( '../build/HashTime.json')
const TemplusJSON =require( '../build/Templus.json')

const web3 = new Web3("http://localhost:8545"||Web3.givenProvider)





control={}




control.damePos=async(req,res)=>{
    
    // const pos=await Pos.find()
    var _cuenta=req.params.account
    var _balance=0
    
    const id=await web3.eth.net.getId()
    const deployedNetwork=TemplusJSON.networks[id]
    
    const contrato_templus=new web3.eth.Contract(
        TemplusJSON.abi,
        deployedNetwork.address
        )

    try {

        _balance=await contrato_templus.methods.balanceOf(_cuenta).call()
        
    } catch (error) {
        console.log("Error en proveedor nuevo contrato hash: ",error)
    }
        

    res.status(200).json({
        "data":contrato_templus,
        "balance":_balance
    })
}

control.nuevaPos=async(req,res)=>{
    const nuevoP=new Pos(req.body)
    await nuevoP
    .save()
    .then(docs=>{
        res.json({
            data:docs
        })
    }).catch(err=>{
        res.status(400).json({
            error:err,
            status:"pos save fail"
        })
    })
}



control.dameMiPos=async(req,res)=>{
    const pos=await Pos.find({name:req.params.name})
    res.status(200).json({
        "data":pos
    })
}
   

control.editarPos=(req,res)=>{
    const props=req.body
    const id=req.body.productId

    Pos.updateOne({_id:id},props)
    .then(result=>{
        console.log("Pos actualziada: ",result)
    })
}

module.exports=control