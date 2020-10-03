const express = require('express')
const ProjectRolesCtrl = require('../controllers/projectRoles-ctrl')
const ProjectCtrl = require('../controllers/project-ctrl')
const router = express.Router();
const verify = require('../verifyTokens')

router.get('/showRoles/:id', ProjectRolesCtrl.showProjectRoles)   // This will show all the roles to specific ProjectID
router.post('/createProjectRole', ProjectRolesCtrl.createProjectRoles)
router.delete('/deleteProjectRole/:id', ProjectRolesCtrl.deleteProjectRole)
router.post('/updateProjectRole/:id', ProjectRolesCtrl.updateProjectRole)
router.get('/showProject/:id', ProjectCtrl.showProject)
router.get('/showMyProjects', ProjectCtrl.showMyProjects)
router.post('/createProject', ProjectCtrl.createProject)
router.post('/updateProject/:id', ProjectCtrl.updateProject)
router.delete('/deleteProject/:id', ProjectCtrl.deleteProject)
router.get('/showAllProjects', ProjectCtrl.showAllProjects)
router.get('/showProjectByName', ProjectCtrl.showProjectByName)
router.get('/showClassProjects/:id', ProjectCtrl.showClassProjects)
router.get('/getRolesForBackground/:id', ProjectRolesCtrl.getRolesForBackground)
router.post('/addStudentToProjectManually', ProjectCtrl.addStudentToProjectManually)
module.exports = router
