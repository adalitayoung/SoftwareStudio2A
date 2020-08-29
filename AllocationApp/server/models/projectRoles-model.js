const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectRoles = new Schema(
  {
    projectID: {type: String}, // coming from project unique ID
    roleType:{type: String},   // unique to this project
    positionsRequired:{type: Number},
    positionsLeft:{type: Number},
    studentsEnrolledID:{[String]} // This will be an array of IDs of students enrolled to this project into this particular role type
)
