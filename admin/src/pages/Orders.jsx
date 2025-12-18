import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'   // ✅ FIX 1

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
            gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700'
          >
            <img className='w-12' src={assets.parcel_icon} alt='' />

            <div>
              {order.items.map((item, i) => (
                <p key={i} className='py-0.5'>
                  {item.name} × {item.quantity}
                  <span className='ml-2'>{item.size}</span>
                </p>
              ))}

              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>

              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state},{' '}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p>Items : {order.items.length}</p>
              <p className='mt-3'>
                Method : {order.paymentMethod} {/* ✅ FIX 2 */}
              </p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className='text-sm sm:text-[15px]'>
              {currency}{order.amount}
            </p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className='p-2 font-semibold'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
