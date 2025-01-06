"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import {useState,useEffect} from "react"
import {useRouter,useSearchParams} from "next/navigation"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const trimmedSearchQuery = searchQuery.trim()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchQuery === "" && searchParams.get('search')) {
      router.push('/hub')
    }
  }, [searchQuery, router, searchParams])
  const handleSearch = (e: React.FormEvent) =>{
    e.preventDefault()
    if(trimmedSearchQuery){
      router.push(`/hub?search=${encodeURIComponent(trimmedSearchQuery)}`)
    }
  }
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <form className="flex gap-2" onSubmit={handleSearch}>
            <Input 
              type="search" 
              placeholder="Search by post or by user..." 
              className="flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="bg-primary-100 hover:bg-primary-200">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

