const jwt = require('jsonwebtoken')
const User = require('./models/user-model.js')

module.exports = function(req, res, next) {
  const token = req.header('auth-token')
  if(!token) return res.status(401).send('Access Denied')
    const verified = jwt.verify(token, process.env.TOKEN_CODE)
    //req.users = verified
    User.find({_id:verified._id}).exec(function(err, userinfo){
        if (!userinfo.length){
            return res.status(400).json({
                success: false,
                error: 'User not found'
            })
        }else{
          req.userName=userinfo[0].fullName
          req.userID=userinfo[0]._id
          req.userRole=userinfo[0].role
          //console.log(userinfo)
        }
    next()
  })

}
