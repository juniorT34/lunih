import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"

interface Post {
  id: number
  title: string
  category: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
}

const posts: Post[] = [
  {
    id: 1,
    title: "The Impact of Technology on the Workplace",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg",
    },
    date: "August 20, 2023",
  },
  // Add more posts here...
]

export default function PostGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    alt={post.title}
                    className="object-cover"
                    fill
                    src={post.image}
                  />
                </div>
                <div className="p-4">
                  <Badge className="mb-2 bg-blue-500 hover:bg-blue-600">
                    {post.category}
                  </Badge>
                  <h3 className="mb-4 text-lg font-semibold">{post.title}</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={post.author.name} src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 mt-auto">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">
                    Read More
                  </Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Join
                  </Button>
                </div>
              </CardFooter>

            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

