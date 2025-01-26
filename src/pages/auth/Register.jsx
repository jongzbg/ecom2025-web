// rafce
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'  // lib zod
import zxcvbn from 'zxcvbn'   //example name of zod
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid Email!' }),
  password: z.string().min(8, { message: 'Password must more than 8 Charactors' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password and Confirm Password is not same',
  path: ["confirmPassword"]
})

const Register = () => {
  // Javascript
  const [passwordScore, setPasswordScore] = useState(0)
  const navigate = useNavigate()
  // OG Code without lib :: now using lib validated registerSchema
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }


  // console.log(passwordScore)
  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])
  // OG Code without lib :: now using lib validated registerSchema
  // const handleOnchange = (e) => {
  //   // console.log(e.target.name, e.target.value)
  //   setForm({
  //     ...form,
  //     // key:value
  //     [e.target.name]: e.target.value
  //   })
  // }

  // OG Code without lib :: now using lib validated registerSchema
  // const hdlSubmit = async (e) => {
  //   e.preventDefault()
  //   if (form.password !== form.confirmPassword) {
  //     return alert('Confirm password is not match!!')
  //   }

  //   // Send to back
  //   try {
  //     const res = await axios.post('https://ecom2025-nine.vercel.app/register', form)
  //     console.log(res.data)
  //     toast.success(res.data)
  //   } catch (err) {

  //     const errMsg = err.response?.data?.message  //get error message from backend
  //     toast.error(errMsg)
  //     console.log(err)
  //   }
  // }

  const onSubmit = async (data) => {
    console.log(data)
    console.log(zxcvbn(data.password).score)
    const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 3) {
    //   toast.warning('Password is weak !!')
    // }
    console.log('ok')
    try {
      const res = await axios.post('https://ecom2025-nine.vercel.app/register', data)
      console.log(res.data)
      toast.success(res.data)
      navigate('/login')
    } catch (err) {

      const errMsg = err.response?.data?.message  //get error message from backend
      toast.error(errMsg)
      console.log(err)
    }
  }



  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
      <div className=' w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl my-4 font-medium'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} >

          {/* Card Register */}
          <div className='space-y-4'>

            {/* Email */}
            <div>
              {/* <input className='border' onChange={handleOnchange} name='email' type='email' ></input> */}
              <input {...register("email")}
                placeholder='Email'
                className={`
            border w-full px-3 py-2 rounded 
            focus:outline-none 
            focus:ring-2 
            focus:border-transparent
            focus:ring-blue-500 
            ${errors.email && 'border-red-500'} `} />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              {/* <input className='border' onChange={handleOnchange} name='password' type='text'></input> */}
              <input {...register("password")}
                type='password'
                placeholder='Password'
                className={`
            border w-full px-3 py-2 rounded 
            focus:outline-none 
            focus:ring-2 
            focus:border-transparent
            focus:ring-blue-500 
            ${errors.password && 'border-red-500'} `} />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>

            {
              watch().password?.length > 0 &&
              <div className='flex'>
                {
                  Array.from(Array(5).keys()).map((item, index) => (
                    <span className='w-1/5 px-1' key={index}>
                      <div className={`h-2 rounded-sm ${passwordScore <= 2
                        ? 'bg-red-300'
                        : passwordScore < 4
                          ? 'bg-yellow-300'
                          : 'bg-green-300'
                        }              
              `}>
                      </div>
                    </span>
                  ))
                }
              </div>
            }

            {/* Confirm Password */}
            <div>
              {/* <input className='border' onChange={handleOnchange} name='confirmPassword' type='text' ></input> */}
              <input {...register("confirmPassword")}
                type='password'
                placeholder='Confirm Password'
                className={`
                border w-full px-3 py-2 rounded 
                focus:outline-none 
                focus:ring-2 
                focus:border-transparent
                focus:ring-blue-500 
                ${errors.password && 'border-red-500'} `}
              />
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            </div>

            <button className='bg-blue-500 rounded-md w-full text-white font-bold py-2 hover:bg-blue-700'>Register</button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Register