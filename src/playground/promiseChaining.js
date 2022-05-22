const express = require('express')
require('../db/mongoose')
const User = require('../models/users')


const app = express()
// Heroku ready port definition
const port = process.env.PORT || 3000

// convert request to json so it can be used in functions
app.use(express.json())



app.get('/users/:id', (req, res) => {
    const idFromQuery = req.params.id
    User.findById(idFromQuery)
    .then((result) => {
        if(!result){
            return res.status(404).send()
        }
        return result
    })
    .then((user1) => {
        res.send(user1)
    })
    .catch((err) => {
        res.status(500).send(err)
    });
})


app.listen(port, () => console.log("Server is up on port 3000"))