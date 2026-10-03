import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import connectToDatabase from './db/db.js'
import studentRouter from './routes/student.js'
import departmentRouter from './routes/department.js'
import complaintRouter from './routes/complaint.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/student', studentRouter)
app.use('/api/complaint', complaintRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT ${process.env.PORT}`)
})