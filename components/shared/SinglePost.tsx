import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SinglePost() {
  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Category Badge */}
          <Badge className="mb-4 bg-primary-100 hover:bg-primary-200 text-white">
            Technology
          </Badge>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>

          {/* Author Info */}
          <div className="mb-8 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt="Tracey Wilson" src="/person1.jpg" />
              <AvatarFallback>TW</AvatarFallback>
            </Avatar>
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Tracey Wilson</p>
                <p className="text-sm text-gray-500">August 20, 2022</p>
              </div>
              <Button className="bg-primary-100 hover:bg-primary-200 text-white">
                Join
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src="/random3.jpg"
              alt="Featured image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Traveling is an enriching experience that opens up new horizons,
              exposes us to different cultures, and creates memories that last a
              lifetime. However, traveling can also be stressful and
              overwhelming, especially if you don&apos;t plan and prepare
              adequately. In this blog article, we&apos;ll explore tips and
              tricks for a memorable journey and how to make the most of your
              travels.
            </p>

            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              One of the most rewarding aspects of traveling is immersing
              yourself in the local culture and customs. This includes trying
              local cuisine, attending cultural events and festivals, and
              interacting with locals. Learning a few phrases in the local
              language can also go a long way in making connections and showing
              respect.
            </p>

            {/* Additional paragraphs would go here */}
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
        </div>
      </div>
    </article>
  );
}
