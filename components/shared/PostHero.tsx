import { getRandomPost } from "@/lib/actions/post.actions"
// import { useRouter } from "next/navigation"
import { dateToLocaleString } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import Image from 'next/image'
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"

export default async function PostHero() {
  try {
    
  
  const randomPost = await getRandomPost()
  // const router = useRouter()

  if (!randomPost.success || !randomPost.data) {
    return <p>No posts available.</p>
  }

  const post = randomPost.data

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card 
          className="overflow-hidden cursor-pointer"
          
        >
          <CardContent className="p-0">
            <div className="relative h-[400px]">
              <Link href={`/hub/${post.id}`}>
              <Image
                alt={post.title}
                className="object-cover"
                fill
                src={post.imageUrl || '/1.jpg'}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <Badge className="mb-2 bg-primary-100 hover:bg-primary-200">
                  {post.category}
                </Badge>
                <h1 className="mb-4 text-2xl font-bold">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt={post.user.firstName} src={post.user.imageUrl || '/person2.jpg'} />
                    <AvatarFallback>{post.user.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{post.user.firstName} {post.user.lastName}</p>
                    <p className="text-gray-300">{dateToLocaleString(post.createdAt)}</p>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} catch (error) {
 console.error("Error fetching random post: ", error)
 return <p>Failed to load featured post.</p>
}
}