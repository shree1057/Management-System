import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './Components/dashboard/AdminSummary';
import DepartmentList from './Components/department/DepartmentsList';
import AddDepartment from './Components/department/AddDepartment'
import EditDepartment from './Components/department/EditDepartment';
import List from './Components/student/List';
import Add from './Components/student/Add';
import View from './Components/student/View';
import Edit from './Components/student/Edit';
import Summary from './Components/StudentDashboard/Summary';
import ComplaintList from './Components/complaint/List'
import AddComplaint from './Components/complaint/Add'
import Setting from './Components/StudentDashboard/Setting'
import Table from './Components/complaint/Table';
import Detail from './Components/complaint/Detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route> 
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
             <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary/>}></Route>

          <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
          <Route path="/admin-dashboard/students" element={<List/>}></Route>
          <Route path="/admin-dashboard/add-student" element={<Add/>}></Route>
          <Route path="/admin-dashboard/students/:id" element={<View/>}></Route>
          <Route path="/admin-dashboard/students/edit/:id" element={<Edit/>}></Route>
          <Route path="/admin-dashboard/complaints" element={<Table/>}></Route>
          <Route path="/admin-dashboard/complaints/:id" element={<Detail/>}></Route>
          <Route path="/admin-dashboard/students/complaints/:id" element={<ComplaintList/>}></Route>
          <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>

        </Route>

        <Route path="/student-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "student"]}>
          <StudentDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
         }
        >
          <Route index element={<Summary/>}></Route>
          <Route path='/student-dashboard/profile/:id' element={<View/>}></Route>
          <Route path='/student-dashboard/complaints/:id' element={<ComplaintList/>}></Route>
          <Route path='/student-dashboard/add-complaint' element={<AddComplaint/>}></Route>
          <Route path='/student-dashboard/setting' element={<Setting/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
