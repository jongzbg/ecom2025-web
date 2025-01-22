import React, { useEffect, useState } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../util/numberFormat'
import { dateFormat } from '../../util/dateFormat'
import { getStatusColor } from '../../util/getStatusColor'

const HistoryCard = () => {
  const token = useEcomStore((s) => s.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    handleGetOrders(token)
  }, [])

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res)
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <div className='space-y-4'>
      <h1 className='font-bold text-2xl'>Order History</h1>

      {/* คลุม */}
      <div className='space-y-4'>
        {/* Card Loop Order */}
        {
          orders?.map((item, index) => {
            // console.log(item)
            return (
              <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                {/* Header */}
                <div className='flex justify-between mb-2'>
                  <div>
                    <p className='text-sm'>Order date</p>
                    <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                  </div>
                  <div>
                  <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>                      {item.orderStatus}
                    </span>

                  </div>
                </div>

                {/* Table loop Product */}
                <div>
                  <table className='border w-full'>
                    <thead>
                      <tr className='bg-gray-200'>
                        <th>Product</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Total</th>

                      </tr>
                    </thead>


                    <tbody>

                      {
                        item.products?.map((item, index) => {
                          // console.log(item)
                          return (
                            <tr key={index}>
                              <td>{item.product.title}</td>
                              <td>{numberFormat(item.product.price)}</td>
                              <td>{item.count}</td>

                              <td>{numberFormat(item.count * item.product.price)}</td>
                            </tr>
                          )
                        })
                      }


                    </tbody>

                  </table>
                </div>

                {/* TOtal */}
                <div>
                  <div className='text-right'>
                    <p className='text-xl font-bold'>Total</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>



    </div>
  )
}

export default HistoryCard