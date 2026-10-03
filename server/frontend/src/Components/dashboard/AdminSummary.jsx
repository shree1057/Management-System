import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaUser,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import axios from 'axios';

const AdminSummary = () => {
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
                    headers : {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setSummary(summary.data)
            } catch(error) {
                if(error.response) {
                    alert(error.response.data.error)
                }
                console.log(error.message)
            }
        }
        fetchSummary();
    }, [])

    if(!summary) {
        return <div>Loading...</div>
    }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUser />}
          text="Total Students"
          number={summary.totalStudents}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Complaint Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Complaint Applied"
            number={summary.complaintSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Complaint Approved"
            number={summary.complaintSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Complaint Pending"
            number={summary.complaintSummary.rejected}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Complaint Rejected"
            number={summary.complaintSummary.pending}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
