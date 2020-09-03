const Course = require('../models/class-reference.js')
const Project = require('../models/project-model.js')
const ProjectRole = require('../models/projectRoles-model.js')
const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')

startAlgorithm = async (req, res) => {
    const course_name = req.params.course_name

    // Getting the course that the algorithm has been started on
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
                    projects.forEach(project => {
                        
                        ProjectRole.find({projectID: project._id}).exec(function(err, roles) {
                            if (err) {
                                return res.status(400).json({success: false, error: err})
                            }
                            else if (!roles.length) {
                                return res.status(404).json({success: false, error: 'There are no roles for this project'})
                            }
                            else {
                                project.roleList = roles
                                // projectList.push(project)
                            }
                        })

                        // Getting all the students enrolled in the course that have the required role for the project.
                        TempStudent.find({courseID: course._id, technicalBackground: {$in :project.roleList}}).exec(function(err, students) {
                            if (err){
                                return res.status(400).json({success: false, error: err})
                            }
                            else if (!students.length) {
                                return res.status(404).json({success: false, error: 'There are no students associated with this course and the required project roles'})
                            }
                            else {
                                // Address project requirements then student preferences
                                project.roleList.forEach(role => {
                                    // Get all students from the course that match this specific role
                                    var t_students = students.find(student => student.technicalBackground === role.roleType)
                                    var first_pref_students = t_students.find(student => student.projectPreference1 === project.projectName)
                                    first_pref_students.forEach(student => {
                                        // If there are available spots and student is not assigned to a group
                                        if ((role.positionsLeft !== 0) && (student.projectID === null)) {
                                            role.studentsEnrolledID = role.studentsEnrolledID.push(student.studentID)
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
                                                            console.log(res)
                                                        }
                                                    })
                                                }
                                                // Need to test if this will work...
                                            })
                                        }
                                    })
                                    var second_pref_students = t_students.find(student => student.projectPreference2 === project.projectName)
                                    second_pref_students.forEach(student => {
                                        // If there are available spots and student is not assigned to a group
                                        if ((role.positionsLeft !== 0) && (student.projectID === null)) {
                                            role.studentsEnrolledID = role.studentsEnrolledID.push(student.studentID)
                                            role.positionsLeft = role.positionsLeft-1
                                            student.projectID = project._id
                                        }
                                    })
                                    var third_pref_students = t_students.find(student => student.projectPreference3 === project.projectName)
                                    third_pref_students.forEach(student => {
                                        // If there are available spots and student is not assigned to a group
                                        if ((role.positionsLeft !== 0) && (student.projectID === null)) {
                                            role.studentsEnrolledID = role.studentsEnrolledID.push(student.studentID)
                                            role.positionsLeft = role.positionsLeft-1
                                            student.projectID = project._id
                                        }
                                    })

                                    // After records are updated in the database...query all temp students for this class that don't have an assigned projectID

                                })

                                
                            }
                        })

                    })
                }
            }).then(() => {
                
            })
        }

    })
    
    return res.status(201).json({
        success: true,
        message: 'Algorithm started',
    })
}

module.exports = {
    startAlgorithm,
}

/* 
get all student details (preferences and tech expertise)
get number of students
get all project quotas - group size background requirements
split students based on their background
if first preference project quota is not full 
    allocate students with tech expertise "A" to first preference - add project_ID to temp-student DB 
    allocate students with tech expertise "b" to first preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to first preference - add project_ID to temp-student DB 
else if second preference project quota is not full 
    allocate students with tech expertise "A" to second preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to second preference - add project_ID to temp-student DB
    allocate students with tech expertise "b" to second preference - add project_ID to temp-student DB
else if third preference project quota is not full 
    allocate students with tech expertise "A" to third preference - add project_ID to temp-student DB
    allocate students with tech expertise "b" to third preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to third preference - add project_ID to temp-student DB
else
    randomly assign to projects with empty spaces 
   
*/

// Admin can manually assign left over students to groups with empty spaces 