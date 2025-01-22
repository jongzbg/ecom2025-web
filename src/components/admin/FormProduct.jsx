import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from '../admin/Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil, Trash } from 'lucide-react';
import { numberFormat } from '../../util/numberFormat'
import { dateFormat } from '../../util/dateFormat'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })


    useEffect(() => {
        getCategory()
        getProduct(20)
    }, [])
    // console.log(categories)
    // console.log(token)

    const handleOnchange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        try {
            const res = await createProduct(token, form)
            console.log(res)
            toast.success(`Add Product ${res.data.title} success!!`)
            setForm(initialState)
            getProduct()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        // console.log(id)
        if (window.confirm('Are you sure to delete ??')) {
            try {
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.success(`Delete Product ${res.data.name} already!!`)
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>

            <form onSubmit={handleSubmit}>
                <h1>
                    เพิ่มข้อมูลสินค้า
                </h1>
                <input
                    className='border'
                    name='title'
                    type="text"
                    value={form.title}
                    onChange={handleOnchange}
                    placeholder='Title'


                />
                <input
                    className='border'
                    name='description'
                    type="text"
                    value={form.description}
                    onChange={handleOnchange}
                    placeholder='description'


                />
                <input
                    className='border'
                    name='price'
                    type="number"
                    value={form.price}
                    onChange={handleOnchange}
                    placeholder='price'
                />
                <input
                    className='border'
                    name='quantity'
                    type="number"
                    value={form.quantity}
                    onChange={handleOnchange}
                    placeholder='quantity'
                />
                <select
                    className='border'
                    name="categoryId"
                    onChange={handleOnchange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id} >{item.name}</option>
                        )
                    }
                </select>
                <hr />

                {/* ๊Upload file */}
                <Uploadfile form={form} setForm={setForm} />
                <button type='submit' className='bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                    เพิ่มสินค้า
                </button>
                <hr />
                <br />
                <table className='table w-full border'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th scope="col">No.</th>
                            <th scope="col">รูปภาพ</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">จำนวนที่ขาย</th>
                            <th scope="col">วันที่อัพเดท</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {
                                                item.images && item.images.length > 0
                                                    ? <img className='w-24 h-24 rounded-lg shadow-md' src={item.images[0].url} />
                                                    : <div className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm'>
                                                        No Image
                                                    </div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{dateFormat(item.updatedAt)}</td>
                                        <td className='flex gap-2'>
                                            <p className='bg-yellow-500 rounded-md p-1 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 '><Link to={'/admin/product/' + item.id}><Pencil /></Link></p>
                                            <p className='bg-red-500 rounded-md p-1 shadow-md hover: cursor-pointer hover:scale-105 hover:-translate-y-1 hover:duration-200' onClick={() => handleDelete(item.id)}><Trash /></p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default FormProduct