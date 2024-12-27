import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
    try {
      // Remove id from data if it's empty string or undefined
      if (!data.id) {
        const { id, ...userData } = data;
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
        const user = await prisma.user.findUnique({where: query})
    } catch (error) {
        
    }
}

export async function UpdateUser(id: string, data: Partial<User>){
    try {
        const user = await prisma.user.update({
            where: {id},
            data
        })
    } catch (error) {
        return {error}
    }
}

export async function DeleteUser(id: string){
    try {
        const user = await prisma.user.deleteMany({
            where: {id}
        })

    } catch (error) {
        return {error}
    }
}