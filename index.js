const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
var cors = require('cors')


const{mongoose}=require('./database')

app.use(morgan('dev'))
app.use(cors())

app.set('port',5000)

const contenedorRotes=require('./routes/route.contenedor')
const pedidosRoutes=require('./routes/route.pedido')
const clienteRoutes=require('./routes/route.cliente')
const negocioRoutes=require('./routes/route.negocio')
const insumoRoutes=require('./routes/route.insumo')
const productoRoutes=require('./routes/route.producto.js')
const posRoutes=require('./routes/route.pos.js')
const proveedorRoutes=require('./routes/route.proveedor.js')
const userRoutes=require('./routes/route.user.js')







//app.use(bodyParser.json({limit: '10000000mb', extended: true})); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10000000mb'})); 
app.use(express.static('./lib/views/'));
app.use(express.json())

app.use('/conte',contenedorRotes)
app.use('/pedido',pedidosRoutes)
app.use('/cliente',clienteRoutes)
app.use('/negocio',negocioRoutes)
app.use('/insumo',insumoRoutes)
app.use('/producto',productoRoutes)
app.use('/pos',posRoutes)
app.use('/prov',proveedorRoutes)
app.use('/user',userRoutes)




app.use((req,res,next)=>{
    //res.header('Access-Control-Allow-Origin','*')
    //res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept,Authorization')

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.listen(app.get('port'),()=>{
    console.log("Servidor en puerto: ",app.get('port'))
})