import React, { useEffect, useState } from 'react'
import { getListAllUser } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { changeUserStatus, changeUserRole } from '../../api/admin'
import { toast } from 'react-toastify'


const TableUser = () => {
    const token = useEcomStore((s) => s.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUser(token)
            .then((res) => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))  // if have only one parameter can use short code like this
    }

    const handleChangeUserStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Status Success!!')
            })
            .catch(err => console.log(err))
    }
    const handleChangeUserRole = (userId, userRole) => {
        console.log(userId, userRole)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Role Success!!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>

            <div className='container mx-auto p-4 bg-white shadow-md'>
                <table className=' w-full'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Adress</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            users?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        {/* {item.role} */}
                                        <select
                                            onChange={(e) => handleChangeUserRole(item.id, e.target.value)}
                                            value={item.role}>
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>
                                    </td>
                                    <td>{item.address}</td>
                                    <td>
                                        {item.enabled ? 'Active' : 'InActive'}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                                            className='bg-orange-400 text-white hover:bg-orange-500 hover:scale-105  px-2 py-1 rounded-md shadow-md'>
                                            {item.enabled ? 'Disable' : 'Enable'}
                                        </button>
                                    </td>

                                </tr>
                            )
                        }


                    </tbody>


                </table>
            </div>
        </div>
    )
}

export default TableUser