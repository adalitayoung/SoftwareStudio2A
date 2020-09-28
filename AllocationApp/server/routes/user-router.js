const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const classCtrl = require('../controllers/class-ctrl')
const router = express.Router();

router.post('/createUser', UserCtrl.createUser)
router.post('/updateUserRole/:user_id/:role', UserCtrl.updateUserRole)
router.get('/fetchUserData/:user_role/:course_id', UserCtrl.fetchUserData)
router.post('/addToClass/:student_id/:className', UserCtrl.addStudentToClass)
router.post('/removeFromClass', UserCtrl.removeFromClass)
router.post('/addPreferencesBackground', UserCtrl.addPreferencesBackground)
router.delete(`/deleteUser/:email`, UserCtrl.deleteUser)
router.delete(`/deleteUsers/:users`, UserCtrl.deleteUsers)
// router.post('/userPreference', UserCtrl.addUserPreference)
// router.post('/updatePreference', UserCtrl.updatePreferences)
router.get('/algorithm', AlgorithmCtrl.startAlgorithm)
router.post('/login', UserCtrl.login)
router.post('/logout', UserCtrl.logout)

module.exports = router
