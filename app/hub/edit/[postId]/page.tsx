import EditPostElement from '@/components/shared/EditPostElement'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'


const EditPost = ({ params }: { params: { postId: string } }) => {
  console.log(params.postId)
  return (
    <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <Header />
        <EditPostElement postId={params.postId}/>
        <Footer />
    </div>
  )
}


export default EditPost