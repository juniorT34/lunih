import SinglePost from '@/components/shared/SinglePost'
import React from 'react'

interface PageProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PageProps) => {
  return (
    <div className=''>
      <SinglePost postId={params.id}/>
    </div>
  )
}

export default Post