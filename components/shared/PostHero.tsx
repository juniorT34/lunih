import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Hero() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[400px] w-full">
              <Image
                alt="Featured post"
                className="object-cover"
                fill
                src="/random2.jpg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <Badge className="mb-2 bg-primary-100 hover:bg-primary-200">Internship</Badge>
                <h1 className="mb-4 text-2xl font-bold">
                  The Impact of Technology on the Workplace: How Technology is Changing
                </h1>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="Author" src="/person2.jpg" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">John Smith</p>
                    <p className="text-gray-300">August 20, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

