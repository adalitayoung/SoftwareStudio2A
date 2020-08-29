const Project = require('../models/project-model.js')

createProject = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a project'
    })
  }

  const project = new Project(body)

  if (!project)
}
