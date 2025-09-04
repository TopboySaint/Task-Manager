const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName:{type: String, required: true},
    taskDescription: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true })

const taskModel = mongoose.model('Task Manager', taskSchema)

module.exports = taskModel
