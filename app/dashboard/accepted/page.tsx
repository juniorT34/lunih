import PostDash from '@/components/shared/PostDash';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';
import { handleStatusChange } from '@/lib/actions/post.actions';

const AllPostsPage = async () => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect('/sign-in');
    }

    // Get the current user
    const user = await prisma.user.findUnique({
        where: { 
            clerkUserId: userId as string 
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Fetch posts based on user role
    const posts = await prisma.post.findMany({
        where: {
          status: 'approved',
          ...(user.role !== 'admin' && { userId: user.id })
        },
        include: {
          user: true // Include the user (creator) information
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    // Convert the Prisma user model to match the User type expected by PostDash
    const currentUser = {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl || undefined
    };

    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                {user.role === 'admin' ? 'All Posts' : 'My Posts'}
            </h1>
            
            <div className="space-y-4">
                {posts.map((post) => (
                    <PostDash
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>

            {posts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    No posts found.
                </p>
            )}
        </div>
    );
};

export default AllPostsPage;