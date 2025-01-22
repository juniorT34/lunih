"us client"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPost } from "@/lib/actions/post.actions";
import {dateToLocaleString} from "@/lib/utils"
import RelatedPosts from "./RelatedPosts";
import { Category } from "@prisma/client";


export default async function SinglePost({ postId }: { postId: string },searchParams: { [key: string]: string | string[] | undefined }) {
  const post = await getPost(postId)

  
  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Category Badge */}
          <Badge className="mb-4 bg-primary-100 hover:bg-primary-200 text-white">
            {post.data?.category}
          </Badge>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
            {post.data?.title}
          </h1>

          {/* Author Info */}
          <div className="mb-8 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt={post.data?.user.firstName} src={post.data?.user.imageUrl || "/person2.jpg"} />
              <AvatarFallback>{post.data?.user.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{post.data?.user.firstName} {post.data?.user.lastName}</p>
                <p className="text-sm text-gray-500">{post.data?.createdAt ? dateToLocaleString(new Date(post.data.createdAt)) : 'Date not available'}</p>
              </div> 
              <Button className="bg-primary-100 hover:bg-primary-200 text-white">
                Join
              </Button>
              
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={post.data?.imageUrl || '/1.jpg'}
              alt="Featured image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              {post.data?.description}
            </p>

          </div>

          {/* Join Button */}

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-primary-100 hover:bg-primary-200 text-white"
              >
              Join this project
            </Button>
          </div>
            
          <div className="w-full">

          <RelatedPosts 
            currentPostId={post.data?.id || ''}
            category={post.data?.category as Category}
            searchParams={searchParams}
            />
            </div>
        </div>
      </div>
    </article>
  );
}
