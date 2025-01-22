import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import JoinActionButtons from '@/components/shared/JoinActionButtons'
import { handleStatusChange } from '@/lib/actions/post.actions';
import PostDash from '@/components/shared/PostDash';

const PendingJoinsPage = async () => {
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


    const posts = await prisma.post.findMany({
        where: {
        status: 'pending',
        ...(user.role !== 'admin' && { userId: user.id }) // Admin sees all approved posts, others see only their approved posts
        },
        orderBy: {
        createdAt: 'desc'
        }
      });

    const currentUser = {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: user.imageUrl || undefined
    };

    const pendingJoins = await prisma.joinList.findMany({
        where: {
            status: 'pending',
            ...(user.role !== 'admin' && {
                userId: user.id
            })
        },
        include: {
            user: true, // Person who wants to join
            post: {
                include: {
                    user: true // Post creator
                }
            }
        },
        orderBy: {
            joined_at: 'desc'
        }
    });

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

                <br className='space-y-4'/>

            <h1 className="text-2xl font-bold mb-6 ">
                {user.role === 'admin' ? 'All Pending Join Requests' : 'Pending Join Requests for Your Posts'}
            </h1>
            
            <div className="space-y-4">
                {pendingJoins.map((join) => (
        <div key={join.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
                {join.post.title}
            </h2>
            <p className="text-gray-600 mb-4">
                {join.post.description}
            </p>
            <div className="text-sm text-gray-500">
                <p>Request from: {join.user.firstName} {join.user.lastName}</p>
                <p>Post by: {join.post.user.firstName} {join.post.user.lastName}</p>
            </div>
            {user.role === 'admin' && <JoinActionButtons joinId={join.id} />}
        </div>
    ))}
            </div>

            {pendingJoins.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                    No pending join requests found.
                </p>
            )}
        </div>
    );
};

export default PendingJoinsPage;