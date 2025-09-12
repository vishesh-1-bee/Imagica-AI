import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'
const Steps = () => {
    return (
        <motion.div
        initial={{opacity:0.2 , y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1 , y:0}}
        viewport={{once:true}}
        >

            <h1 className='text-5xl sm:text-6xl font-semibold mt-8 md:mt-12 flex justify-center items-center'>How it works</h1>
            <p className='md:text-lg mb-8 justify-center items-center flex text-xs'>Transform words into stunning images</p>
            <div className='flex flex-col items-center '>
                {stepsData.map((e, i) => {
                   return <div className='flex gap-5 space-y-8 rounded-lg justify-center md:w-[80%] lg:w-[70%] border m-2 py-2 cursor-pointer hover:scale-105 transition-all 
                   duration-300 shadow bg-blue-800/30 '>
                        <img src={e.icon} alt="" className=' mt-3 p-2 ' />
                        <div className='flex gap-2 flex-col mt-4'>
                            <h2 className='text-lg font-medium md:text-xl'>{e.title}</h2>
                            <p className='text-xs md:text-sm tracking-tight font-light'>{e.description}</p>
                        </div>
                    </div>
                })}
            </div>
        </motion.div>
    )
}

export default Steps
