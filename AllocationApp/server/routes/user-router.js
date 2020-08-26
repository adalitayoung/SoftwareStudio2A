const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const classCtrl = require('../controllers/class-ctrl')
const router = express.Router();

router.post('/createUser', UserCtrl.createUser)
router.post('/userPreference', UserCtrl.addPreference)
router.post('/createClass', classCtrl.createCourse)
router.get('/algorithm', AlgorithmCtrl.startAlgorithm)

module.exports = router
