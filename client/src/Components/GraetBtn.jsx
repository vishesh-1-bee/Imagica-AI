import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useData } from '../context/Appcontext'
const GraetBtn = () => {
    const navigate = useNavigate()
    const { user, setshowLogin } = useData()

    const handlesubmit = () => {
        if (user) {
            navigate("/results")
        }else{
           setshowLogin("true")
        }
    }

    return (
        <motion.div className=' flex flex-col pt-18 md:pt-28'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h1 className='text-center font-semibold text-2xl md:text-5xl'>See the magic , Try now</h1>
            <motion.div className='flex px-7 py-1 mx-auto lg:px-18 mt-18 md:py-2 bg-blue-800/40 gap-2 rounded-full w-fit hover:scale-105 duration-300 transition-all'

                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
            >
                <button onClick={handlesubmit}>Generate image</button>
                <img src={assets.star_group} alt="" className='size-9' />
            </motion.div>
        </motion.div>
    )
}

export default GraetBtn
