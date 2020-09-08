const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')
const jwt = require('jsonwebtoken')

createUser = (req, res) => {
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

    User.find({email: user.email}).exec(function(err, users){
        if (users.length){
            return res.status(400).json({
                success: false,
                error: 'User email already in use'
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

addUserPreference = (req, res) => {
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
    User.find({email: email}).exec(function(err, users){

        if (err) {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }
        //if there is a user
        if (users.length){
            //get the student id from the users db and assign as tempStudent students id
            var id = users[0]._id;
            tempStudent.studentID = id;

            //Check that the student is not already in temp-student db
            TempStudent.find({studentID: id}).exec(function(err, tempStudents){
                if (tempStudents.length){
                    return res.status(400).json({
                        success: false,
                        error: 'Student has already entered preferences, go to update preferences to edit'
                    })
                }
                else {
                    tempStudent.projectID = null;

                    tempStudent
                    .save()
                    .then(()=> {
                        return res.status(201).json({
                            success: true,
                            id: tempStudent.studentID,
                            message: 'student added',
                        })
                    })
                }
            })
        }
        else {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }
    })
}

updatePreferences = async (req, res) => {
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

            //Check that the student is not already in temp-student db
            TempStudent.find({studentID: id}).exec(function(err, tempStudents){
                //if there is a student
                if (tempStudents.length) {
                    //Update preferences based on user input
                    TempStudent.findOneAndUpdate(
                        {studentID: id},
                        { $set: { projectPreference1: body.projectPreference1,
                            projectPreference2: body.projectPreference2,
                            projectPreference3: body.projectPreference3 }}, {new: true}, (err, doc) => {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                        });

                    return res.status(200).json({
                        success: true,
                        message: "Preferences have been updated"
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

updateTechBackground = async (req, res) => {
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

            //Check that the student is not already in temp-student db
            TempStudent.find({studentID: id}).exec(function(err, tempStudents){
                //if there is a student
                if (tempStudents.length) {
                    //Update preferences based on user input
                    TempStudent.findOneAndUpdate(
                        {studentID: id},
                        { $set: { technicalBackground: body.technicalBackground }}, {new: true}, (err, doc) => {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                        });

                    return res.status(200).json({
                        success: true,
                        message: "Technical background has been updated"
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
    addUserPreference,
    updatePreferences,
    updateTechBackground,
    login,
    logout
}
