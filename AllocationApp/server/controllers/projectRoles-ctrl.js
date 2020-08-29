const ProjectRoles = require('../models/projectRoles-model.js')

showProjectRoles = (req, res) => {
  ProjectRoles.find() // This will be updated to find projectID specific roles
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

const projectID = ""; //this shold be project ID: coming in next update
const roleType = req.body.roleType
const positionsRequired = req.body.positionsRequired
const positionsLeft = positionsRequired
const studentsEnrolledID = [];

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
  createProjectRoles
}
