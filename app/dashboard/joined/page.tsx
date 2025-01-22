import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

const JoinedPostsPage = async () => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect('/sign-in');
    }

    const user = await prisma.user.findUnique({
        where: { 
            clerkUserId: userId as string 
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const joinedPosts = await prisma.joinList.findMany({
        where: {
            status: 'approved',
            userId: user.id
        },
        include: {
            post: {
                include: {
                    user: true
                }
            }
        }
    });

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">My Joined Posts</h1>
            
            <div className="space-y-4">
                {joinedPosts.map((join) => (
                    <div 
                        key={join.id} 
                        className="bg-white p-6 rounded-lg shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {join.post.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {join.post.description}
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>Posted by: {join.post.user.firstName} {join.post.user.lastName}</p>
                        </div>
                    </div>
                ))}
            </div>

            {joinedPosts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    You have not joined any posts yet.
                </p>
            )}
        </div>
    );
};

export default JoinedPostsPage;