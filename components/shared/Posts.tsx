"use client"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPosts } from "@/lib/actions/post.actions"
import {PostsType, Post} from "@/lib/types"
import {dateToLocaleString,truncateTitle} from "@/lib/utils"
import PostActionsMenu from "./PostActionsMenu"
import CardActions from "./CardActions"
import { Pagination } from "./Pagination"
import { useEffect, useState } from "react"
import { useSearchParams} from "next/navigation"
import PostCategories from "./PostCategories"
import { Loader2 } from "lucide-react"

const ITEMS_PER_PAGE = 6

interface PostsProps {
  UserId: string | null
}

export default function PostGrid({ UserId }: PostsProps) {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams.get("page") || "1")
  const searchQuery = searchParams.get('search')?.toLowerCase() || ''
  
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [allPosts, setAllPosts] = useState<PostsType>()
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = allPosts?.data?.filter(post => {
    // First check if post is approved
    if (post.status !== 'approved') return false;
    
    // Then apply category and search filters
    const matchesCategory = activeCategory ? 
      post.category.toLowerCase() === activeCategory.toLowerCase() : 
      true
    
    const matchesSearch = searchQuery ?
      post.title.toLowerCase().includes(searchQuery) ||
      post.user.firstName.toLowerCase().includes(searchQuery) ||
      post.user.lastName?.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) :
      true

    return matchesCategory && matchesSearch
  })

  const totalFilteredPosts = filteredPosts?.length || 0
  const totalPages = Math.ceil(totalFilteredPosts / ITEMS_PER_PAGE)
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = filteredPosts?.slice(startIndex, endIndex)
  
  const handleCategorySelect = (category: string | null) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getPosts() as PostsType
        setAllPosts({
          ...response,
          data: (response.data || []).map(post => ({
            ...post,
            user: {
              ...post.user,
              imageUrl: post.user.imageUrl || ''
            }
          }))
        })
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-100" />
        <p className="mt-4 text-gray-500">Loading posts...</p>
      </div>
    )
  }

  return (
    <>
    <PostCategories 
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
    />
    <section className="py-12">
      <div className="container mx-auto px-4">
      {totalFilteredPosts === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
          {searchQuery 
                ? `No approved posts found matching "${searchQuery}"`
                : activeCategory 
                  ? `No approved posts found in category "${activeCategory}"`
                  : "No approved posts found"
          }
          </p>
        </div>
      ) : (
        <>
          <h2 className="mb-8 text-2xl font-bold">Latest Approved Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts?.map((post: Post) => (
              <Card key={post.id} className="overflow-hidden w-full flex flex-col">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      alt={post.title}
                      className="object-cover"
                      fill
                      src={post.imageUrl}
                    />
                    {UserId === post.user.clerkUserId && (
                      <PostActionsMenu postId={post.id} />
                    )}
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-primary-100 hover:bg-primary-200">
                      {post.category}
                    </Badge>
                    <h3 className="mb-4 text-lg font-semibold">{truncateTitle(post.title,26)}</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage alt={post.user.firstName} src={post.user.imageUrl} />
                        <AvatarFallback>
                          {post.user.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{post.user.firstName} {post.user.lastName}</p>
                        <p className="text-gray-500">{dateToLocaleString(new Date(post.createdAt))}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 mt-auto">
                  <CardActions postId={post.id}/>
                </CardFooter>
              </Card>
            ))}
          </div>
          {totalFilteredPosts > ITEMS_PER_PAGE && totalPages >= 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      </div>
    </section>
    </>
  )
}