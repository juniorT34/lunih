export interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
  clerkUserId: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface PostsType {
  success: boolean;
  data?: Post[];
  error?: string;
}
