import CreatePostElem from '@/components/shared/CreatePostElem'
import Header from '@/components/shared/Header'
import React from 'react'


const CreatePost = () => {
  return (
    <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <Header />
        <CreatePostElem />
        
    </div>
  )
}

export default CreatePost