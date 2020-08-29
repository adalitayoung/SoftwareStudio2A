const express = require('express')
const ProjectRolesCtrl = require('../controllers/projectRoles-ctrl')
const ProjectCtrl = require('../controllers/project-ctrl')
const router = express.Router();

router.get('/showRoles', ProjectRolesCtrl.showProjectRoles)
router.post('/createProjectRole', ProjectRolesCtrl.createProjectRoles)

router.get('/showProject', ProjectCtrl.showProject)
router.post('/createProject', ProjectCtrl.createProject)

module.exports = router
