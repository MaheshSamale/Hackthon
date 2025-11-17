const express = require('express')
const cors = require('cors')

const userRouter = require('./router/user')
const authorizeUser = require('./utils/authuser')
const pool = require('./utils/db')

const app = express()



app.use(cors())
app.use(express.json())
app.use(authorizeUser) 
app.get('/',(req,res)=>{
    res.send('Hello from server')
})
console.log('hi')
app.use('/user',userRouter)

const port = 4000
app.listen(port , 'localhost',()=>{
    console.log(`server is running on ${port}`)
})