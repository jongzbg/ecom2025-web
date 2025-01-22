import React, { useEffect, useState } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { add } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../util/numberFormat'

const SumaryCard = () => {
    const token = useEcomStore((s) => s.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSave, setAddressSave] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        handleGetUserCart(token)

    }, [])

    const handleGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                // console.log(res)
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSaveAddress = () => {
        console.log(address)
        if (!address) {
            return toast.warning('Please fill address')
        }
        saveAddress(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setAddressSave(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleGoToPayment = () => {
        if (!addressSave) {
            return toast.warning('Please fill address')
        }
        navigate('/user/payment')
    }

    // console.log(products)
    return (
        <div className='mx-auto'>
            <div className='flex gap-4'>

                {/* Left */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='font-bold text-lg'>ที่อยู่ในการจัดส่ง</h1>
                        <textarea
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='กรุณากรอกที่อยู่' className='w-full px-2 rounded-md' />
                        <button

                            onClick={handleSaveAddress}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 hover:duration-200'>
                            Save Address
                        </button>
                    </div>


                </div>

                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='font-bold text-lg'>คำสั่งซื้อของคุณ</h1>

                        {/* Item List */}

                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p>{item.product.title}</p>
                                            <p className='text-sm'>จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                                        </div>

                                        <div>
                                            <p className='text-red-500 font-bold'>{numberFormat(item.count * item.product.price)}</p>
                                        </div>
                                    </div>
                                </div>

                            )
                        }

                        {/* Service Chargr */}
                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง:</p>
                                <p>0.00</p>
                            </div>

                            <div className='flex justify-between'>
                                <p>ค่าส่วนลด:</p>
                                <p>0.00</p>
                            </div>
                        </div>


                        {/* Service Chargr */}
                        <div>
                            <hr className='py-1' />
                            <div className='flex justify-between'>
                                <p className='font-bold text-lg'>ยอดรวมสุทธิ:</p>
                                <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotal)}</p>
                            </div>
                        </div>

                        <div >

                            <button
                                onClick={handleGoToPayment}
                                className='bg-green-500 text-white w-full p-2 rounded-md shadow-md hover:bg-green-700 hover:text-white'>
                                ชำระเงิน
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SumaryCard