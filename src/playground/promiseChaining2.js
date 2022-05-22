require('../db/mongoose')
const Task = require('../models/tasks')

// Task.findByIdAndDelete('6280a42738341538d93c91af').then((res)=>{
//     console.log(res)
//     return Task.countDocuments({completed: false})
// }).then((number)=> console.log(number)).catch((e)=>console.log(e))

const asyncTask = async (id, isCompleted) => {
    const taskToDelete = await Task.findByIdAndDelete(id)
    console.log(taskToDelete)
    const tasksCount = await Task.countDocuments({completed: isCompleted})
    return tasksCount
}

asyncTask('6283bce498ce6e7bd007bb3d', false).then(count=>console.log(count)).catch(e=>console.log(e))