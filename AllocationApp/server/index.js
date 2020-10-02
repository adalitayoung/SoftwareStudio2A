const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const db = require('./db')
const userRouter = require('./routes/user-router')
const classRouter = require('./routes/class-router')
const projectRouter = require('./routes/project-router')

const app = express()
const apiPort = 3000

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.use(bodyParser.json())
app.use(cookieParser());
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/user', userRouter)
app.use('/api/class', classRouter)
app.use('/api/project', projectRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

module.exports = app
