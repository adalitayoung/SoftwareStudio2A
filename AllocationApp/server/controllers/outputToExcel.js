const Class = require('../models/class-reference.js');
const Project = require('../models/project-model')
const ProjectRoles = require('../models/projectRoles-model')
const ExcelJS = require('exceljs')
const fs = require('fs')

outputToExcel = async(req, res) => {
  const projects = await Project.find({})
  .then(projects => exportDataToSheet(req, res, projects))
  .catch(err => console.log(err))
}

function exportDataToSheet(req, res, projects){
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Class Project Details');
  worksheet.columns = [
    {header: 'projectName', key: 'projectName', width: 12}
  ]
   projects.forEach((project, i) => {
     worksheet.addRow(project)
   })
   workbook.xlsx.writeFile('projects.xlsx')
   res.download('./projects.xlsx', function(err) {
    if (err) {
      console.log(err);
    }
   deleteFile()  //This deletes the projects.xlsx file created in ./
  })

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
