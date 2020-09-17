const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassReference = new Schema(
    {
        name: {type: String},
        numberOfStudents: {type: Number},
        studentIDS: [String] //array set to the length of the number of students 
    }
)

module.exports = mongoose.model('classReferences', ClassReference)