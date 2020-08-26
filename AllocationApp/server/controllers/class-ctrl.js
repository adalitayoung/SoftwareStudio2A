const Course = require('../models/class-reference.js')

createClass = (req, res) => {
    const body = req.body
    return res.status(400).json({
        success: false,
        error: 'You must provide course information',
        body: body
    })
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide course information'
        })
    }

    const course = new Course(body)

    if (!couse){
        return res.status(400).json({
            success:false,
            error: err
        })
    }

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

module.exports = {
    createClass
}