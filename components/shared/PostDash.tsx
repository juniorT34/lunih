"use client";
import React, { useState } from "react";
import { dateToLocaleString, truncateTitle } from "@/lib/utils";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export type Post = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  category: "Project" | "Thesis" | "Internship";
  status: "approved" | "pending" | "not_approved";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type User = {
  id: string;
  role: "student" | "company" | "school" | "admin";
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string | null;
};

type PostDashProps = {
  post: Post;
  currentUser: User;
  onStatusChange?: (
    postId: string,
    newStatus: "approved" | "not_approved"
  ) => Promise<void>;
};

const PostDash = ({ post, currentUser, onStatusChange }: PostDashProps) => {
  const isAdmin = currentUser.role === "admin";
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleStatusUpdate = async (status: "approved" | "not_approved") => {
    try {
      setIsLoading(true);
      await onStatusChange?.(post.id, status);
      toast({
        title: "Success",
        description: `Post ${status} successfully`,
        variant: "default",
      });
      router.push("/dashboard/posts")
    } catch (error) {
      console.error("Error updating post status:", error);
      toast({
        title: "Failure",
        description: `Failed to update post status`,
        variant: "destructive",
      });
      router.push("/dashboard/posts");
    } finally {
      setIsLoading(false);
      router.push("/dashboard/posts");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-2 line-clamp-6">
            {truncateTitle(post.description, 200)}
          </p>
          <div className="flex gap-2 flex-col">
            <span className="text-sm text-gray-500">
              Category:{" "}
              <span className="text-primary-100 font-bold">
                {post.category}
              </span>
            </span>
              {isAdmin && 
                <span className="text-sm text-gray-500">
                Created by: {currentUser.firstName} {currentUser.lastName}
                </span>
              }
            <span className="text-sm text-gray-500">
              Posted on: {dateToLocaleString(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${post.status === 'pending' 
            ? 'bg-yellow-100 text-yellow-800'
            : post.status === 'approved'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'}`}
        >
          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
        </span>

        {isAdmin && post.status === "pending" && (
          <div className="flex gap-2">
            <Button
              onClick={() => handleStatusUpdate("approved")}
              disabled={isLoading}
              className="bg-primary-100 text-white hover:bg-primary-200 transition-colors"
            >
              {isLoading ? "Processing..." : "Approve"}
            </Button>
            <Button
              onClick={() => handleStatusUpdate("not_approved")}
              disabled={isLoading}
              className="bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              {isLoading ? "Processing..." : "Reject"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDash;
