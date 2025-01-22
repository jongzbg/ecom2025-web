// rafce
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  // Javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  // console.log('User from zustand', user)
  // console.log(actionLogin)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })


  const handleOnchange = (e) => {
    // console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      // key:value
      [e.target.name]: e.target.value
    })
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      console.log('role', role)
      roleRedirect(role)
      toast.success('Welcome ' + form.email)
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }

    // Send to Back
    try {
      console.log('actionLogin',actionLogin)
      const res = await axios.post('https://ecom2025-nine.vercel.app/login', form)
      // console.log(res.data)
      toast.success(res.data)
    } catch (err) {

      const errMsg = err.response?.data?.message  //get error message from backend
      toast.error(errMsg)
      console.log('err:', err)
    }
    // try {
    //   const res = await axios.post('https://ecom2025-nine.vercel.app/login', form, {
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    //   // console.log('Response:', res.data);
    // } catch (error) {
    //   console.error('Axios error:', error);
    // }


  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
      <div className=' w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl my-4 font-medium'>Login</h1>
        <form>
          <div className='space-y-4'>
            {/* Email */}
            <input
              placeholder='Email'
              className='border w-full px-3 py-2 rounded 
              focus:outline-none 
              focus:ring-2 
              focus:border-transparent
            focus:ring-blue-500 '
              onChange={handleOnchange} name='email' type='email' >

            </input>

            {/* Password */}
            <input
              type='password'
              placeholder='Password'
              className='border w-full px-3 py-2 rounded 
              focus:outline-none 
              focus:ring-2 
              focus:border-transparent
            focus:ring-blue-500 ' onChange={handleOnchange} name='password'></input>

            <button className='bg-blue-500 rounded-md w-full text-white font-bold py-2 hover:bg-blue-700' onClick={handleSubmit}>Login</button>

          </div>
        </form>
      </div>
    </div>

  )
}

export default Login