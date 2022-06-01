const express = require('express')
const { send } = require('express/lib/response')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/tasks')

router.post('/tasks', auth, async (req, res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks?completed=true

router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res)=>{ 
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdateValid = updatesKeys.every(key => allowedUpdates.includes(key))

    if(!isUpdateValid){
        return res.status(400).send({error: 'update not allowed'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send('No such task')
        }

        updatesKeys.forEach((update) => task[update] = req.body[update])
        
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send('No such task')
        }
        res.send('removed: ' + task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router