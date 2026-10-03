import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Add = () => {
    const { user } = useAuth()

    const [complaint, setComplaint] = useState({
        userId: user?.id || user?._id || "",   
    complaintType: "",
    date: "",
    complaint: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setComplaint((prevState) => ({...prevState, [name] : value,
            userId: user?._id || prevState.userId 
        }))
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting complaint:", complaint);


        try {
                const response = await axios.post(
                    `http://localhost:5000/api/complaint/add`, complaint,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                
                if (response.data.success) {
                    // Navigate to the student's complaints page when we have a user id
                    if (user && (user._id || user.id)) {
                        navigate(`/student-dashboard/complaints/${user._id || user.id}`)
                    } else {
                        // Fallback to dashboard to avoid unmatched-route warning
                        navigate('/student-dashboard')
                    }
                }
            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } 
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Request for complaint</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Complaint Type
                        </label>
                        <select
                         name="complaintType"
                         onChange={handleChange}
                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                         required
                        >
                            <option value="">Select Department</option>
                            <option value="Hostel Complaint">Hostel Complaint</option>
                            <option value="Faculty Complaint">Faculty Complaint</option>
                            <option value="Academics Complaint">Academics Complaint</option>
                            <option value="Library Complaint">Library Complaint</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                               Date
                            </label>
                            <input
                             type="date"
                             name="date"
                             onChange={handleChange}
                             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                             required
                            />
                        </div>
                       </div>

                        {/* Complaint */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                               Complaint
                            </label>
                            <textarea
                             name="complaint"
                             placeholder="complaint"
                             onChange={handleChange}
                             className="w-full border border-gray-300"
                            ></textarea>
                        </div>
                    </div>
                    <button
                     type="submit"
                     className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Submit
                    </button>
            </form>
        </div>
    )
}

export default Add;