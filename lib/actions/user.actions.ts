import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User){
    try {
        const user = await prisma.user.create({data})
    } catch (error) {
        return {error}
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