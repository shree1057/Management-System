import mongoose from "mongoose";
import { Schema } from "mongoose";

const complaintSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    complaintType: {
        type: String,
        enum: ["Hostel Complaint", "Faculty Complaint", "Academics Complaint", "Library Complaint"],
        required: true,
    },
    date: { type: Date, required: true },
    complaint: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    appliedAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;