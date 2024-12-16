import React from 'react'
import { CreatePostForm } from './CreatePostForm'

type Props = {}

const CreatePostElem = (props: Props) => {
  return (
    <div className='mt-10 p-5 flex justify-center'>
      <div >

        <h1 className='font-semibold text-3xl mb-5'>Create a new post</h1>
        <CreatePostForm />
      </div>
    </div>
  )
}

export default CreatePostElem