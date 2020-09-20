const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')
const Class = require('../models/class-reference.js')
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

            //find class ID based of class name
            var className = body.className;
            var classID;
             Class.find({name : className}).exec(function(err, classReferences){
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'user not found!',
                    })
                }
                if (classReferences.length){
                    classID = classReferences[0]._id;
                    //Check that the student is not already enrolled in class
                     TempStudent.find({ studentID: id, classID: classID}).exec(function(err, tempStudents){
                        if (tempStudents.length){
                            return res.status(400).json({
                                success: false,
                                error: 'Student is already enrolled in that class'
                            })
                        }
                        else {
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


                        }
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

//a function to update the project preferences and technical background of the students
addPreferencesBackground = async (req, res) => {
 
          var studentID=req.body.studentID;
      var projectPreference1=req.body.projectPreference1;
      var projectPreference2=req.body.projectPreference2;
      var projectPreference3=req.body.projectPreference3;
      var technicalBackground=req.body.technicalBackground;
      const TempStudentxx = new TempStudent({
        studentID:studentID,
        projectPreference1:projectPreference1,
        projectPreference2:projectPreference2,
        projectPreference3:projectPreference3,
        technicalBackground:technicalBackground
      });
      TempStudentxx.save().then(data=>{
        console.log("saved")
        res.send(data)
      }).catch(err=>{
          throw err;
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
                role: users[0].role,
                id: users[0].id
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
    // addUserPreference,
    // updatePreferences,
    login,
    updateUserRole,
    fetchUserData,
    addStudentToClass,
    addPreferencesBackground,
//    updateTechBackground,
    logout

}
