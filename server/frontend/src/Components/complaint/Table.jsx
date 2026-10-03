import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns as complaintColumns, ComplaintButtons } from "../../utils/ComplaintHelper";
import axios from "axios";

const Table = () => {
    const [complaints, setComplaints] = useState([])
    const [filteredComplaints, setFilteredComplaints] = useState([])

    const fetchComplaints = async () => {
        try {
                const response = await axios.get('http://localhost:5000/api/complaint',{
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log("Full API response:", response.data);

                console.log(response.data)
                if(response.data.success) {
                    let sno = 1;
                    console.log(response.data)
                    const data = response.data.complaints.map((complaint) => ({
                        _id: complaint._id,
                        sno: sno++,
                        studentId: complaint.studentId?.studentID || '',
                        name: complaint.studentId?.userId?.name || '',
                        complaintType: complaint.complaintType,
                        department: complaint.studentId?.department?.dep_name || '',
                        date: complaint.date ? new Date(complaint.date).toLocaleDateString() : '',
                        status: complaint.status,
                        action: <ComplaintButtons Id={complaint._id} />,
                    }));
                    setComplaints(data);
                    setFilteredComplaints(data);
                }
            } catch (error) {
                console.error("Error fetching complaints:", error);
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
    }
    useEffect(() => {
        fetchComplaints()
    }, [])

    const filterByInput = (e) => {
        const data = complaints.filter(complaint =>
            complaint.studentID
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
        setFilteredComplaints(data)
    };

    const filterByButton = (status) => {
        const data = complaints.filter(complaint =>
            complaint.status
            .toLowerCase()
            .includes(status.toLowerCase())
        );
        setFilteredComplaints(data)
    };

    return (
        <>{filteredComplaints ? (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Complaints</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                 type="text"
                 placeholder="Search By Stud Id"
                 className="px-4 py-0.5 border" 
                 onChange={filterByInput}
                />
                <div className="space-x-3">
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                     onClick={() => filterByButton("Pending")}>
                        Pending
                    </button>
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                     onClick={() => filterByButton("Approved")}>
                        Approved
                    </button>
                    <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                     onClick={() => filterByButton("Rejected")}>
                        Rejected
                    </button>
                </div>
            </div>
            <div className="mt-3">
            <DataTable columns={complaintColumns} data={filteredComplaints} pagination />
            </div>
        </div>
        ): <div>Loading...</div> }</>
    )
}

export default Table;