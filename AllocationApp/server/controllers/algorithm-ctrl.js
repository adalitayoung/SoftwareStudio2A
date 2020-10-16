const { replaceOne, count } = require('../models/class-reference.js')
const Course = require('../models/class-reference.js')
const Project = require('../models/project-model.js')
const projectRolesModel = require('../models/projectRoles-model.js')
const ProjectRole = require('../models/projectRoles-model.js')
const TempStudent = require('../models/temp-student-model.js')

startAlgorithm = async (req, res) => {
    const course_name = req.params.course
    console.log(course_name)
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

                    TempStudent.find({classID: course._id}).exec(function(err, students) {
                        allocatedStudents = students.filter(student => student.projectID != "null")
                        if (allocatedStudents.length > 0){
                        // If they already have an allocation clear it and start again.
                            students.forEach(student => {

                                student.projectID = "null"

                                TempStudent.updateOne({_id: student._id}, student).exec(function(err, res) {
                                    if (err) {
                                        return res.status(400).json({success: false, error: err})
                                    }
                                    else{
                                        projects.forEach((project, ind, arr) => {
                        
                                            ProjectRole.find({projectID: project._id}).exec(function(err, roles) {
                                                if (err) {
                                                    return res.status(400).json({success: false, error: err})
                                                }
                                                else if (!roles.length) {
                                                    return res.status(404).json({success: false, error: 'There are no roles for this project'})
                                                }
                                                else {
                                                    roles.forEach(role => {
                                                        role.studentsEnrolledID = []
                                                        role.positionsLeft = role.positionsRequired
                                                        ProjectRole.updateOne({_id: role._id}, role).exec(function(err, res) {
                                                            if (err){
                                                                return res.status(400).json({success: false, error: err})
                                                            }
                                                            else{
                                                                execute()
                                                            }
                                                        })
                                                    })

                                                }
                                            })
                                        })
                                    }
                                })
                            })
                            
                        }
                        else{
                            execute()
                        }
                    })

                    function execute() {
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
                    
                }
            })
        }
    })
}

randomSort = async (req, res) => {
    const course_name = req.params.course
    console.log(course_name);
    // Get Course
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
            //Get all students enrolled in the course and 
            TempStudent.find({classID: course._id, projectID: "null"}).exec(function(err, students) {
                if (err){
                    console.log(err)
                    return res.status(400).json({success: false, error: err})
                }
                else if (!students.length) {
                    return res.status(404).json({success: false, error: 'There are no students associated with this course'})
                }
                else {
                    
                    //shuffle students into random order
                    function shuffleArray(array) {
                        var currentIndex = array.length, temporaryValue, randomIndex;
        
                        // While there remain elements to shuffle...
                        while (0 !== currentIndex) {
        
                            // Pick a remaining element...
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex -= 1;
        
                            // And swap it with the current element.
                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                        }
        
                        return array;
                    }

                    shuffleArray(students);

                    // Get all projects for the course
                    Project.find({classID: course._id}).exec(function(err, projects) {
                        if (err){
                            console.log(err)
                            return res.status(400).json({success: false, error: err})
                        }
                        else if (!projects.length){
                            return res.status(404).json({success: false, error: 'There are no projects associated with this course'})
                        }
                        else {
                            var smallestGroup = parseInt(students.length/projects.length) //16
                            var difference = students.length%projects.length //2
                            var extra = projects.length%difference //1
                            var groupSizeSmall = [projects.length]
                            console.log("Extra " + extra)
                            console.log("Difference " + difference)
                            groupSizeSmall[0] = smallestGroup;
                            
                            if(difference == 1){
                                for(i = 1; i<projects.length-1;i++){
                                    groupSizeSmall[i] = smallestGroup
                                }
                                groupSizeSmall[projects.length-1] = smallestGroup+difference
                            }else{
                                for(i=1; i<projects.length; i++){
                                    groupSizeSmall[i] = smallestGroup+extra;
                                }
                            }

                            console.log("Group Sizes small: " + groupSizeSmall);

                            var groupSizeLarge = [students.length]
                            
                            for(j=0; j<groupSizeSmall.length; j++){
                                var count = 0

                                for(i =0; i< students.length; i++){
                                    if(count < groupSizeSmall[j] ){
                                        groupSizeLarge[i] = j;
                                        count++;
                                    }
                                    if(count == groupSizeSmall[j]){
                                        j++
                                        count = 0
                                    }
                                }
                            }

                           // console.log("Group Sizes Large:" + groupSizeLarge);

                            students.forEach((student, ind, array) => {
                                student.tempProjID = groupSizeLarge[ind]
                            })

                            //get project roles
                            projects.forEach((project, ind, arr) => {
                                console.log('line 221')
                                
                                var projectIndex = projects.indexOf(project)
                                console.log("ProjectINdex: "+ projectIndex)
                                var groupSizeValue = groupSizeSmall[projectIndex]
                                console.log("groupSizeValue: "+ groupSizeValue)
                                var ThisProjStudents = students.filter(student => student.tempProjID == projectIndex)
                                console.log(ThisProjStudents.length)

                                ProjectRole.find({projectID: project._id}).exec(function(err, roles) {
                                    if (err) {
                                        console.log(err)
                                        return res.status(400).json({success: false, error: err})
                                    }
                                    else if (!roles.length) {
                                        return res.status(404).json({success: false, error: 'There are no roles for this project'})
                                    }
                                    else {

                                        project.roleList = roles
                                        // const run = async() => 
                                            console.log('running')
                                            console.log(project._id)
                                            // var promises = []

                                            var allocation = new Promise((resolve, reject) => {
                                                
                                                ThisProjStudents.forEach((student) => {
                                                    project.roleList.forEach((role, index, array) => {
                                                        if ((role.positionsLeft !== 0) && (student.projectID === 'null') ) {
                                                            //console.log("!!!")
                                                            //console.log(student.studentID)
                                                            role.studentsEnrolledID[role.studentsEnrolledID.length++] = student.studentID
                                                            role.positionsLeft = role.positionsLeft-1
                                                            student.projectID = project._id
                                                            //console.log(count);
                                                            ProjectRole.updateOne({_id: role._id}, role).exec(function(err, res){
                                                                
                                                                if (err) {
                                                                    console.log(err)
                                                                    return res.status(400).json({success: false, error: err})
                                                                }
                                                                else{
                                                                    // console.log('line 250')
                                                                    // console.log(student.projectID)
                                                                    TempStudent.updateOne({_id: student._id}, student).exec(function(err, res) {
                                                                        if (err) {
                                                                            console.log(err)
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
                                                })
                                            })
                                            allocation.then(() => {
                                                if (ind == (arr.length -1)){
                                                    console.log('hereeee')
                                                    return res.status(200).json({
                                                        success: true
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
    })

}


module.exports = {
    startAlgorithm,
    randomSort
}

    // Get Course
    // Get all projects for the course
    // Get all the students enrolled in the course -> add to array and shuffle
    //Get first  project 
        //get first project role
            //if positiions required is greater than or equal to position lefts
                //add first student to studentsEnrolledIDS
                //mark temp-student projectid as projectid
                //remove from array
                //minus positions left
            //if positions left == 0
                //get next project role

        //check if number of students is less than the min requirement and if students in arary
            //Add students until between min and max
                // change TEMP STUDENT project id from null to project id 
                // remove student from array
            //change project

        // else if full but students still in array
            // print no more space for students
            //change project

        //else if no students in array
            //print all students allocated to projects
        
    //else
        // change project