const express = require('express')

const ClassCtrl = require('../controllers/class-ctrl')

const router = express.Router();

router.post('/createClass', ClassCtrl.createCourse);
router.get('/getClass/:name', ClassCtrl.returnCourseByName);
router.get('/getAllClasses', ClassCtrl.returnAllCourses);
router.delete('/deleteClass/:id', ClassCtrl.deleteCourse);
router.post('/updateClass/:id/:name/:numberOfStudents', ClassCtrl.updateCourse);
router.get('/showMyclasses/:id', ClassCtrl.showMyclasses)
module.exports = router
