import React from 'react'
import { assets, plans } from '../assets/assets'
import { useData } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Buycredit = () => {
  const { user, backendUrl, setshowLogin, loadcredidtData, token } = useData()

  const navigate = useNavigate()
  //function for initiallization the payment
  const initPayment = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post('https://imagica-ai-backend.onrender.com/api/auth/verify-razor', response,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          if (data.success) {
            loadcredidtData()
            navigate("/")
            toast.success("credit added")
          }
        } catch (error) {
          toast.error(error)
        }
      }
    };
    const rpz = new window.Razorpay(options)
    rpz.open()
  }



  const paymentRazorpay = async (planId) => {
    try {

      //calling the api 

      const { data } = await axios.post('https://imagica-ai-backend.onrender.com/api/auth/pay-razorpay',
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (data.success) {
        initPayment(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return (

    <div>
      <div className='flex flex-col items-center justify-center mt-9'>
        <h1 className='text-3xl md:text-5xl font-semibold pt-12'>Choose the <span className='bg-gradient-to-r from-blue-200 to to-blue-700
                   bg-clip-text text-transparent'>Plans</span> </h1>
        <p className=' text-sm md:text-lg mt-4 font-light'>Our plans</p>
        <div className='flex flex-row flex-wrap gap-6 mt-9'>
          {plans.map((e, i) => {
            return <div key={i} className='p-12 m-auto w-80 border rounded-md bg-neutral-800/80 hover:scale-105 shadow-md duration-300 transition-all'>
              <div className='flex flex-col '>
                <img className=' w-9' src={assets.logo_icon} alt="" />
                <h2 className='font-bold mt-4 text-xl pt-1'>{e.id}</h2>
                <p className='font-extralight text-sm '>{e.desc}</p>
                <p className='text-xl font-bold mt-9'>
                  <span className='text-2xl'>${e.price}{" "} </span>
                  <span className='text-sm font-extralight'>/{e.credits}Credits</span></p>

                <button onClick={() => paymentRazorpay(e.id)} className='px-6 py-2 text-center cursor-pointer hover:scale-105 duration-300 transition-all bg-blue-700  rounded-md  mt-7 text-sm'>
                  {user ? "Purchase" : "Get Started"}</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default Buycredit
