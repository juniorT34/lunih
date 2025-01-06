"use client"
import { Button } from "@/components/ui/button"

interface PostCategoriesProps {
  onCategorySelect: (category: string | null) => void;
  activeCategory: string | null;
}

export default function PostCategories({ onCategorySelect, activeCategory }: PostCategoriesProps) {
  const categories = ["Project", "Internship", "Thesis"]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className={`${
              activeCategory === null 
                ? "bg-primary-100 text-white" 
                : "text-primary-100 border-primary-100 hover:bg-blue-50"
            }`}
            onClick={() => onCategorySelect(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`${
                activeCategory === category 
                  ? "bg-primary-100 text-white" 
                  : "text-primary-100 border-primary-100 hover:bg-blue-50"
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

