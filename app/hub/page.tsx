import React, { Suspense } from "react";
import Sample from "@/components/shared/Sample";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/PostHero";
import { SearchBar } from "@/components/shared/SearchBar";
import PostsWrapper from "@/components/shared/PostsWrapper";
export const dynamic = 'force-dynamic';
const Hub = () => {
  return (
    <div
      className="bg-primary-50 bg-dotted-pattern bg-cover bg-center"
      suppressHydrationWarning
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Sample />
      </Suspense>
      <Suspense fallback={<div>Loading hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading search bar...</div>}>
        <SearchBar />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsWrapper />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Hub;
