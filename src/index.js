const express = require('express')
require('./db/mongoose')
const User = require('./models/users')
const Task = require('./models/tasks')
const userRouter = require('./routers/user')

const app = express()
// Heroku ready port definition
const port = process.env.PORT || 3000

// convert request to json so it can be used in functions
app.use(express.json())
app.use(userRouter)

app.listen(port, () => console.log("Server is up on port 3000"))