const express = require('express')
const router = new express.Router()
const User = require('../models/users')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send(result)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.patch('/users/:id', async (req, res)=>{
    const _id = req.params.id
    const update = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updatesKeys.every((field)=> allowedUpdates.includes(field))

    if(!isValidUpdate){
        return res.status(400).send({ error: 'updates not allowed'})
    }
    try {
        const user = await User.findByIdAndUpdate(_id, update, { new: true, runValidators: true})
        if(!user){
            return res.status(404).send('No such user')
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/users/:id', async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
