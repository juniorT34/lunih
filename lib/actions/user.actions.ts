import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
    try {
      // Remove id from data if it's empty string or undefined
      if (!data.id) {
        const { ...userData } = data;
        const user = await prisma.user.create({
          data: userData,
        });
        console.log("User created successfully:", user);
        return new Response("User successfully created", { status: 201 });
      }
  
      const user = await prisma.user.create({
        data,
      });
      console.log("User created successfully:", user);
      return new Response("User successfully created", { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error occurred while creating user', {
        status: 500
      });
    }
  }

export async function getUserById({id, clerkUserId} : {id?:string,clerkUserId?: string}) {
    try {
        if(!id && !clerkUserId){
            throw new Error("id or clerkUserId is required")
        }
        const query = id ? {id} : {clerkUserId}
        // const user = await prisma.user.findUnique({where: query})
    } catch (error) {
        console.error("Error fetching user : ", error)
        return new Response("Error fetching user", {status: 500})
        
    }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function updateUser(clerkUserId: string, userData: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkUserId },
      data: userData,
    });
    
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(clerkUserId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkUserId },
    });
    
    return { success: true, data: deletedUser };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}