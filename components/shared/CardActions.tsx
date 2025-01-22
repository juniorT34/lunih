"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { join, getJoinStatus } from "@/lib/actions/post.actions";

interface CardActionsProps {
  postId: string;
}

const CardActions = ({ postId }: CardActionsProps) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [buttonStatus, setButtonStatus] = useState<"join" | "pending" | "joined" | "rejected">("join");

  useEffect(() => {
    const fetchJoinStatus = async () => {
      try {
        const response = await getJoinStatus(postId);
        if (response.success) {
          switch (response.status) {
            case "approved":
              setButtonStatus("joined");
              break;
            case "pending":
              setButtonStatus("pending");
              break;
            case "rejected":
              setButtonStatus("rejected");
              break;
            default:
              setButtonStatus("join");
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching join status:", error);
      }
    };

    if (isLoaded && user) {
      fetchJoinStatus();
    }
  }, [isLoaded, user, postId]);

  const handleOnClick = () => {
    router.push(`/hub/${postId}`);
  };

  const handleJoin = async () => {
    if (!postId) {
      alert("Failed to join: Invalid postId.");
      return;
    }

    try {
      const response = await join(postId);
      if (response.success) {
        alert(response.message || "Successfully joined the post!");
        setButtonStatus("pending");
      } else {
        alert(response.error || "Failed to join the post.");
      }
    } catch (error) {
      console.error("Unexpected error during join request:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const isStudent =
    isLoaded &&
    user?.unsafeMetadata &&
    user.unsafeMetadata.role === "student";

  if (!isLoaded) {
    return (
      <div className="w-full">
        <Button variant="outline" disabled className="w-full">
          Read More
        </Button>
      </div>
    );
  }

  if (!isStudent) {
    return (
      <div className="w-full">
        <Button variant="outline" className="w-full" onClick={handleOnClick}>
          Read More
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Button variant="outline" onClick={handleOnClick}>
        Read More
      </Button>
      {buttonStatus === "join" && (
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={handleJoin}
        >
          Join
        </Button>
      )}
      {buttonStatus === "pending" && (
        <Button variant="outline" disabled>
          Pending
        </Button>
      )}
      {buttonStatus === "joined" && (
        <Button variant="outline" disabled>
          Joined
        </Button>
      )}
      {buttonStatus === "rejected" && (
        <Button variant="outline" disabled className="text-red-500">
          Rejected
        </Button>
      )}
    </div>
  );
};

export default CardActions;
