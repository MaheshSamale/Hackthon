const express = require('express')
const cors = require('cors')

const userRouter = require('./router/user')
const blogsRouter = require('./router/blogs')
const categoryRouter = require('./router/categories')
const pool = require('./utils/db')

const app = express()



app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.get('/test-db', async (req, res) => {
    try {
        // Since you're using /promise in your db.js, we use await
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({
            status: 'success',
            message: 'Database connected successfully!',
            data: rows[0]
        });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Failed to connect to database',
            error: err.message
        });
    }
});

app.use('/user',userRouter)
app.use('/blogs',blogsRouter)
app.use('/category',categoryRouter)

 const port = 4000
app.listen(port ,'0.0.0.0',()=>{
    console.log(`server is running`)
})
