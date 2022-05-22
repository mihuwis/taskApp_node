const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')

router.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    Task.findById(id).then((result) => {
        if(!result){
            return res.status(404).send(result)
        }
        res.send(result)
    }).catch((err) => {
        res.status(500).send(err)
    });
})


module.exports = router