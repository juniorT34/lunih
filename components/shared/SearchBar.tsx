import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <form className="flex gap-2">
            <Input 
              type="search" 
              placeholder="Search articles..." 
              className="flex-grow"
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

