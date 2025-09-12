import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'
const Testimonial = () => {
    return (
        <div>
            <motion.div className='flex flex-col items-center justify-center mt-9'

                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <h1 className='text-3xl md:text-5xl font-semibold pt-12'>Customer <span className='bg-gradient-to-r from-blue-200 to to-blue-700
                bg-clip-text text-transparent'>Testimonial</span> </h1>
                <p className=' text-sm md:text-lg mt-4 font-light'>What our user says</p>
                <div className='flex flex-row flex-wrap gap-6 mt-9'>
                    {testimonialsData.map((e, i) => {
                        return <div key={i} className='p-12 m-auto w-80 border rounded-md bg-blue-800/40 hover:scale-105 shadow-md duration-300 transition-all'>
                            <div className='flex flex-col justify-center items-center'>
                                <img className='rounded-full w-14' src={e.image} alt="" />
                                <h2 className='font-semibold pt-1'>{e.name}</h2>
                                <p className='text-xs font-extralight'>{e.role}</p>
                                <div className='flex mb-4 pt-4'>
                                    {Array(e.stars).fill().map((item, index) => (
                                        <img key={index} src={assets.rating_star} alt="" />
                                    ))}
                                </div>
                                <p className='text-center font-light'>{e.text}</p>
                            </div>
                        </div>
                    })}
                </div>
            </motion.div>

        </div>
    )
}

export default Testimonial
