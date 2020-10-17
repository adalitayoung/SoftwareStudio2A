const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const classCtrl = require('../controllers/class-ctrl')
const OutputToExcelCtrl = require('../controllers/outputToExcel')
const router = express.Router();

router.post('/createUser', UserCtrl.createUser)
router.post('/updateUserRole/:user_id/:role', UserCtrl.updateUserRole)
router.get('/fetchUserData/:user_role/:course_id', UserCtrl.fetchUserData)
router.post('/addToClass/:student_id/:className', UserCtrl.addStudentToClass)
router.post('/removeFromClass/:student_id/:className', UserCtrl.removeFromClass)
router.post('/addPreferencesBackground', UserCtrl.addPreferencesBackground)
router.delete(`/deleteUser/:email`, UserCtrl.deleteUser)
router.delete(`/deleteUsers/:users`, UserCtrl.deleteUsers)
router.get(`/getAllStudentIds/:role`, UserCtrl.getAllStudentIds)
// router.post('/userPreference', UserCtrl.addUserPreference)
// router.post('/updatePreference', UserCtrl.updatePreferences)
router.get('/startAlgorithm/:course', AlgorithmCtrl.startAlgorithm)
router.get('/randomSort/:course', AlgorithmCtrl.randomSort)
router.post('/login', UserCtrl.login)
router.post('/logout', UserCtrl.logout)
router.get('/outputToExcel/:id', OutputToExcelCtrl.outputToExcel)

module.exports = router
