// import Header from '@/components/shared/Header'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
  return (
    // <div>ProfilePage</div>
    <>
    {/* <Header /> */}
    <h2 className='text-center mt-5 font-bold '>Profile Page</h2>
    <div className='w-full h-screen flex justify-center items-center'>
      <UserProfile />
    </div>
    </>
  )
}

export default ProfilePage