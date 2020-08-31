const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TempStudent = new Schema(
    {
        studentID: {type: String}, //Coming from user-model.js
        projectID: {type: String}, //coming from project-model.js
        courseID: {type: String},
        projectPreference1: {type: String},
        projectPreference2: {type: String},
        projectPreference3: {type: String},
        technicalBackground: {type: String}
    }
)

module.exports = mongoose.model('tempStudents', TempStudent)