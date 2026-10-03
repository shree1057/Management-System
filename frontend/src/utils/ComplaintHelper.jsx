import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Stud ID",
        selector: (row) => row.studentId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Complaint Type",
        selector: (row) => row.complaintType,
        width: "140px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "170px",
    },
    {
        name: "Date",
        selector: (row) => row.date,
        width: "120px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px",
    },
    {
    name: "Action",
    selector: (row) => row.action,
    width: "100px",
    },
];

export const ComplaintButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/complaints/${id}`)
    };

    return (
        <button
         className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
         onClick={() => handleView(Id)}
        >
            View
        </button>
    );
};
