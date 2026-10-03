import Complaint from "../models/Complaint.js";
import Student from "../models/Student.js";

const addComplaint = async (req, res) => {
    try {
        // Use authenticated user id instead of trusting client-provided userId
        const userId = req.user && req.user._id
        const { complaintType, date, complaint } = req.body

        const student = await Student.findOne({ userId })
        if (!student) {
            return res.status(400).json({ success: false, error: "Student not found" })
        }

        const newComplaint = new Complaint({
            studentId: student._id,
            complaintType,
            date,
            complaint,
        })

        await newComplaint.save()

        return res.status(200).json({ success: true })

    } catch (error) {
        console.error('addComplaint error:', error.message)
        return res.status(500).json({ success: false, error: "complaint add server error" })
    }
}

const getComplaint = async (req, res) => {
    try {
        // If the requester is a student, use their authenticated id. Otherwise use provided :id param
        const requester = req.user
        const paramId = req.params.id
        const userId = requester && requester.role === 'student' ? requester._id : paramId

        const student = await Student.findOne({ userId })
        if (!student) {
            // return empty list so UI can render gracefully
            return res.status(200).json({ success: true, complaints: [] })
        }

        const complaints = await Complaint.find({ studentId: student._id })
        return res.status(200).json({ success: true, complaints })
    } catch (error) {
        console.error('getComplaint error:', error.message)
        return res.status(500).json({ success: false, error: "complaint fetch server error" })
    }
}
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate({
            path: "studentId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true, complaints})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "complaint add server error"})
    }
}

const getComplaintDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint.findById({_id: id}).populate({
            path: "studentId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true, complaint})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "complaint add server error"})
    }
}

const updateComplaints = async (req, res) => {
    try{
        const { id } = req.params;
        const complaint = await Complaint.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!complaint) {
            return res.status(500).json({success: false, error: "complaint not founded"})
        }
        return res.status(200).json({success: true})
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "complaint update server error"})
    }
}

export {addComplaint, getComplaint, getComplaints, getComplaintDetail, updateComplaints}