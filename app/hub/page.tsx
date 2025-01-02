import React from 'react'
import Sample from '@/components/shared/Sample'
import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/PostHero'
import PostGrid from '@/components/shared/Posts'
import { SearchBar } from '@/components/shared/SearchBar'
import PostCategories from '@/components/shared/PostCategories'

const Hub = async() => {
  
    return (
    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center" suppressHydrationWarning>
      
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