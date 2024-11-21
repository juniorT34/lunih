import Image from "next/image"; 
import Navbar from "@/components/shared/Navbar";
import LandingPage from "@/components/shared/LandingPage";
import AboutPage from "@/components/shared/AboutPage";

export default function Home() {
  return (
        <div className="p-10 bg-img ">
          <Navbar />
          <LandingPage />
          <AboutPage />
        </div>
  );
}
