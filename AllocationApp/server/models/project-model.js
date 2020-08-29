const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        classID: {type: String},
        createdByID:{type: String},   // coming from user who creates the project as a teacher
        createdByname:{type: String}, // coming from user who creates the project as a teacher
        name: {type: String},
        description: {type: String},
        studentMin: {type: Number},
        studentMax: {type: Number}
    }
)

module.exports = mongoose.model('projects', Project)
