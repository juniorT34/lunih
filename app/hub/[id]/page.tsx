import SinglePost from '@/components/shared/SinglePost'
import React from 'react'

interface PageProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PageProps) => {
  const { id: postId } = params;

  return (
    <div>
      <SinglePost postId={postId} />
    </div>
  );
};

export default Post