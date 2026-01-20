const express = require('express')
const cors = require('cors')

const userRouter = require('./router/user')
const blogsRouter = require('./router/blogs')
const categoryRouter = require('./router/categories')
const authorizeUser = require('./utils/authuser')
const pool = require('./utils/db')

const app = express()



app.use(cors())
app.use(express.json())
app.use(authorizeUser) 
app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.use('/user',userRouter)
app.use('/blogs',blogsRouter)
app.use('/category',categoryRouter)

 const port = 4000
app.listen(port ,'0.0.0.0',()=>{
    console.log(`server is running`)
})