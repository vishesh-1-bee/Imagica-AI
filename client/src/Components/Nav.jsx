import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/Appcontext.jsx'
const Nav = () => {
  const navigate = useNavigate()
  const { user, credit ,setshowLogin, islogin ,logoutUser} = useData()
  const setlog = () => {
    setuser(!user)
  }
  console.log(credit.name,"here it is");
  
  return (
    <div className='w-full py-4 top-0 sticky backdrop-blur-lg  border-b-neutral-800/80 z-50    '>
      <div className='relative p-3 bg-zinc-500/90 container px-7 rounded-full  text-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center shrink-0'>
            <img src={assets.logo_icon} alt="" className='size-5 md:size-8 cursor-pointer' onClick={() => {
              console.log("Navigating...");
              navigate("/");
            }} />
            <h1 className='font-semibold text-lg md:text-2xl  cursor-pointer' onClick={()=> navigate("/")}>Imagica</h1>
          </div>
          {islogin  ? <div className="gap-2 flex md:space-x-9 ml-5 justify-center items-center ">
            <div className='flex items-center gap-2 rounded-full bg-slate-700 py-1 px-2 md:px-4 md:py-2'>
              <img src={assets.credit_star} alt="" className='size-2 md:size-4 ' />
              <h4 className='font-medium text-xs md:text-sm  '>Credits Left: {credit.credit}</h4>
            </div>
            <div className='items-center gap-2 flex'>
              <h4 className='hidden md:flex font-light text-sm'>Hi , {credit.name}</h4>
              <div className='relative group'>
                <img src={assets.profile_icon} alt="" className='size-6 md:size-9 ' />
                <div onClick={logoutUser}
                 className=' pt-12 text-slate-400 absolute hidden group-hover:block top-0 right-0 z-10'>
                  <h4 className='px-5 border cursor-pointer py-2 rounded-full bg-slate-900 text-sm text-center hover:scale-105'>logout</h4>
                </div>
              </div>


            </div>
          </div> :
            <div className=" md:flex md:space-x-9 ml-5 justify-center items-center ">
              <Link to="/buy-credit" className="  md:flex px-4 py-2 rounded-md  hover:bg-slate-700 duration-200 hover:scale-105" >Price</Link>
              <Link onClick={()=>setshowLogin(true)} to="" className="px-3 md:px-7 py-2 rounded-full md:rounded-md bg-slate-700 hover:bg-transparent hover:scale-110 duration-150" >Signup</Link>
            </div>}

        </div>
      </div>

    </div>
  )
}

export default Nav
