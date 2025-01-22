import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, listProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from '../admin/Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "Notebook",
    description: "Asus vivobook 16x",
    price: 32000,
    quantity: 100,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [form, setForm] = useState(initialState)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategory()
        fetchProduct(token, id, form)
    }, [])

    // get read product
    const fetchProduct = async (token, id, form) => {
        try {
            const res = await readProduct(token, id, form)

            setForm(res.data)
            console.log('res from backend:: ', res.data)
        } catch (err) {
            console.log(err)
        }
    }
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
            const res = await updateProduct(token,id, form)
            console.log(res)
            toast.success(`Add Product ${res.data.title} success!!`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
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
                <button type='submit' className='bg-blue-500 rounded-md px-1'>บันทึก</button>
                <hr />
                <br />
                {/* <table className='border table'>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
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
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <p>แก้ไข</p>
                                            <p>ลบ</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table> */}
            </form>
        </div>
    )
}

export default FormEditProduct