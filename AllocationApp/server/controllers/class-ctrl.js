const Course = require('../models/class-reference.js')

createCourse = async (req, res) => {

    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide course information'
        })
    }

    const course = new Course(body)

    if (!course){
        return res.status(400).json({
            success:false,
            error: err
        })
    }

    await Course.find({name: course.name}).exec(function(err, courses) {
        if (courses.length){
            return res.status(400).json({
                success: false,
                error: 'Course already exists'
            })
        }
        else{
            course
                .save()
                .then(()=> {
                    return res.status(201).json({
                        success: true,
                        id: course._id,
                        message: 'Class added',
                    })
                })
        }
    })

    
}

returnAllCourses = async (req, res) => {
    await Course.find().exec(function(err, courses) {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        else if (!courses.length) {
            return res.status(404).json({success: false, error: 'No Courses Found'})
        }
        else{
            return res.status(200).json({success: true, data: courses})
        }
    })
}

returnCourseByName = async (req, res) => {
    await Course.findOne({name: req.params.name}).exec(function(err, course) {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        else if (!course) {
            return res.status(404).json({success: false, error: 'Course not found'})
        }
        else {
            return res.status(200).json({success: true, data: course})
        }
    })
}

module.exports = {
    createCourse,
    returnAllCourses,
    returnCourseByName
}