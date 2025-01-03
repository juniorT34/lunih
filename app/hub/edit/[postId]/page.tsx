import CreatePostElem from '@/components/shared/CreatePostElem'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'

type Props = {}

const EditPost = (props: Props) => {
  return (
    <div className='bg-primary-50 bg-dotted-pattern bg-cover bg-center'>
        <Header />
        <CreatePostElem />
        <Footer />
    </div>
  )
}


export default EditPost