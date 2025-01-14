import React from 'react'
import Sample from '@/components/shared/Sample'
import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/PostHero'
import { SearchBar } from '@/components/shared/SearchBar'
import PostCategories from '@/components/shared/PostCategories'
import PostsWrapper from '@/components/shared/PostsWrapper'

const Hub = () => {
  
    return (
    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center" suppressHydrationWarning>
      
      <Sample />
      <Hero />
      <SearchBar />
      <PostsWrapper />
      <Footer />
    </div>
  )
}

export default Hub