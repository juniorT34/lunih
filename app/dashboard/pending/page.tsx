import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
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
          ...(user.role !== 'admin' && { userId: user.id })
        },
        include: {
          user: true // Include the user (creator) information
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

    return (
        <div className="container mx-auto p-6">

<h1 className="text-2xl font-bold mb-6">
                {user.role === 'admin' ? 'All Pending Posts' : 'Pending Posts'}
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
        </div>
    );
};

export default PendingJoinsPage;