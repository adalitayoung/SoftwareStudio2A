const User = require('../models/user-model.js')

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

module.exports = {
    createUser,
}