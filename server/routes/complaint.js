import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addComplaint, getComplaint, getComplaints, getComplaintDetail, updateComplaints } from '../controllers/complaintController.js'

const router = express.Router()

router.post('/add', authMiddleware, addComplaint)
router.get('/detail/:id', authMiddleware, getComplaintDetail)
router.get('/:id', authMiddleware, getComplaint)
router.get('/', authMiddleware, getComplaints)
router.put('/:id', authMiddleware, updateComplaints)

export default router