const express = require('express');
const app = express();
const port = 8080;
const cors  = require('cors')
const connection = require('./db')
connection()

const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use(cors())
app.use(express.json()) //middle ware
app.get('/',(req,res)=>{
    res.send('welcome page')
})

app.use('/users',userRouter)
app.use('/posts',postRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})