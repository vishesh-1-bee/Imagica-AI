import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div className='md:flex justify-between flex-col md:flex-row mt-32 bg-white/70 p-1 rounded-md '>
            <div className='flex items-center gap-2'>
               <img src={assets.logo_icon} alt="" className='size-5 md:size-8' />
            <h1 className='font-semibold text-sm md:text-2xl'>Imagica</h1> <span>|</span>
            <p className='text-xs font-light ml-6'>All copyright reserverd to the @imagica</p>
            </div>
            <div className='flex gap-7 '>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.instagram_icon} alt="" />
            </div>

        </div>
    )
}

export default Footer
