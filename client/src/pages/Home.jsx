import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Cotent from '../Components/Cotent'
import Testimonial from '../Components/Testimonial'
import GraetBtn from '../Components/GraetBtn'


const Home = () => {
  return (
    <div className='z-50'>
     <Header/>
     <Steps/>
     <Cotent/>
     <Testimonial/>
     <GraetBtn/>
    
    </div>
  )
}

export default Home
