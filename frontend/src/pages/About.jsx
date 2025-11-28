import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At our store, we believe shopping should be simple, enjoyable, and inspiring.
            We offer a curated selection of high-quality products designed to fit your lifestyle
            and bring convenience to your everyday routine.
          </p>

          <p>
            Whether you're exploring new trends or looking for essentials, we strive to provide
            a seamless and satisfying shopping experience from browsing to checkout.
          </p>

          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to deliver exceptional value, premium quality, and reliable service
            while keeping customer satisfaction at the heart of everything we do.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='flex flex-col md:flex-row text-sm mb-20'>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>
              We ensure that every product meets high standards of quality, offering you durability,
              reliability, and value for money.
            </p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Customer Focused:</b>
            <p className='text-gray-600'>
              Our dedicated support team is always ready to assist you, ensuring a smooth and
              friendly shopping experience.
            </p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Secure & Trusted:</b>
            <p className='text-gray-600'>
              We prioritize your safety with secure payments, transparent services, and dependable
              delivery you can trust.
            </p>
          </div>

        </div>
      </div>

      <Newsletter />
    </div>
  )
}

export default About
