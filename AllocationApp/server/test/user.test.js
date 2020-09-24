const assert = require('assert');
// const expect = require('chai');
const chai = require('chai');
let should = chai.should();

let chaiHttp = require('chai-http');
let server = require('../index.js');
const userCtrl = require('../controllers/user-ctrl')
const User = require('../models/user-model');

// describe('Add User to Database', () => {
//     it('should create user', (done) => {
//         const user = new User({
//             "fullName":"Test",
//             "email":"testemail@gmail.com",
//             "password":"password",
//             "role":"StudentTest"
//         });
//         chai.request(server)
//             .post('/api/user/createUser/')
//             .send(user)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(201)
//                 done()
//             })
        
//     })

//     it('should fail to add user again', (done) => {
//         const user = new User({
//             "fullName":"Test",
//             "email":"testemail@gmail.com",
//             "password":"password",
//             "role":"StudentTest"
//         });

//         chai.request(server)
//             .post('/api/user/createUser/')
//             .send(user)
//             .end((err, res) => {
//                 chai.expect(res.status).to.equal(400)
//                 done()
//             })

        
//     })
//     it('should clean up', (done) => {

//         chai.request(server)
//             .delete('/api/user/deleteUser/'+"testemail@gmail.com")
//             .end((err, res) => {
//                 if(err){
//                     console.log(err)
//                 }
//                 res.should.have.status(200)
//                     done();
//             })
//     })
// })