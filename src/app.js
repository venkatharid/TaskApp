const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/userrouter')
const taskRouter = require('./routers/taskRouter')

const app = express();

const port = process.env.port || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () =>{
    console.log("connectined to port "+port)
})