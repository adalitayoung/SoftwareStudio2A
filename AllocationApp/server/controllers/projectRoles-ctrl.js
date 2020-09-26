const ProjectRoles = require('../models/projectRoles-model.js')

deleteProjectRole = (req, res) => {
  ProjectRoles.findByIdAndDelete(req.params.id)
    .then(() => res.json('Role Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
 }

updateProjectRole = (req, res) => {
  ProjectRoles.findById(req.params.id)
  .then(projectRoles =>{
    projectRoles.projectID = req.body.projectID
    projectRoles.roleType = req.body.roleType
    projectRoles.positionsRequired = req.body.positionsRequired
    projectRoles.positionsLeft = req.body.positionsLeft
    projectRoles.studentsEnrolledID =  req.body.studentsEnrolledID

    projectRoles.save()
      .then(() => res.json('Project Role Updated'))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

showProjectRoles = (req, res) => {
  ProjectRoles.find({projectID:req.params.id}) // This will be updated to find projectID specific roles
    .then(projectRoles => res.json(projectRoles))
    .catch(err => res.status(400).json('Error: ' + err))
}

createProjectRoles = (req, res) => {
  const body = req.body
  if(!body){
     return res.status(400).json({
      success: false,
        error: 'You must create a role'
    })
  }

const projectID = req.body.projectID; // req.params.projectID //this shold be project ID: coming in next update
const roleType = req.body.roleType
const positionsRequired = req.body.positionsRequired
const positionsLeft = positionsRequired
const studentsEnrolledID = req.body.studentsEnrolledID

const newProjectRole = new ProjectRoles({
  projectID,
  roleType,
  positionsRequired,
  positionsLeft,
  studentsEnrolledID
})

newProjectRole.save()
  .then(() => res.json("Role Added"))
  .catch(err => res.status(400).json('Error: '+ err))

}

module.exports = {
  showProjectRoles,
  createProjectRoles,
  deleteProjectRole,
  updateProjectRole
}
