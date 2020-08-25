const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        classID: {type: String},
        name: {type: String},
        description: {type: String},
        frontEndQuota: {type: Number},
        backEndQuota: {type: Number},
        fullStackQuota: {type: Number},
        studentMin: {type: Number},
        studentMax: {type: Number}
    }
)

module.exports = mongoose.model('projects', Project)