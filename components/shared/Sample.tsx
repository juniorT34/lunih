import React from 'react'
import Navbar from './Navbar'
import Header from './Header'

const Sample = () => {
  return (
    <div className=''>
        <Header />
        <div className='container mx-auto px-4 py-2 xl:py-4 mt-5'>

        <div>

            <h1 className='text-2xl text-center'>Hey, <span className='font-bold text-primary-100'>Junior</span></h1>
            <h2 className='text-center text-xl'>Discover projects and creative ideas.</h2>
        </div>

        </div>
    </div>
  )
}

export default Sample