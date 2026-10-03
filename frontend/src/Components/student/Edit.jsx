import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/StudentHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {

    const [student, setStudent] = useState({
        name: '',
        department: '',
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
            const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
            };
            getDepartments();
        },[]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const responnse = await axios.get(
                    `http://localhost:5000/api/student/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                
                if (responnse.data.success) {
                    const student = responnse.data.student
                    setStudent((prev) => ({...prev,
                         name: student.userId.name,
                         department: student.department
                        }));
                }
            } catch(error) {
                if (error.responnse && !error.responnse.data.success) {
                    alert(error.responnse.data.error)
                }
            } 
        };

        fetchStudent();
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
            setStudent((prevData) => ({...prevData, [name] : value}))
        }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:5000/api/student/${id}`, student, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/students")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{departments && student ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/*Name*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={student.name}
                          onChange={handleChange}
                          placeholder="Insert Name"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        />
                    </div>

                    {/*Department*/}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select
                          name="department"
                          value={student.department}
                          onChange={handleChange}
                          placeholder="Insert Name"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                 type="Submit"
                 className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Edit Student
                </button>
            </form>
        </div>
        ) : <div>Loading....</div>} </>
    );
};

export default Edit;