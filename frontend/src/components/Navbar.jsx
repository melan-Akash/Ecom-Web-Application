import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    const [visible,setVisible] = useState(false)



  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <img src={assets.logo} alt="" className='w-36 ' />
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTIONS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

            </NavLink>
            

        </ul>

        <div className='flex items-center gap-6 '>
            <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>LogOut</p>
                        

                    </div>

                </div>

            </div>

            <Link to={'/cart'} className='relative' >
                <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white 
                aspect-square rounded-full text-[8px] '>10</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon}  className='w-5 cursor-pointer sm:hidden' alt="" />


        </div>

       
 
        {/* Mobile menu overlay */}
        <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
            visible ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
        <div className='flex flex-col text-gray-700 h-full'>
            {/* Back button */}
            <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-3 p-4 border-b cursor-pointer'
            >
            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
            <p>Back</p>
            </div>

            {/* Nav links */}
            <NavLink
            onClick={() => setVisible(false)}
            className='py-3 pl-6 border-b hover:bg-gray-100'
            to='/'
            >
            HOME
            </NavLink>
            <NavLink
            onClick={() => setVisible(false)}
            className='py-3 pl-6 border-b hover:bg-gray-100'
            to='/collection'
            >
            COLLECTION
            </NavLink>
            <NavLink
            onClick={() => setVisible(false)}
            className='py-3 pl-6 border-b hover:bg-gray-100'
            to='/about'
            >
            ABOUT
            </NavLink>
            <NavLink
            onClick={() => setVisible(false)}
            className='py-3 pl-6 border-b hover:bg-gray-100'
            to='/contact'
            >
            CONTACT
            </NavLink>
        </div>
        </div>

    
    </div>
  )
}

export default Navbar