import { Button } from "@/components/ui/button"

export default function PostCategories() {
  const categories = ["Projects", "Internship", "Thesis"]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

