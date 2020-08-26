const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const classCtrl = require('../controllers/class-ctrl')
const router = express.Router();

router.post('/createUser', UserCtrl.createUser)
router.post('/userPreference', UserCtrl.addUserPreference)
// router.post('/createClass', classCtrl.createClass)

router.post('/createClass', function(req, res) {
    classCtrl.createClass
});

router.get('/algorithm', AlgorithmCtrl.startAlgorithm)

module.exports = router
