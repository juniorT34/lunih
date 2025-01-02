import React from 'react'
import Header from './Header'
import { auth, currentUser } from '@clerk/nextjs/server'

const  Sample = async() => {
  const { userId } = await auth()
  const user = await currentUser()
  
  console.log("current user : ",user)
  return (
    <div className=''>
        <Header />
        <div className='container mx-auto px-4 py-2 xl:py-4 mt-5'>

        <div>

            <h1 className='text-2xl text-center'>Hey, <span className='font-bold text-primary-100'>{currentUser.name}</span></h1>
            <h2 className='text-center text-xl'>Discover projects and creative ideas.</h2>
        </div>

        </div>
    </div>
  )
}

export default Sample