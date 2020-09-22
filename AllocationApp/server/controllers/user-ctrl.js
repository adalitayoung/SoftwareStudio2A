const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')
const Class = require('../models/class-reference.js')
const jwt = require('jsonwebtoken')
const e = require('express')

createUser = async (req, res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    await User.find({email: user.email}).exec(function(err, users){
        if (users.length){
            return res.status(400).json({
                success: false,
                error: 'User email already in use',
                email: user.email
            })
        }
        else{
            user.role = "Student"

            user
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: user._id,
                        message: 'User Added',
                    })
                })
        }
    })
}

updateUserRole = async (req, res) => {
    const user_id = req.params.user_id;
    const role = req.params.role;

    if ((user_id !== null) && (role !== null)){
        await User.findOneAndUpdate({_id: user_id},
            { $set: { role: role }}, {new: true}, (err, doc) => {
            if (err){
                return res.status(404).json({
                    success: false,
                    error: err
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "Role updated"
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

fetchUserData = async (req, res) => {
    const user_role = req.params.user_role;
    const course_id = req.params.course_id;

    // If the user role and the course is specified
    if ((user_role !== null) && (course_id !== null)) {
        await User.aggregate(
            [
                {
                    $addFields: {
                    // For some reason, the ID needed to be converted to a string to merge
                      convertedUserID: { $toString: "$_id" }
                   }
                },
                {
                    "$lookup" : {
                        "localField" : "convertedUserID",
                        "from" : "tempstudents",
                        "foreignField" : "studentID",
                        "as" : "tempstudents"
                    }
                }
            ]
        ).then(response => {
            const result = response.filter(user => ((user.role === user_role)))

            classData = [];

            result.forEach(user => {
                user.tempstudents.forEach(entry => {
                    console.log(entry)
                    if (entry.classID === course_id) {
                        console.log('match')
                        classData.push(user)
                    }
                })
            })
            return res.status(200).json({
                success: true,
                data: classData
            })

        }, err => {
            return res.status(400).json({
                success: false,
                error: err
            })
        })
    }
    // If only the user role is specified
    else if ((user_role !== null) && (course_id === null)) {
        await User.find({role: user_role}, function(err, users) {
            if (err) {
                return res.status(404).json({
                    success: false,
                    error: err
                })
            }
            if (users) {
                return res.status(200).json({
                    success: true,
                    userData: users
                })
            }
        })
    }
    else{
        return res.status(400).json({
            success: false,
            error: "Please provide valid input"
        })
    }

}


deleteUser = async (req, res) => {
    await User.findOneAndDelete({email: req.params.email}).exec(function (err, user) {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        else if (!user) {
            return res.status(404).json({success: false, error: 'User not found: '+req.params.email})
        }
        else {
            TempStudent.find({studentID: user._id}).exec(function(error, response) {
                if (response) {
                    TempStudent.findOneAndDelete({studentID: user._id}).exec(function(err, tempUser) {
                        if(tempUser) {
                            return res.status(200).json({success: true})
                        }
                        else{
                            return res.status(404).json({success: false, error: 'User not found: '+user._id})
                        }
                    })
                }
                else if (!response) {
                    return res.status(200).json({success: true})

                }
                else if (error) {
                    return res.status(404).json({success: false, error: error})
                }
            })
            
            
        }
    })
}

deleteUsers = async (req, res) => {
    await User.deleteMany({email: {$in: req.params.emails}}).exec(function(err, users){
        console.log(req.params.emails)
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        else if (!users) {
            return res.status(404).json({success: false, error: 'Users not found'})
        }
        else {
            return res.status(200).json({success: true})
        }
    })
}

addStudentToClass = async (req, res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const email = body.email;

    const tempStudent = new TempStudent(body)

    //find student in user database using email entered in body
    await User.find({email: email}).exec(function(err, users){

        //if there is a user
        if (users.length){
            //get the student id from the users db and assign as tempStudent students id
            var id = users[0]._id;
            tempStudent.studentID = id;

            //find class ID based of class name
            var className = body.className;
            var classID;
            Class.find({name : className}).exec(function(err, classReferences){
                if (classReferences.length){
                    classID = classReferences[0]._id;
                    //Check that class is not full
                    if(classReferences[0].studentIDS.length>=classReferences[0].numberOfStudents){
                        return res.status(400).json({
                            success: false,
                            error: 'Class has reached max number of students'
                        })
                    }
                    
                    //Check that the student is not already enrolled in class
                    TempStudent.find({ studentID: id, classID: classID}).exec(function(err, tempStudents){
                        if (tempStudents.length){
                            return res.status(400).json({
                                success: false,
                                error: 'Student is already enrolled in that class'
                            })
                        }
                        else{

                            tempStudent.projectID = null;
                            tempStudent.classID = classID;

                            tempStudent
                            .save()
                            .then(()=> {
                                return res.status(201).json({
                                    success: true,
                                    studentID: tempStudent.studentID,
                                    classID: tempStudent.classID,
                                    message: 'student added to class',
                                })
                            })

                            //add student id to class studentIDS array
                            Class.findOneAndUpdate({name: className},
                                { $push: { studentIDS: id,}}, {new: true}, (err, doc) => {
                                if (err) {
                                    console.log("Something wrong when updating class data!");
                                }
                            });
                        }
                    })
                }
                else{
                    return res.status(404).json({
                        success: false,
                        message: 'class not found!',
                    })
                }
            })

        }
        else {
            return res.status(404).json({
                success: false,
                message: 'user not found!',
            })
        }
    })
}

removeFromClass = async (req, res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const email = body.email;

    const tempStudent = new TempStudent(body)

    //find student in user database using email entered in body
    await User.find({email: email}).exec(function(err, users){

        //if there is a user
        if (users.length){
            //get the student id from the users db and assign as tempStudent students id
            var id = users[0]._id;
            tempStudent.studentID = id;

            //find class ID based of class name
            var className = body.className;
            var classID;
            Class.find({name : className}).exec(function(err, classReferences){
                if (classReferences.length){
                    classID = classReferences[0]._id;
                    
                    //Check that the student is enrolled in class
                    TempStudent.find({ studentID: id, classID: classID}).exec(function(err, tempStudents){
                        if (tempStudents.length){
                            //Remove student id from class reference studentIDS
                            Class.update({name: className},
                                { $pull: { studentIDS: id,}}, {new: true}, (err, doc) => {
                                if (err) {
                                    console.log("Something wrong when remove student from class");
                                }
                            });
                            TempStudent.deleteOne({ studentID: id, classID: classID }).exec(function(err, tempStudents){
                                if (err){
                                    return res.status(404).json({
                                        success: false,
                                        error: err
                                    })
                                }
                                return res.status(200).json({
                                    success: true,
                                    message: 'Student removed from class'
                                })
                            })
                            
                        }
                        else{
                            return res.status(400).json({
                                success: false,
                                error: 'Student is not enrolled in that class'
                            })
                        }
                    })
                }
                else{
                    return res.status(404).json({
                        success: false,
                        error: 'class not found!',
                    })
                }
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: 'user not found!',
            })
        }
    })
}

//a function to update the project preferences and technical background of the students
addPreferencesBackground = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    //find student in user database using email entered in body
    User.find({email: body.email}).exec(function(err, users){

        //if there is a user
        if (users.length){
            //get the student id from the users db and assign as tempStudent students id
            var id = users[0]._id;

            //Check that the student is in temp-student db
            TempStudent.find({studentID: id}).exec(function(err, tempStudents){
                //if there is a student
                if (tempStudents.length) {
                    //Update preferences based on user input
                    TempStudent.findOneAndUpdate(
                        {studentID: id},
                        { $set: { projectPreference1: body.projectPreference1,
                            projectPreference2: body.projectPreference2,
                            projectPreference3: body.projectPreference3,
                            technicalBackground: body.technicalBackground }}, {new: true}, (err, doc) => {

                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                        });

                    return res.status(200).json({
                        success: true,
                        message: "Preferences have been updated"
                    })

                }
                else{
                    return res.status(404).json({
                        success: false,
                        message: "Student not enrolled in any classes"
                    })
                }
            })
        }
        else {
            return res.status(404).json({
                err,
                message: 'No user found with that email',
            })
        }
    })
}



login = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide login details',
        })
    }

    await User.find({email: body.email}).exec(function(err, users) {
        if (err){
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (users[0] == undefined){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        if (users[0].password == body.password){
            //Create and assign token
            const token = jwt.sign({_id: users[0].id}, process.env.TOKEN_CODE)
            res.setHeader('auth-token',token) // this will set browser header to token

            return  res.status(201).json({
                success: true,
                fullName: users[0].fullName,
                role: users[0].role
            })
        }
        else if (users[0].password != body.password){
            return res.status(400).json({
                success: false,
                message: "User's password does not match the system"
            })
        }
    })
}

logout = (req, res) => {
 res.setHeader('auth-token', null)
  return  res.status(201).json({
      success: true,
      message: "User logged out"

  })
}

module.exports = {
    createUser,
    login,
    updateUserRole,
    fetchUserData,
    addStudentToClass,
    removeFromClass,
    addPreferencesBackground,
    logout,
    deleteUser,
    deleteUsers,
    // addUserPreference,
    // updatePreferences,
    login
}
