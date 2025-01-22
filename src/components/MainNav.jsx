// rfce
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react';

function MainNav() {

    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((s) => s.user)
    const logout = useEcomStore((s) => s.logout)
    const [isOpen, setIsOpen] = useState(false)

    const profileClick = () => {
        setIsOpen(!isOpen)
    }

    console.log(carts)
    return (
        <nav className='bg-white-300 shadow-md'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'} className='text-2xl font bold'>Logo</Link>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium '
                            }
                            // className='bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                            to={'/'}>Home
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium '
                            }
                            to={'/shop'}>Shop
                        </NavLink>


                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium '
                            }
                            to={'/cart'} >
                            Cart
                            {
                                carts.length > 0
                                && (<span className='absolute top-0 bg-red-500 rounded-full px-2'>{carts.length}</span>
                                )
                            }
                        </NavLink>

                    </div>


                    {
                        user
                            ?
                            <div className='flex items-center gap-4'>
                                <button
                                    onClick={profileClick}
                                    className='flex items-center gap-2 hover:scale-105'>
                                    <img
                                        className='w-8 h-8'
                                        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-student-avatars-flat-icons-pack-people-456332.png?f=webp&w=256" />
                                    <ChevronDown />
                                </button>

                                {
                                    isOpen &&
                                    <div className='absolute top-16 bg-white rounded-sm shadow-md z-50'>
                                        <Link
                                            to={'/user/history'}
                                            className='block px-4 py-2  hover:bg-gray-200'>
                                            History
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className='block px-4 py-2  hover:bg-gray-200'>
                                            Logout
                                        </button>
                                    </div>
                                }

                            </div>
                            :
                            <div className='flex items-center gap-4'>

                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                            : 'hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium '
                                    }
                                    to={'/register'}>Register
                                </NavLink>

                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                                            : 'hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium '
                                    }
                                    to={'/login'}>Login
                                </NavLink>
                            </div>
                    }




                </div>
            </div>
        </nav>
    )
}

export default MainNav