const express = require('express')
const ProjectRolesCtrl = require('../controllers/projectRoles-ctrl')
const ProjectCtrl = require('../controllers/project-ctrl')
const router = express.Router();
const verify = require('../verifyTokens')

router.get('/showRoles', ProjectRolesCtrl.showProjectRoles)
router.post('/createProjectRole', ProjectRolesCtrl.createProjectRoles)

router.get('/showProject/:id', ProjectCtrl.showProject)
router.get('/showMyProjects', verify, ProjectCtrl.showMyProjects)

router.post('/createProject', verify, ProjectCtrl.createProject)
router.post('/updateProject/:id', ProjectCtrl.updateProject)
router.delete('/:id', ProjectCtrl.deleteProject)

module.exports = router
