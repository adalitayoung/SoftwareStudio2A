const Class = require('../models/class-reference.js');
const Project = require('../models/project-model')
const ProjectRoles = require('../models/projectRoles-model')
const ExcelJS = require('exceljs')
const fs = require('fs')
var xlsx = require('xlsx')
var path = require('path')
var targetDir = path.join(__dirname, '../');
var files = fs.readdirSync(targetDir)
var combinedData = []


outputToExcel = async(req, res) => {
  console.log(req.params.id)
  Project.find({classID:req.params.id})
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
   await workbook.xlsx.writeFile('projects.xlsx')

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
     })
     .catch(err => console.log(err))

   })
  //await  mergeData()

   res.download('./projects.xlsx', function(err) {
// res.sendFile(targetDir+'/ClassProjects.xlsx', function(err) {
    if (err) {
      console.log(err);
    }
   deleteFiles()  //This deletes all the xlsx files created in ./
  })
}

function readFileToJson(filename){
  var wb = xlsx.readFile(filename)
  var firstTabName = wb.SheetNames[0]
  var ws = wb.Sheets[firstTabName]
  var data = xlsx.utils.sheet_to_json(ws)
  return data
}

function mergeData(){
  files.forEach((file, i) => {
    if(path.parse(file).ext ==='.xlsx' && file !== 'projects.xlsx'){
      combinedData = combinedData.concat(readFileToJson(path.join(targetDir,file)))
    }
  })

  var newWB = xlsx.readFile('./projects.xlsx')
  var newWS = xlsx.utils.json_to_sheet(combinedData)
  xlsx.utils.book_append_sheet(newWB, newWS, "Roless")
  xlsx.writeFile(newWB, "./ClassProjects.xlsx")
}

function deleteFiles(){
    var filepath =''
    files.forEach((file, i) => {
      if(path.parse(file).ext ==='.xlsx'){
        //console.log(file)
        filepath = targetDir+file
        console.log('Deleted file--> ' + filepath)
        fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      }
    })
}

module.exports ={
  outputToExcel
}
