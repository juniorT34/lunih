import prisma from "@/lib/prisma"
import Link from "next/link"
import PostCard from "./PostCard"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Category } from "@prisma/client"
import { Post } from "@/lib/types"

interface RelatedPostsProps {
  currentPostId: string
  category: Category
  searchParams: { [key: string]: string | string[] | undefined }
}

async function RelatedPosts({ 
  currentPostId, 
  category,
  searchParams
}: RelatedPostsProps) {
  const POSTS_PER_PAGE = 3
  const page = Number(searchParams?.page) || 1

  const whereClause = {
    category: category,
    NOT: {
      id: currentPostId
    }
  }

  const [totalPosts, relatedPosts] = await Promise.all([
    prisma.post.count({ where: whereClause }),
    prisma.post.findMany({
      where: whereClause,
      include: { user: true },
      take: POSTS_PER_PAGE,
      skip: (page - 1) * POSTS_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    })
  ])

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)


  if (!relatedPosts.length) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post as Post} />
        ))}
      </div>

      {totalPages > 1
      /* {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Link 
            href={`/hub/${currentPostId}?page=${Math.max(1, page - 1)}`}
            className={`${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            prefetch
          >
            <Button variant="outline" disabled={page <= 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          
          <span className="flex items-center px-4">
            Page {page} of {totalPages}
          </span>
          
          <Link 
            href={`/hub/${currentPostId}?page=${Math.min(totalPages, page + 1)}`}
            className={`${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
            prefetch
          >
            <Button variant="outline" disabled={page >= totalPages}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )} */}
    </section>
  )
}

export default RelatedPosts