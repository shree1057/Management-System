import Complaint from "../models/Complaint.js";
import Department from "../models/Department.js";
import Student from "../models/Student.js"


const getSummary = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const studentAppliedForComplaint = await Complaint.distinct('studentId')

        const complaintStatus = await Complaint.aggregate([
            {$group: {
                _id: "$status",
                count: {$sum: 1}
            }}
        ])

        const complaintSummary = {
            success: true,
            appliedFor: studentAppliedForComplaint.length,
            approved: complaintStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: complaintStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: complaintStatus.find(item => item._id === "Pending")?.count || 0,
        }

        return res.status(200).json({
            totalStudents,
            totalDepartments,
            complaintSummary
        })
    } catch(error) {
        return res.status(500).json({success: false, error: "dashboard summary error"})
    }
}

export {getSummary}