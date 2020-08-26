const Course = require('../models/class-reference.js')

createCourse = (req, res) => {

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

    Course.find({name: course.name}).exec(function(err, courses) {
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

module.exports = {
    createCourse,
}