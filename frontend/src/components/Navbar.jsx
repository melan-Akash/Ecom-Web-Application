import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  // ❗ FIXED — GET CART COUNT FROM CONTEXT
  const { getCartCount } = useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-36' />
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center'>
          <p>HOME</p>
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center'>
          <p>COLLECTIONS</p>
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center'>
          <p>ABOUT</p>
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center'>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        {/* Profile Dropdown */}
        <div className='group relative'>
          <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
          <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
          
          <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center 
          bg-black text-white rounded-full text-[9px] leading-4'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=""
        />
      </div>

      {/* ------------------ MOBILE SLIDE MENU ------------------ */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col text-gray-700 h-full'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-3 p-4 border-b cursor-pointer'
          >
            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} to='/' className='py-3 pl-6 border-b'>
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to='/collection' className='py-3 pl-6 border-b'>
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='py-3 pl-6 border-b'>
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} to='/contact' className='py-3 pl-6 border-b'>
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
