const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/users')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        if(!user){
            res.status(404).send("no such user")
        }
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req,res)=> {
    try {
        req.user.tokens = req.user.tokens.filter((tokenItem) =>{
            return tokenItem.token !== req.token
        } )
        await req.user.save()
        res.send('User logget out locally')
    } catch (error) {
        res.status(500)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('User logged out from all devices')
    } catch (error) {
        res.status(500)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res)=>{
    
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updatesKeys.every((field)=> allowedUpdates.includes(field))

    if(!isValidUpdate){
        return res.status(400).send({ error: 'updates not allowed'})
    }
    try {

        const user = req.user
        updatesKeys.forEach(update => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
