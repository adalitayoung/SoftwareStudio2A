const express = require('express')

const ClassCtrl = require('../controllers/class-ctrl')

const router = express.Router();

router.post('/createClass', function(req, res) {
    ClassCtrl.createClass
});


module.exports = router
