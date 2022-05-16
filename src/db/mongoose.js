const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('this is not email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot include this word")
            }

        }
    },
    age: {
        type: Number, 
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be positive number")
            }
        }
    }
})

const Task = mongoose.model('Task', {
    descryption: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const me = new User({
//     name: 'Zenek',
//     email: 'zenek@mail.com',
//     password: 'asssasas  ',
//     age: 65
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// });


const newTask = new Task({
    descryption: "Paint the sasasasasas   "
})

newTask.save().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});