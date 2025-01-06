import SinglePost from '@/components/shared/SinglePost'
import React from 'react'


const Post = ({params}:{params : {id: string}}) => {
  return (
    <div className=''>
        <SinglePost postId={params.id}/>
    </div>
  )
}

export default Post