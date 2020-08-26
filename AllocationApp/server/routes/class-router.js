const express = require('express')

const ClassCtrl = require('../controllers/class-ctrl')

const router = express.Router();

router.post('/createClass', ClassCtrl.createCourse);


module.exports = router
