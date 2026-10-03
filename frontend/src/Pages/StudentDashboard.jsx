import React from "react";
import Sidebar from '../Components/StudentDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from "../Components/dashboard/Navbar";

const StudentDashboard = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default StudentDashboard;