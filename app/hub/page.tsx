import React from 'react'
import { auth,currentUser } from '@clerk/nextjs/server'
import Sample from '@/components/shared/Sample'
import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/PostHero'
import PostGrid from '@/components/shared/Posts'
import { SearchBar } from '@/components/shared/SearchBar'
import PostCategories from '@/components/shared/PostCategories'

const Hub = async() => {
  const user = await currentUser()
  console.log(user)
    return (
    <div>
      
      <Sample />
      <Hero />
      <SearchBar />
      <PostCategories />
      <PostGrid />
      <Footer />
    </div>
  )
}

export default Hub