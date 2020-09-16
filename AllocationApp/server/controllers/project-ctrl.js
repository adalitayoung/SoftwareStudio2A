const Project = require('../models/project-model.js')
const User = require('../models/user-model')

deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id)
  .then(() => res.json('Project deleted'))
  .catch(err => res.status(400).json('Error: ' + err))
}

updateProject =(req, res) =>{
  Project.findById(req.params.id)
  .then(project => {
    project.classID = req.body.classID
    project.createdByID = req.body.createdByID
    project.createdByname = req.body.createdByname
    project.projectName = req.body.projectName
    project.description = req.body.description
    project.studentMin = req.body.studentMin
    project.studentMax = req.body.studentMax

    project.save()
      .then(() => res.json('Project Updated'))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

showProject = (req, res) => {
  Project.findById(req.params.id)
  .then(project => res.json(project))
  .catch(err => res.status(400).json('Error: ' + err))
 }

 showMyProjects = (req, res) => {
   Project.find({createdByID:req.userID}) 
   .then(project => res.json(project))
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
  const classID = req.body.classID // this will come from classID
  const createdByID = req.userID
  const createdByname = req.userName
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
   updateProject,
   deleteProject,
   showProject,
   showMyProjects,
   createProject
 }
