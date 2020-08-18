const assert = require('assert');
const expect = require('chai');

const userCtrl = require('../controllers/user-ctrl')
const User = require('../models/user-model');

describe('Add User to Database', () => {
    it('should create user', () => {
        const user = new User({
            "firstName":"Test",
            "lastName":"TestLast",
            "email":"testemail@gmail.com",
            "password":"password",
            "role":"StudentTest"
        });
        user.save().then(() => {
            User.find({email: "testemail@gmail.com"}).exec(function(err, users){
                expect(users.length).to.equal(1);
            })
        })
        
    })

    it('should fail to add user again', () => {
        const user = new User({
            "firstName":"Test",
            "lastName":"TestLast",
            "email":"testemail@gmail.com",
            "password":"password",
            "role":"StudentTest"
        });

        User.find({email: user.email}).exec(function(err, users){
            expect(users.length).to.equal(1);
        })

        
    })
    it('should clean up', () => {
        User.findOneAndDelete({email: "testemail@gmail.com"}).exec(function(err, document) {
            User.find({email: "testemail@gmail.com"}).exec(function(err, users){
                expect(users.length).to.equal(0)
            })
        })
    })
})