"use server"
import { auth} from '@clerk/nextjs/server'
import {revalidatePath} from "next/cache"
import prisma from "@/lib/prisma";

export type CreatePostParams = {
    title: string,
    description: string,
    category: string,
    image: string
}

export async function createPost({title,description,category,image}: CreatePostParams){
    try {
        const {userId} = auth()
        if(!userId){
            throw new Error("Unauthorized: Must be logged in to create a post")
        }

        // user from db
        const user = await prisma.user.findUnique({
            where: {clerkUserId: userId},
            select: {id: true}
        })

        if (!user){
            throw new Error("User not found")
        }
        // create post
        const post = await prisma.post.create({
            data:{
                title,
                description,
                category,
                imageUrl: image,
                userId: user.id,
            }
        })

        revalidatePath('/hub')
        return {success: true, data: post}

    } catch (error) {
        console.error("Error creating post : ", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create post"
        }
    }
}