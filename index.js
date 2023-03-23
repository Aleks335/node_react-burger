const express = require('express'), bodyParser = require('body-parser');
const {validateTokenMiddleware} = require('./middlewares');
const {signIn,signUp,private, ingredients, addOrder, getOrders} = require('./requestHandlers')
const app = express()
var cors = require('cors')



app.use(cors())
app.use(bodyParser.json());

app.get('/ingredients', ingredients)
app.get('/orders', validateTokenMiddleware, getOrders)
app.post('/order', validateTokenMiddleware, addOrder)

app.post('/signin', signIn)
app.post('/signup', signUp)
app.get('/private', validateTokenMiddleware, private)
app.listen(3035, () => {
  console.log('server started');
})




// app.get('/test1',(req,res)=>{
//     console.log('ping');
// })
// app.get('/test2',firstMiddleware, (req,res)=>{
//     console.log('ping2');
// })
// app.listen(3000,()=>{
//     console.log('server started');
// },)