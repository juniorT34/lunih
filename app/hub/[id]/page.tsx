import SinglePost from '@/components/shared/SinglePost'
import React from 'react'

interface PageProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PageProps) => {
  const post = await params
  const postId = post.id
  return (
    <div className=''>
      <SinglePost postId={postId}/>
    </div>
  )
}

export default Post