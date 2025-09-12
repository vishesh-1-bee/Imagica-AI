import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useData } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const Results = () => {
  const [image, setimage] = useState(assets.sample_img_1)
  const [isimageLoaded, setisimageLoaded] = useState(true)
  const [loading, setloading] = useState(false)
  const [input, setinput] = useState("")
  const {generateImage , loadcredidtData , credit}= useData()
  const navigate = useNavigate()
  const generateimage = () => {
    setisimageLoaded(false)
  }
  const formhandler = async(e, i) => {
    e.preventDefault()
    setloading(true)

    if (input) {
      const image =await generateImage(input)
      if (image) {
        setisimageLoaded(true)
        setimage(image)
        setloading(false)
        loadcredidtData()
      }
    }
  }
  return (
    <form onSubmit={formhandler} action="" className='flex flex-col justify-center items-center min-h-[90vh]'>
      <div className='pt-12'>
        <div className='relative flex flex-col justify-center items-center'>
          <img src={image} alt="" className='max-w-xs md:max-w-sm border rounded' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-700 
            ${loading ? "w-full transition-all duration-[10s]" : " w-0"}`}></span>
        </div>
        <h4 className={!loading ? "hidden" : " "}>Loading...</h4>
        {isimageLoaded ?
          <div className='flex flex-wrap justify-center mt-10 rounded-full gap-4 text-sm p-1'>
            <p className=' text-sm border bg-blue-800/40 border-zinc-700 px-7 py-2 rounded-full cursor-pointer'
              onClick={generateimage}
            >Geanerate Another</p>
            <a href={image} className='px-6 py-2 rounded-full bg-red-600 cursor-pointer' download> Download</a>
          </div>
          :
          <div className='flex justify-center mt-4 w-full max-w-sm'>
            <input onChange={e => setinput(e.target.value)} value={input}
              type="text" placeholder='enter the prompt' className='flex-1 outline-none  max-sm:w-20 bg-slate-800 rounded-full p-2 md:px-16 ' />

              {credit.credit<=0 ? navigate('/buy-credit') :    <button className='bg-red-500 rounded-full px-4 sm:px-10 py-2' type='submit'>Generate</button>}
         
          </div>
        }
      </div>
      <div>

      </div>
    </form>
  )
}

export default Results
