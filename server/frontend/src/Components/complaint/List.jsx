import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    let sno = 1;
    const { id } = useParams();
    
    const fetchComplaints = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/complaint/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setComplaints(response.data.complaints);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [user]);

    if(!complaints) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Complaints</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                 type="text"
                 placeholder="Search By Dep Name"
                 className="px-4 py-0.5 border" 
                />
                {user.role === "student" &&(
                <Link
                  to="/student-dashboard/add-complaint"
                  className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Complaint
                </Link>
                )}
            </div>
            <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SNO</th>
                        <th className="px-6 py-3">Complaint Type</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Complaint</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr
                         key={complaint._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-3">{sno++}</td>
                            <td className="px-6 py-3">{complaint.complaintType}</td>
                            <td className="px-6 py-3">{new Date(complaint.date).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{complaint.complaint}</td>
                            <td className="px-6 py-3">{complaint.status}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    )
}

export default List;