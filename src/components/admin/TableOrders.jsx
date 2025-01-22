import React, { useEffect, useState } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../util/numberFormat'
import { dateFormat } from '../../util/dateFormat'
import { getStatusColor } from '../../util/getStatusColor'


const TableOrders = () => {
    const token = useEcomStore((s) => s.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrders(token)
    }, [])

    const handleGetOrders = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                console.log('res', res)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status to ' + orderStatus + ' Success!')
                handleGetOrders(token)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }


    // console.log(token)
    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div >

                <table className='border w-full'>
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th>No.</th>
                            <th>Uername</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index} className='border'>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                            <p>{item.orderedBy.address}</p>
                                        </td>
                                        <td>{dateFormat(item.createdAt)}</td>
                                        <td className='px-2 py-4'>
                                            {
                                                item.products?.map((product, index) =>
                                                    <li key={index}>

                                                        {product.product.title} {"  "}
                                                        <span className='text-sm'>{product.count} x {numberFormat(product.product.price)}</span>


                                                    </li>

                                                )
                                            }
                                        </td>
                                        <td>{numberFormat(item.cartTotal)}</td>
                                        <td>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>

                                            </select>
                                        </td>




                                    </tr>

                                )
                            })
                        }
                    </tbody>



                </table>

            </div>
        </div >
    )
}

export default TableOrders