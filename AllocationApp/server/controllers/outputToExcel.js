const Class = require('../models/class-reference.js');
const Project = require('../models/project-model')
const ProjectRoles = require('../models/projectRoles-model')
const ExcelJS = require('exceljs')
const fs = require('fs')

outputToExcel = async(req, res) => {
  Project.find({classID:req.body.classID})
  .then(projects => exportDataToSheet(req, res, projects))
  .catch(err => console.log(err))
}

  async function exportDataToSheet (req, res, projects) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Class Project Details');
  worksheet.columns = [
    {header: 'Project ID', key: '_id', width: 30},
    {header: 'Project Name', key: 'projectName', width: 20},
    {header: 'Description', key: 'description', width: 100}
]
   await projects.forEach((project, i) => {
     worksheet.addRow(project)
   })
   workbook.xlsx.writeFile('projects.xlsx')

   await projects.forEach((project, i) => {
     var workbook2 = new ExcelJS.Workbook()
     var projectDetailsSheet = workbook2.addWorksheet(project.projectName + " " + i) // These sheets will have project Roles and project Details
     projectDetailsSheet.columns = [

       {header: 'Project ID', key: 'projectID', width: 30},
       {header: 'Role Type', key: 'roleType', width: 30},
       {header: 'Positions Required', key: 'positionsRequired', width: 30},
       {header: 'Positions Left', key: 'positionsLeft', width: 30},
       {header: 'Students Enrolled IDs', key: 'studentsEnrolledID', width: 30}
     ]
     ProjectRoles.find({projectID: project._id})
     .then(projectroles => {
      projectroles.forEach((roles, i) => {
        projectDetailsSheet.addRow(roles)
      });
     workbook2.xlsx.writeFile(project.projectName + " " + i + ".xlsx")
     })    // This is not working
     .catch(err => console.log(err))

   })

   res.download('./projects.xlsx', function(err) {
    if (err) {
      console.log(err);
    }
  // deleteFile()  //This deletes the projects.xlsx file created in ./
  })
}

function mergeExcelData(){

}

function deleteFile(){
    const filepath ='./projects.xlsx'
    fs.unlink(filepath, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports ={
  outputToExcel
}

//
