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
    // Remove id, createdAt, and updatedAt from update data
    const { id, createdAt, updatedAt, ...updateData } = userData;
    
    const updatedUser = await prisma.user.update({
      where: { clerkUserId },
      data: {
        ...updateData,
        updatedAt: new Date(), // Update the timestamp
      },
    });
    
    console.log("User updated successfully:", updatedUser);
    return new Response(JSON.stringify({ success: true, data: updatedUser }), {
      status: 200
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to update user' }), {
      status: 500
    });
  }
}

export async function deleteUser(clerkUserId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkUserId },
    });
    
    console.log("User deleted successfully:", deletedUser);
    return new Response(JSON.stringify({ success: true, data: deletedUser }), {
      status: 200
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to delete user' }), {
      status: 500
    });
  }
}