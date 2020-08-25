const express = require('express')

const AlgorithmCtrl = require('../controllers/algorithm-ctrl')
const UserCtrl = require('../controllers/user-ctrl')
const router = express.Router();

router.post('/user', UserCtrl.createUser)
router.post('/userPreference', UserCtrl.addPreference)

router.get('/algorithm', AlgorithmCtrl.startAlgorithm)

module.exports = router
