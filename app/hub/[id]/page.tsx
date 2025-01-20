import SinglePost from '@/components/shared/SinglePost'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function Post({ params}: PageProps) {
  const { id: postId } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SinglePost postId={postId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Post;