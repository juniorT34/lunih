import React, { Suspense } from "react";
import Sample from "@/components/shared/Sample";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/PostHero";
import { SearchBar } from "@/components/shared/SearchBar";
import PostsWrapper from "@/components/shared/PostsWrapper";
export const dynamic = "force-dynamic";
const Hub = () => {
  return (
    <div
      className="bg-primary-50 bg-dotted-pattern bg-cover bg-center"
      suppressHydrationWarning={true}
    >
      <Sample />
      <Hero />
      <SearchBar />
      <PostsWrapper />
      <Footer />
    </div>
  );
};

export default Hub;
