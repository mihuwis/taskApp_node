const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User