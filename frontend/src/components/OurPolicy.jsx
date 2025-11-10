import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2 
    text-xs sm:text-sm md:text-base text-gray-700'>

        <div>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold '>Eeasy Exchange Ploicy</p>
            <p className='text-gray-400 '>We offer Free exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold '>7 days return ploicy</p>
            <p className='text-gray-400 '>We offer 7 days Free exchange policy</p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5' />
            <p className='font-semibold '>Best Costomer Sopprrt</p>
            <p className='text-gray-400 '>We offer Free exchange policy</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
