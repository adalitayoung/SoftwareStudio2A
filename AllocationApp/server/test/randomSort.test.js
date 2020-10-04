const assert = require('assert');
// const expect = require('chai');
const chai = require('chai');
let should = chai.should();

let chaiHttp = require('chai-http');
let server = require('../index.js');

const Course = require('../models/class-reference.js')
const Project = require('../models/project-model.js')
const ProjectRole = require('../models/projectRoles-model.js')
const User = require('../models/user-model.js')

chai.use(chaiHttp);

describe('Run Random Sort Algorithm', () => {
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

    it('should create a class', (done) => {
        const course = new Course({
            "name": "Test Class",
            "numberOfStudents" : 100
        })
        chai.request(server)
        .post('/api/class/createClass/')
        .send(course)
        .end((err, res) => {
            res.should.have.status(201);
            done();
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
                    console.log(err)
                    res.should.have.status(200);
                    counter++;
                    if (counter === array.length) {
                        done()
                    }
                })
            })            
        })

        
    })

    // Waiting for backend functionality
    it('should create project roles', (done) => {

        projects = []
        projectRoles = []
        chai.request(server)
        .get('/api/project/showAllProjects/')
        .end((err, res) => {
            if (err) {
                console.log(err)
            }
            res.should.have.status(200)
            projects = res.body
            console.log(projects)
            projectRoles = [
                new ProjectRole({
                    "projectID": projects[0]._id,
                    "roleType": "Front End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID": projects[0]._id,
                    "roleType": "Back End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[0]._id,
                    "roleType": "Full Stack",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[1]._id,
                    "roleType": "Front End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[1]._id,
                    "roleType": "Back End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[1]._id,
                    "roleType": "Full Stack",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[2]._id,
                    "roleType": "Front End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[2]._id,
                    "roleType": "Back End",
                    "positionsRequired": 4
                }),
                new ProjectRole({
                    "projectID":projects[2]._id,
                    "roleType": "Full Stack",
                    "positionsRequired": 4
                }),
            ]

            var counter = 0;
            projectRoles.forEach(function(projectRole, index, array) {
                chai.request(server)
                .post('/api/project/createProjectRole/')
                .send(projectRole)
                .end((err, res) => {
                    console.log("Creating Project Role")
                    if (err) {
                        console.log(err)
                    }
                    res.should.have.status(200);
                    counter++;
                    if (counter === array.length) {
                        done()
                    }
                })
            })

        })
        
    })

    it('should add users to a class', (done) => {

        students = []
        className = "Test Class"
        var counter = 0;
        chai.request(server)
        .get('/api/user/getAllStudentIds/Student')
        .end((err, res) => {
            if (err) {
                console.log(err)
            }
            res.should.have.status(200)
            students = res.body
            console.log(students.length)
            students.forEach(function(student, index, array) {
                id = student._id;
                //console.log(typeof id);
                chai.request(server)
                // console.log(student._id)
                // console.log(className)
                .post('/api/user/addToClass/'+id+'/'+className)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    res.should.have.status(201);
                    counter++;
                    if(counter === array.length) {
                        done()
                    }
                })
            })
        })
               
    })
     

    projectPreferences = []

    it('should add user preferences', (done) => {
        chai.request(server)
        .get('/api/user/getAllStudentIds/Student')
        .end((err, res) => {
            if (err) {
                console.log(err)
            }
            res.should.have.status(200)
            students = res.body
        
            var counter = 0;

            projects = []
            chai.request(server)
            .get('/api/project/showAllProjects/')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(200)
                projects = res.body

                projectPreferences = [projects[0]._id,projects[1]._id, projects[2]._id]
                roles = ["Front End", "Back End", "Full Stack"]

                function shuffleArray(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }

                function getRandomInt(max) {
                    return Math.floor(Math.random() * Math.floor(max));
                }

                // Should the project preferences be the ID or the name?
                students.forEach(student => {
                    preferenceArray = shuffleArray(projectPreferences)
                    chai.request(server)
                    .post('/api/user/addPreferencesBackground/')
                    .send({"studentID": student._id, "projectPreference1": preferenceArray[0], 
                        "projectPreference2": preferenceArray[1], "projectPreference3": preferenceArray[2],
                        "technicalBackground": [roles[getRandomInt(3)],roles[getRandomInt(3)]] })
                    .end((err, res) => {
                        // console.log(err)
                        res.should.have.status(200);
                        counter++;
                        if(counter === students.length) {
                            done()
                        }
                    })
                })
            })
        })
    })
    

    it('should start randomsort algorithm', (done) => {
        chai.request(server)
        .get('/api/user/randomSort/')
        .send({"course_name": "Test Class"})
        .end((err, res) => {
            if(err) {
                console.log(err)
            }
            res.should.have.status(200);
            done();
        })
    })

    // it('should clean up users', (done) => {
        
    //     let array = []
    //     for (let i=0; i<50; i++) {
    //         array.push(i)
    //     }

    //     var counter = 0;
    //     array.forEach(function(i, index, array) {
    //         const user = new User({
    //             "fullName":"Test"+i,
    //             "email":"testemail"+i+"@gmail.com",
    //             "password":"password",
    //             "role":"Student"
    //         });

    //         chai.request(server)
    //         .delete('/api/user/deleteUser/'+user.email)
    //         // .send(user)
    //         .end((err, res) => {
    //             // console.log(err)
    //             if(err){
    //                 // console.log(err)
    //             }
    //             // chai.expect(res.status).to.equal(200)
    //             res.should.have.status(200)
    //             counter++;
    //             if (counter == array.length) {
    //                 done();
    //             }
    //         })
    //     })
        

        
    // })

    // it('should clean up projects', (done) => {
    //     var counter = 0;
    //     projectPreferences.forEach((project) => {
    //         chai.request(server)
    //         .delete('api/project/deleteProject/'+project._id)
    //         .end((err, res) => {
    //             if(err) {
    //                 console.log(err)
    //             }
    //             else{
    //                 res.should.have.status(200)
    //                 counter++;
    //                 if (counter == array.length) {
    //                     done();
    //                 }
    //             }
                
    //         })
    //     })
        

    // })

    // it('should clean up courses', (done) => {
    //     Course.findOneAndDelete({name: "Test Class"}).exec(function(err, courses){
    //         Course.find({name: "Test Class"}).exec(function(err, courses){
    //             chai.expect(courses.length).to.equal(0);
    //             done();
    //         })
    //     })
    // })
})