import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    if (!token) return

    const response = await axios.post(
      backendUrl + '/api/order/userorder',
      {},
      { headers: { token } }
    )

    if (response.data.success) {
      setOrderData(response.data.orders) // ✅ FIX
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((order, index) => (
          <div key={index}>
            {order.items.map((item, i) => (
              <div
                key={i}
                className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt='' />

                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>

                    <div className='flex items-center gap-3 mt-2 text-base'>
                      <p className='text-lg'>
                        {currency}{item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>

                    <p className='mt-2'>
                      Date:{' '}
                      <span className='text-gray-400'>
                        {new Date(order.date).toDateString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{order.status}</p>
                  </div>

                  <button className='border py-2 px-4 text-sm font-medium rounded-sm'>
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
