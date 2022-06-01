const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

taskSchema.statics.getCompletedStatus = async (query) => {
    if(query.completed === undefined){
        return undefined
    } 
    const isCompleted = await query.completed === 'true'
    return isCompleted
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task