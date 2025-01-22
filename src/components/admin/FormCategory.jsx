//rafce
import React, { useEffect, useState } from 'react'
import { createCategory, removeCategory } from '../../api/category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'


const FormCategory = () => {
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state)=> state.categories)
    const getCategory = useEcomStore((state)=> state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(token, name)

        if (!name) {
            return toast.warning('Please fill data')
        }

        try {
            const res = await createCategory(token, { name })
            // console.log(res.data.name)
            getCategory(token)
            toast.success(`Add Category ${res.data.name} success!!`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        // console.log(id)
        try {
            const res = await removeCategory(token, id)
            // console.log(res)
            toast.success(`Deleted ${ res.data.name } success!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container h-screen p-4 bg-white shadow-md'>
            <h1>Category Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className='border'
                    type='text'
                />
                <button className='bg-blue-500 rounded-md'>Add Category</button>
            </form>

            <hr />

            <ul className='list-none text-black'>
                {
                    categories.map((item, index) =>
                        <li
                            className='flex justify-between my-2'
                            key={index}>
                            <span>
                                {item.name}
                            </span>
                            <button className='bg-red-500 rounded' onClick={() => handleRemove(item.id)}>Delete</button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default FormCategory