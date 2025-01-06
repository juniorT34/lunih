import React from 'react'
import EditPost from './EditPost'


const EditPostElement = ({ postId }: { postId: string }) => {
  return (
    <div className='mt-10 p-5 flex justify-center'>
      <div >

        <h1 className='font-semibold text-3xl mb-5'>Edit this post</h1>
        <EditPost postId={postId}/>
      </div>
    </div>
  )
}

export default EditPostElement