"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CardActionsProps {
  postId: string;
}

const CardActions = ({ postId }: CardActionsProps) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const handleOnClick = () => {
    router.push(`/hub/${postId}`);
  };

  const handleJoin = () => {
    console.log("Join clicked");
  };

  const isStudent = isLoaded && 
    user?.unsafeMetadata && 
    user.unsafeMetadata.role === "student";

  // Loading state
  if (!isLoaded) {
    return (
      <div className="w-full">
        <Button variant="outline" disabled className="w-full">
          Read More
        </Button>
      </div>
    );
  }

  // For non-students or when no user is logged in
  if (!isStudent) {
    return (
      <div className="w-full">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleOnClick}
        >
          Read More
        </Button>
      </div>
    );
  }

  // For students only
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Button 
        variant="outline"
        onClick={handleOnClick}
      >
        Read More
      </Button>
      <Button 
        className="bg-emerald-500 hover:bg-emerald-600 text-white"
        onClick={handleJoin}
      >
        Join
      </Button>
    </div>
  );
};

export default CardActions;