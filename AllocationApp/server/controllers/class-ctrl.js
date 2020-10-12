const Course = require('../models/class-reference.js')
const Enrolment = require('../models/temp-student-model')
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

deleteCourse = (req, res) => {
    Course.findByIdAndDelete(req.params.id)
    .then(() => res.json('Class deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
}

updateCourse = async (req, res) =>{
    const id = req.params.id;
    const className = req.params.name;
    const numberOfStudents = req.params.numberOfStudents;

    if ((className !== null) && (numberOfStudents !== null)){
        await Course.findOneAndUpdate({_id: id},
            { $set: { name: className,
            numberOfStudents: numberOfStudents }}, {new: true}, (err, doc) => {
            if (err){
                return res.status(404).json({
                    success: false,
                    error: err
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    className: className,
                    message: "Class updated"
                })
            }
        })
    }
    else{
        return res.status(400).json({
            success: false,
            error: 'Valid data must be provided'
        })
    }
}

showMyclasses = async(req, res) =>{
  Course.find({studentIDS:req.params.id}, 'name')
  .then(classes => res.json(classes))
  .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = {
    createCourse,
    returnAllCourses,
    returnCourseByName,
    deleteCourse,
    updateCourse,
    showMyclasses
}
