import { auth } from '@clerk/nextjs/server'
import Posts from './Posts'

export default async function PostsWrapper() {
  const { userId } = await auth()
  
  return <Posts UserId={userId} />
}