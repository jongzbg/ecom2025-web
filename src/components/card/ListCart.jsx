import React from 'react'
import { ListCheck } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../util/numberFormat';

const ListCart = () => {

  const cart = useEcomStore((state) => state.carts)
  const user = useEcomStore((s) => s.user)
  const token = useEcomStore((s) => s.token)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
  console.log({ cart })

  const navigate = useNavigate()
  const handleSaveCart = async () => {

    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res)
        toast.success('บันทึกสินค้าใส่ตะกร้าเรียบร้อย')
        navigate('/checkout')
      })
      .catch((err) => {
        console.log('err', err)
        toast.warning(err.response.data.message)
      })
  }

  console.log(user)
  return (
    <div className='bg-gray-100 rounded-md p-4'>
      {/* Header */}
      <div className='flex gap-4'>
        <ListCheck size={36} />
        <p className='text-2xl font-bold mb-4'>รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* List */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Panel Cart */}
        <div className='col-span-2'>
          {/* Card */}
          {cart.map((item, index) =>
            <div key={index} className='bg-white p-2 rounded-md shadow-md mb-2'>
              {/* Row 1 */}
              <div className='flex justify-between mb-4'>
                {/* Left */}
                <div className='flex gap-4 items-center'>

                  {
                    item.images && item.images.length > 0
                      ? <img className='w-16 h-16 rounded-md' src={item.images[0].url} alt="" />
                      : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center '>
                        No image
                      </div>
                  }

                  <div>
                    <p className='font-bold'>{item.title}</p>
                    <p className='text-sm text-gray-500'>{numberFormat(item.price)} x {item.count}</p>
                  </div>
                </div>

                {/* Right */}
                <div>
                  <div className='font-bold text-blue-500'>
                    {numberFormat(item.price * item.count)}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>


        {/* Payment Cart */}
        <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
          <p className='text-xl font-bold'>รวมการสั่งซื้อ</p>
          <div className='flex justify-between px-1'>
            <span>ยอดชำระทั้งหมด</span>
            <span className='text-xl'>{numberFormat(getTotalPrice())}</span>
          </div>
          <div className='flex flex-col gap-2 '>

            {
              user
                ? (
                  <Link >
                    <button
                      disabled={cart.length < 1}
                      onClick={handleSaveCart}
                      className='bg-red-500 w-full rounded-md shadow-md text-white py-1 hover:bg-red-700'>สั่งซื้อ</button>
                  </Link>
                )
                : (
                  <Link to='/login' >
                    <button className='bg-blue-500 w-full rounded-md shadow-md text-white py-1 hover:bg-red-700'>Login</button>
                  </Link>)
            }




            <Link >
              <button className='bg-gray-200 w-full rounded-md shadow-md py-1 hover:bg-gray-700 hover:text-white'>แก้ไขรายการ</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ListCart