const express = require('express')
const ProjectRolesCtrl = require('../controllers/projectRoles-ctrl')
const router = express.Router();

router.get('/showRoles', ProjectRolesCtrl.showProjectRoles)
router.post('/createProjectRole', ProjectRolesCtrl.createProjectRoles)

module.exports = router
