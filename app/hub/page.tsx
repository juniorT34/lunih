import React from 'react'
import { auth,currentUser } from '@clerk/nextjs/server'

const Hub = async() => {
  const user = await currentUser()
  console.log(user)
    return (
    <div>Hub</div>
  )
}

export default Hub