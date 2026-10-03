import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = () => {
    const { id } = useParams();
    const [ student, setStudent ] = useState(null)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/student/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                
                if (response.data.success) {
                    setStudent(response.data.student)
                }
            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } 
        };

        fetchStudent();
    }, []);

    return (
        <>{student ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Student Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{student.userId?.name}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Student ID:</p>
                        <p className="font-medium">{student.studentID}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Date of Birth</p>
                        <p className="font-medium">
                            {student.dob ? new Date(student.dob).toLocaleDateString() : ''}
                        </p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{student.gender}</p>
                    </div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{student.department?.dep_name}</p>
                    </div>
                </div>
            </div>
        </div>
        ): <div> Loading....</div> }</>
    )
}

export default View;