const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassReference = new Schema(
    {
        name: {type: String},
        numberOfStudents: {type: Number},
    }
)

module.exports = mongoose.model('classReferences', ClassReference)