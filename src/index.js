const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// Heroku ready port definition
const port = process.env.PORT || 3000

// convert request to json so it can be used in functions
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log("Server is up on port 3000"))