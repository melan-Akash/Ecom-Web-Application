import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // Fetch product by ID
  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId)

    if (found) {
      setProductData(found)
      setImage(found.image[0])
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [products, productId])

  if (!productData) return <div className='opacity-0'></div>

  return (
    <div className='border-t-2 pt-10'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Image Section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          
          {/* Thumbnail list */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18%] w-full'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>

        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* Rating */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_dull_icon} className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>

          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === item ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Consequuntur magni dolores eos qui ratione voluptatem...</p>
        </div>

        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

    </div>
  )
}

export default Product
