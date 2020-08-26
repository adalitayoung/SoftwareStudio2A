const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')

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
                        error: 'Student has already entered preferences'
                    })
                }
                else {
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
    })
}



    //get student user id based of email
    //get student project preferences from user input
    //get student tech background
    //save student id, project preferences, and projectid(initially null) to db


module.exports = {
    createUser,
    addUserPreference
}
