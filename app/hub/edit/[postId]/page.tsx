import EditPostElement from '@/components/shared/EditPostElement'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'

type Props = {}

const EditPost = ({ params }: { params: { id: string } }) => {
  return (
    <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <Header />
        <EditPostElement postId={params.id}/>
        <Footer />
    </div>
  )
}


export default EditPost