const Course = require('../models/class-reference.js')
const Project = require('../models/project-model.js')
const ProjectRole = require('../models/projectRoles-model.js')
const TempStudent = require('../models/temp-student-model.js')

startAlgorithm = async (req, res) => {
    const course_name = req.body.course_name

    await Course.findOne({name: course_name}).exec(function(err, course) {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        else if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Cannot find course with the provided name'
            })
        }
        else if (course) {
            // Get all projects for the course
            Project.find({classID: course._id}).exec(function(err, projects) {
                if (err){
                    return res.status(400).json({success: false, error: err})
                }
                else if (!projects.length){
                    return res.status(404).json({success: false, error: 'There are no projects associated with this course'})
                }
                else {
                    projects.forEach((project, ind, arr) => {
                        
                        ProjectRole.find({projectID: project._id}).exec(function(err, roles) {
                            if (err) {
                                return res.status(400).json({success: false, error: err})
                            }
                            else if (!roles.length) {
                                return res.status(404).json({success: false, error: 'There are no roles for this project'})
                            }
                            else {
                                project.roleList = roles
                                project.smallRoleList = roles.map(role => role.roleType)
                                // Getting all the students enrolled in the course that have the required role for the project.
                              
                                TempStudent.find({classID: course._id, technicalBackground: { $elemMatch: {$in :project.smallRoleList}}}).exec(function(err, students) {
                                    if (err){
                                        return res.status(400).json({success: false, error: err})
                                    }
                                    else if (!students.length) {
                                        return res.status(404).json({success: false, error: 'There are no students associated with this course and the required project roles'})
                                    }
                                    else {
                                        // Address project requirements then student preferences
                                        var allocation = new Promise((resolve, reject) => {
                                            project.roleList.forEach((role, index, array) => {
                                                // Get all students from the course that match this specific role
                                                var t_students = students.filter(student => student.technicalBackground.includes(role.roleType))
    
                                                var first_pref_students = t_students.filter(student => student.projectPreference1 === (""+project._id))

                                                first_pref_students.forEach(student => {
                                                    // If there are available spots and student is not assigned to a group
                                                    if ((role.positionsLeft !== 0) && (student.projectID === 'null')) {
                                                        role.studentsEnrolledID[role.studentsEnrolledID.length++] = student.studentID  
                                                        role.positionsLeft = role.positionsLeft-1
                                                        ProjectRole.updateOne({_id: role._id}, role).exec(function(err, res){
                                                            if (err) {
                                                                return res.status(400).json({success: false, error: err})
                                                            }
                                                            else{
                                                                student.projectID = project._id
                                                                TempStudent.updateOne({_id: student._id}, student).exec(function(err, res) {
                                                                    if (err) {
                                                                        return res.status(400).json({success: false, error: err})
                                                                    }
                                                                    else{
                                                                        var second_pref_students = t_students.filter(student => student.projectPreference2 === (""+project._id))
                                                                        second_pref_students.forEach(student => {
                                                                            // If there are available spots and student is not assigned to a group
                                                                            if ((role.positionsLeft !== 0) && (student.projectID === "null")) {
                                                                                role.studentsEnrolledID[role.studentsEnrolledID.length++] = student.studentID  
                                                                                role.positionsLeft = role.positionsLeft-1
                                                                                student.projectID = project._id
                                                                                ProjectRole.updateOne({_id: role._id}, role).exec(function(err, res){
                                                                                    if (err) {
                                                                                        return res.status(400).json({success: false, error: err})
                                                                                    }
                                                                                    else{
                                                                                        student.projectID = project._id
                                                                                        TempStudent.updateOne({_id: student._id}, student).exec(function(err, res) {
                                                                                            if (err) {
                                                                                                return res.status(400).json({success: false, error: err})
                                                                                            }
                                                                                            else{
                                                                                                var third_pref_students = t_students.filter(student => student.projectPreference3 === (""+project._id))

                                                                                                third_pref_students.forEach(student => {
                                                                                                    // If there are available spots and student is not assigned to a group
                                                                                                    if ((role.positionsLeft !== 0) && (student.projectID === "null")) {
                                                                                                        role.studentsEnrolledID[role.studentsEnrolledID.length++] = student.studentID  
                                                                                                        role.positionsLeft = role.positionsLeft-1
                                                                                                        student.projectID = project._id
                                                                                                        ProjectRole.updateOne({_id: role._id}, role).exec(function(err, res){
                                                                                                            if (err) {
                                                                                                                return res.status(400).json({success: false, error: err})
                                                                                                            }
                                                                                                            else{
                                                                                                                student.projectID = project._id
                                                                                                                TempStudent.updateOne({_id: student._id}, student).exec(function(err, res) {
                                                                                                                    if (err) {
                                                                                                                        return res.status(400).json({success: false, error: err})
                                                                                                                    }
                                                                                                                })
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                    else{
                                                                                                        if (index == (array.length -1)){
                                                                                                            resolve()
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                            else{
                                                                                if (index == (array.length -1)){
                                                                                    resolve()
                                                                                }
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else{
                                                        if (index == (array.length -1)){
                                                            resolve()
                                                        }
                                                    }
                                                })
                                            })
                                        })
                                        allocation.then(() => {
                                            if (ind == (arr.length -1)){
                                                return res.status(200).json({
                                                    success: true
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

module.exports = {
    startAlgorithm,
}