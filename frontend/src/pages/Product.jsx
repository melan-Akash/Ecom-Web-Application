import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { data, useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext';
import { assets, products } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const {productId} = useParams();
    const {Products, currency} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size,setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item)=>{
            if(item._id === productId){

                setProductData(item)
                setImage(item.image[0])
                return null;
            }

        })

    }

    useEffect(()=>{
        fetchProductData();

    },[products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
            {/* product image */}
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal sm:justify-normal 
                sm:w-[18.7%] w-full'>
                    {
                        productData.image.map((item,index)=>(
                            <img onClick={()=>setImage(item )} src={item} key={index}  className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer'/>
                        ))
                    }

                </div>
                <div className='w-full sm:w-[80%]'>
                    <img className='w-full h-auto' src={image} alt="" />

                </div>
                <div>
                    {/* -----------product info------- */}
                    <div className='flex-1'>
                        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                        <div className='flex items-center gap-1 mt-2'>
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_icon}  alt="" className="w-3 5" />
                            <img src={assets.star_icon} alt="" className="w-3 5" />
                            <img src={assets.star_icon}  alt="" className="w-3 5" />
                            <img src={assets.star_dull_icon}  alt="" className="w-3 5" />
                            <p className='pl-2'> (122)</p>

                        </div>
                        <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
                        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                        <div className='flex flex-col gap-4 my-8  '>
                            <p>Select Size</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item,index)=>(
                                    <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>
                                        {item}
                                    </button>
                                ))}

                            </div>

                        </div>
                        <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

                                <hr className='mt-8 sm:w-4/5' />

                                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                                    <p>100% Original product.</p>
                                    <p>Cash on delivary is avalibale on this product.</p>
                                    <p>Easy return and exchange polyicy with in 7Days</p>

                                </div>
                        

                    </div>
                </div>

            </div>

        </div>

        {/* Descirption & Review section */}

        <div className='mt-20'>
            <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5  text-sm'>Reviews{122}</p>

            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <p>onsequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
                    ut labore et dolore magnam aliquam quaerat voluptatem. </p>
            </div>

            {/* display reated product */}

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />


        </div>
      
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product
