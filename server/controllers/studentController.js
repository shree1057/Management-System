import Student from "../models/Student.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import Department from '../models/Department.js'
    
const addStudent = async (req, res) => {
    try{

    const {
        name,
        email,
        studentID,
        dob,
        gender,
        department,
        password,
        role,
    } = req.body;
    console.log(req.body)

    // validate department if provided
    if (department) {
        const dept = await Department.findById(department);
        if (!dept) {
            return res.status(400).json({success: false, error: "Department not found"});
        }
    }

    const user = await User.findOne({email});
    if(user) {
        return res.status(400).json({success: false, error: "User already registered"});
    }

    if(!password) {
        return res.status(400).json({ success: false, error: "Password is required" });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        email,
        password: hashPassword,
        role,
    })
    const savedUser = await newUser.save()

    const newStudent = new Student({
        userId: savedUser._id,
        studentID,
        dob,
        gender,
        department,
    })

    await newStudent.save()
    return res.status(200).json({success: true, message: "student created"})

  } catch(error) {
    console.log(error.message)
    return res.status(500).json({success: false, error: "server error in adding student"})
  }
}

const getStudents = async (req, res) => {
    try{
        const students = await Student.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({success: true, students})
    } catch(error) {
        return res.status(500).json({success: false, error: "get students server error"})
    }
}

const getStudent = async (req, res) => {
    const {id} = req.params;
    try{
        let student 
      student = await Student.findById(id).populate('userId', {password: 0}).populate("department")
      if(!student) {
       student = await Student.findOne({userId: id}).populate('userId', {password: 0}).populate("department")
      }
        return res.status(200).json({success: true, student})
    } catch(error) {
        return res.status(500).json({success: false, error: "get students server error"})
    }
}

const updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const {
        name,
        department,
    } = req.body;

    const student = await Student.findById(id)
    if(!student) {
        return res.status(404).json({success: false, error: "student not found"})
    }

    const user = await User.findById(student.userId)
    if(!user) {
        return res.status(404).json({success: false, error: "user not found"})
    }

    const updateUser = await User.findByIdAndUpdate(student.userId, {name})
    const updatestudent = await Student.findByIdAndUpdate( id, {
        department,
    })

    if(!updatestudent || !updateUser) {
        return res.status(404).json({success: false, error: "document not found"})
    }

    return res.status(200).json({success: true, message: "student update"})

    } catch(error) {
        return res.status(500).json({success: false, error: "update students server error"})
    }
}

export {addStudent, getStudents, getStudent, updateStudent}