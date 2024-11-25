import CardDesc from "@/components/shared/CardDesc";
import Header from "@/components/shared/Header";
import Link from "next/link";

export default function Home() {
  return (
        <div className="">
            <Header />
            <section 
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/1.jpeg)' }}
      >
        {/* Overlay for the text */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-4 text-center">Welcome to LUN<span className="text-primary-100">IH</span></h1>
          <p className="text-2xl mb-6 max-w-3xl text-center">
            We are thrilled to have you here.<br /> 
            Explore our hub for <br />
            Innovation<span className="text-primary-100 text-4xl">.</span> Inspiration<span className="text-primary-100 text-4xl">.</span> and Endless possibilities<span className="text-primary-100 text-4xl">.</span>
          </p>
          <div className="flex gap-4 items-center">
            <button className="bg-primary-100 text-white px-6 py-3 rounded-full hover:bg-primary-200 transition">
              <Link href={'/sign-in'}>
                Sign In
              </Link>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              <Link href={'/hub'}>
              Go to Hub
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-10 bg-gray-100 w-full h-screen">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg mb-12 max-w-4xl mx-auto">
          Liepaja University New Idea Hub or LUNIH, is a platform where are showcased innovative ideas such as :
          </p>
          
          {/* Cards Section */}
          <div className="flex-col flex md:flex-row gap-8 items-center justify-center">
            {/* Card 1 */}
            <CardDesc title="Project Ideas" description="Individual innovative idea that can be used by anyone specially RTU liepaja university student"/>

            {/* Card 2 */}
            <CardDesc title="Bachelor/master thesis" description="Proposed thesis ideas that could be used in real world scenarios, could be build by student "/>

            {/* Card 3 */}
            <CardDesc title="Internships" description="Private entities and companies get to publish internship opportunities, so that student can easily apply"/>
          </div>
        </div>
      </section>
        </div>
  );
}
