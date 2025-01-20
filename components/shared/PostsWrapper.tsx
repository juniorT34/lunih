import { auth } from '@clerk/nextjs/server'
import Posts from './Posts'

export default async function PostsWrapper() {
  try {
    
  
  const { userId } = await auth()
  
  return <Posts UserId={userId} />
} catch (error) {
 console.error("Error fetching user: ",error);
 return <p>Please log in to view posts.</p>   
}
}

