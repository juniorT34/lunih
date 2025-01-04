import React from 'react'
import CreatePost from './CreatePost'

type Props = {}

const CreatePostElem = (props: Props) => {
  return (
    <div className='mt-10 p-5 flex justify-center'>
      <div >

        <h1 className='font-semibold text-3xl mb-5'>Create a new post</h1>
        <CreatePost />
      </div>
    </div>
  )
}

export default CreatePostElem