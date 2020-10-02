const express = require('express')

const ClassCtrl = require('../controllers/class-ctrl')

const router = express.Router();
const verify = require('../verifyTokens')

router.post('/createClass',verify ,ClassCtrl.createCourse);
router.get('/getClass/:name',verify ,ClassCtrl.returnCourseByName);
router.get('/getAllClasses',verify ,ClassCtrl.returnAllCourses);
router.delete('/deleteClass/:id',verify, ClassCtrl.deleteCourse);
router.post('/updateClass/:id/:name/:numberOfStudents', ClassCtrl.updateCourse);

module.exports = router
