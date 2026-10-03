import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentID: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    department: { type: Schema.Types.ObjectId, ref:"Department" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Student = mongoose.model("Student", studentSchema);
export default Student;