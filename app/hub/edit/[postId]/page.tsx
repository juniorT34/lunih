import EditPostElement from '@/components/shared/EditPostElement'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import { Suspense } from 'react'

interface PageProps {
  params: {
    postId: string
  }
}

function EditPost({ params}: PageProps) {
  return (
    <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <EditPostElement postId={params.postId} />
      </Suspense>
      <Footer />
    </div>
  )
}

export default EditPost