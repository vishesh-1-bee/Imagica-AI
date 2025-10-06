import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useData } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const { user, setshowLogin , token } = useData()
    const navigate = useNavigate()
    const onclickhandler = () => {
        if (token) {
            navigate("/results")
        }else{
            setshowLogin(true)
        }
    }
    return (
        <div>
            <motion.div className='flex flex-col items-center justify-center text-center my-10 md:my-20'
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>

                <motion.div className='flex px-2 py-1 md:px-8 md:py-2 lg:px-14 lg:py-3 border border-neutral-300 items-center text-center gap-2 rounded-full bg-blue-800/60'
                    initial={{ opacity: 0, y: -20 }}

                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <motion.h2 className='text-sm'>Best text to image generator</motion.h2>
                    <img src={assets.star_icon} alt="" />
                </motion.div>

                <div className='mt-7 md:mt-8 text-center max-w-7xl'
                >
                    <motion.h1 className=' text-4xl sm:text-5xl md:text-7xl lg:text-8xl'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 3 }}
                    >Turn text to image, <span className='bg-gradient-to-r from-blue-300 to to-blue-800 bg-clip-text
                    text-transparent'> in seconds</span></motion.h1>
                </div>
                <div className='mt-3 md:mt-6 w-2/3 md:max-w-3/4 lg:w-1/2'>
                    <motion.p className='text-xs sm:text-xl tracking-tight md:text-2xl font-light'
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >Unleash your creativity with AI . Turn your imagination into virtual art in seconds</motion.p>

                </div>
                <motion.div className='flex px-7 py-1 lg:px-18 mt-8 md:py-2 bg-blue-800/40 gap-2 rounded-full'
                    onClick={onclickhandler}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}>
                    <motion.button className='cursor-pointer'

                    >Generate image</motion.button>
                    <img src={assets.star_group} alt="" className='size-9' />
                </motion.div>
                <div className='mt-9 justify-center md:relative'>
                    <motion.div className=' grid w-2/3 md:w-[10%] ml-14 md:ml-1 lg:ml-16 sm:ml-24 md:flex gap-2  grid-cols-3 md:relative md:left-[15%] md:-bottom-10'

                    >
                        <motion.img src={assets.sample_img_1} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                        <motion.img src={assets.sample_img_2} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                        <motion.img src={assets.sample_img_1} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                        <motion.img src={assets.sample_img_2} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                        <motion.img src={assets.sample_img_2} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                        <motion.img src={assets.sample_img_2} whileHover={{ scale: 1.05, duration: 0.1 }} alt="" />
                    </motion.div>
                </div>
                <div className='mt-4 md:mt-14 z-40'>
                    <motion.h1 className='text-xs sm:text-sm md:text-2xl'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >Image generated from Imagica</motion.h1>
                </div>

            </motion.div>

        </div>
    )
}

export default Header
