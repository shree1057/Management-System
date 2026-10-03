import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, StudentButtons } from '../../utils/StudentHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
    const [students, setStudents ] = useState([])
    const [studLoading, setStudLoading] = useState(false)
    const [filteredStudent, setFilteredStudents] = useState([])

    useEffect(() => {
        const fetchStudents = async () => {
            setStudLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/student',{
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success) {
                    let sno = 1;
                    console.log(response.data)
                    const data = await response.data.students.map((stud) => (
                        {
                            _id: stud._id,
                            sno: sno++,
                            dep_name: stud.department.dep_name,
                            name: stud.userId.name,
                            dob: new Date(stud.dob).toLocaleDateString(),
                            action: (<StudentButtons Id={stud._id} />),
                        }
                    ));
                    setStudents(data);
                    setFilteredStudents(data);
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setStudLoading(false)
            }
        };
        fetchStudents();
    }, []);

    const handleFilter = (e) => {
        const records = students.filter((stud) => (
            stud.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredStudents(records)
    }

    return (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Sudents</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                 type="text"
                 placeholder="Search By Dep Name"
                 className="px-4 py-0.5 border"
                 onChange={handleFilter}
                />
                <Link
                 to="/admin-dashboard/add-student" 
                 className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add New Student
                </Link>
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filteredStudent} pagination/>
            </div>
        </div>
    )
}

export default List