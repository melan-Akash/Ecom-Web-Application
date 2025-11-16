import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid mt-20'>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
          
          {/* Logo and Description */}
          <div className="max-w-96">
            <img src={assets.logo} alt="" className='w-70' />
            <p className="mt-6 text-sm text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-3">
              <a href="#" aria-label="Twitter">
                {/* Twitter SVG */}
              </a>
              <a href="#" aria-label="GitHub">
                {/* GitHub SVG */}
              </a>
              <a href="#" aria-label="LinkedIn">
                {/* LinkedIn SVG */}
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
              <ul className="text-sm text-gray-500 space-y-2 list-none">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
              <ul className="text-sm text-gray-500 space-y-2 list-none">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2024 © <a href="https://prebuiltui.com" target="_blank" rel="noopener noreferrer">PrebuiltUI</a>. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
