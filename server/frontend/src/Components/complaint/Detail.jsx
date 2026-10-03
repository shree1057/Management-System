import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [ complaint, setComplaints ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/complaint/detail/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                
                if (response.data.success) {
                    setComplaints(response.data.complaint)
                }
            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } 
        };

        fetchComplaint();
    }, []);

    const changeStatus = async (id, status) => {
        try {
                const response = await axios.put(
                    `http://localhost:5000/api/complaint/${id}`, {status},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                
                if (response.data.success) {
                    navigate('/admin-dashboard/complaints')
                }
            } catch(error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } 
    }

    return (
        <>{complaint ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Complaint Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{complaint.studentId?.userId?.name || ''}</p>
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">Student ID:</p>
                        <p className="font-medium">{complaint.studentId?.studentID || ''}</p>
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">Complaint Type:</p>
                        <p className="font-medium">
                            {(complaint.complaintType)}
                        </p>
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">Compalint:</p>
                        <p className="font-medium">{complaint.complaint}</p>
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">Date:</p>
                        <p className="font-medium">{new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-3 mb-2">
                        <p className="text-lg font-bold">
                            {complaint.status === "Pending" ? "Action:" : "Status"}
                        </p>
                        {complaint.status === "Pending" ? (
                            <div className="flex space-x-2">
                                <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                                onClick={() => changeStatus(complaint._id, "Approved")}>Approve</button>
                                <button className="px-2 py-0.5 bg-red-300 hover:bg-red-400"
                                onClick={() => changeStatus(complaint._id, "Rejected")}>Reject</button>
                            </div>
                        ) :
                         <p className="font-medium">{complaint.status}</p>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        ): <div> Loading....</div> }</>
    )
}

export default Detail;