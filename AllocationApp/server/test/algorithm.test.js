const assert = require('assert');
// const expect = require('chai');
const chai = require('chai');
let should = chai.should();

let chaiHttp = require('chai-http');
let server = require('../index.js');

const algorithmCtrl = require('../controllers/algorithm-ctrl')

const Course = require('../models/class-reference.js')
const Project = require('../models/project-model.js')
const ProjectRole = require('../models/projectRoles-model.js')
const User = require('../models/user-model.js')
const TempStudent = require('../models/temp-student-model.js')

chai.use(chaiHttp);

describe('Run Algorithm', () => {
    it('should create users', (done) => {

        let array = []
        for (let i=0; i<50; i++) {
            array.push(i)
        }
        
        var counter = 0;

        array.forEach(function(i, index, array) {
            
            const user = new User({
                "fullName":"Test"+i,
                "email":"testemail"+i+"@gmail.com",
                "password":"password",
                "role":"Student"
            });
            chai.request(server)
            .post('/api/user/createUser/')
            .send(user)
            .end((err, res) => {
                // console.log(err)
                console.log("testemail"+i+"@gmail.com")
                chai.expect(res.status).to.equal(201)
                counter++;
                if (counter === array.length) {
                    done();
                }
            })

        })
        
    })

    it('should create a class', () => {
        const course = new Course({
            "name": "Test Class"
        })
        chai.request(server)
        .post('/api/class/createClass/')
        .send(course)
        .end((err, res) => {
            res.should.have.status(201);
        })
    })

    it('should create three projects', (done) => {
        const course = new Course({
            "name": "Test Class"
        })
        chai.request(server)
        .get('/api/class/getClass/'+course.name)
        .end((err, res) => {
            res.should.have.status(200);
            console.log(res.body.data._id)

            const projects = [
                new Project({
                "classID": res.body.data._id,
                "projectName": "Project 1",
                "description": "test description",
                "studentMin": 10,
                "studentMax": 20,
            }), new Project({
                "classID": res.body.data._id,
                "projectName": "Project 2",
                "description": "test description",
                "studentMin": 10,
                "studentMax": 20,
            }), new Project({
                "classID": res.body.data._id,
                "projectName": "Project 3",
                "description": "test description",
                "studentMin": 10,
                "studentMax": 20,
            })]
            var counter = 0;
            projects.forEach(function(project, index, array) {
                chai.request(server)
                .post('/api/project/createProject/')
                .send(project)
                .end((err, res) => {
                    res.should.have.status(200);
                    counter++;
                    if (counter === array.length) {
                        done()
                    }
                })
            })            
        })

        
    })

    // it('should add users to a class', () => {
    //     for (i=0; i<100; i++) {
    //         User.find({email: "testemail"+i+"@gmail.com"}).exec(function(err, users){
    //             const tempStudent = new TempStudent({

    //             })
    //         })
    //     }
    // })
    
    

    it('should clean up users', (done) => {
        
        let array = []
        for (let i=0; i<50; i++) {
            array.push(i)
        }

        var counter = 0;
        array.forEach(function(i, index, array) {
            const user = new User({
                "fullName":"Test"+i,
                "email":"testemail"+i+"@gmail.com",
                "password":"password",
                "role":"Student"
            });

            chai.request(server)
            .delete('/api/user/deleteUser/'+user.email)
            // .send(user)
            .end((err, res) => {
                // console.log(err)
                if(err){
                    console.log(error)
                }
                // chai.expect(res.status).to.equal(200)
                res.should.have.status(200)
                counter++;
                if (counter == array.length) {
                    done();
                }
            })
        })
        

        
    })

    // it('should clean up projects', (done) => {
    // #TODO
    // })

    it('should clean up courses', (done) => {
        Course.findOneAndDelete({name: "Test Class"}).exec(function(err, courses){
            Course.find({name: "Test Class"}).exec(function(err, courses){
                chai.expect(courses.length).to.equal(0);
                done();
            })
        })
    })
})