const Project = require('../models/project-model.js')

showProject = (req, res) => {
  Project.find()
  .then(projects => res.json(projects))
  .catch(err => res.status(400).json('Error: ' + err))
}


createProject = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a project'
    })
  }
  const classID = "" // this will come from classID
  const createdByID = "TeacherID" // this is to be changed to project creator's ID
  const createdByname = "TeacherName"
  const projectName = req.body.projectName
  const description = req.body.description
  const studentMin = req.body.studentMin
  const studentMax = req.body.studentMax

  const newProject = new Project({
    classID,
    createdByID,
    createdByname,
    projectName,
    description,
    studentMin,
    studentMax
  })

  newProject.save()
    .then(() => res.json("Project Created"))
    .catch(err => res.status(400).json('Error: ' + err))

 }

 module.exports = {
   showProject,
   createProject
 }
