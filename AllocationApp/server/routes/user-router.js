const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const classCtrl = require('../controllers/class-ctrl')
const router = express.Router();

router.post('/createUser', UserCtrl.createUser)
router.post('/addToClass', UserCtrl.addStudentToClass)
router.post('/addPreferencesBackground', UserCtrl.addPreferencesBackground)
//router.post('/updateTechBackground', UserCtrl.updateTechBackground)
router.get('/algorithm', AlgorithmCtrl.startAlgorithm)
router.post('/login', UserCtrl.login)
module.exports = router
