const User = require('../models/user-model.js')
const TempUser = require('../models/temp-student-model.js')

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

addPreference = (req, res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const email = body.email;

    User.find({email: email}).exec(function(err, users){

        if (err) {
            return res.status(404).json({
                err,
                message: 'user not found!',
            })
        }

        if (users.length){
            var id = users[0]._id;
            //console.log(id);
            
            return res.status(201).json({
                success: true,
                message: 'found',
                id: id
            })   
            
        }       
    })

    //get student user id based of email
    //get student project preferences from user input
    //get student tech background
    //save student id, project preferences, and projectid(initially null) to db
}

module.exports = {
    createUser,
    addPreference
}
