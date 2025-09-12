import React from 'react'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
const Cotent = () => {
  return (
    <motion.div className='pt-28'
     initial={{opacity:0.2 , y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1 , y:0}}
        viewport={{once:true}}>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl md:text-5xl font-semibold'>Create image with AI</h1>
        <p className=' text-sm md:text-md mt-4 font-light'>Turn your imagination into visual</p>
        <div className='pt-18 flex flex-col md:flex-row gap-6 justify-center'>
          <img src={assets.sample_img_1} alt="" className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3 ' />
          <div className='w-full md:max-w-xl space-y-9'>
            <h2 className='text-2xl sm:text-3xl md:text-5xl'>Introduction about Imagica</h2>
            <p className='text-xs sm:text-xs md:text-xl md:max-w-lg font-extralight tracking-tight'>
              Bring your imagination to life with our advanced AI image generation software. Whether you're a designer, marketer, developer, or just someone with a creative vision, our tool allows you to effortlessly convert text prompts into high-quality, visually stunning images. Powered by cutting-edge artificial intelligence, it offers fast generation, customizable styles
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default Cotent;
