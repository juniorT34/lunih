"use server"
import { auth} from '@clerk/nextjs/server'
import {revalidatePath} from "next/cache"
import prisma from "@/lib/prisma";
// import {}
import { Category } from "@prisma/client";

export type CreatePostParams = {
    title: string,
    description: string,
    category: string,
    image: string
}

export async function createPost({title,description,category,image}: CreatePostParams){
    // console.log("🚀 Server Action Started!")
    try {

        const {userId} = await auth()
        // console.log("🔑 Auth userId:", userId)
        if(!userId){
            // console.log("❌ No userId found")
            throw new Error("Unauthorized: Must be logged in to create a post")
        }

        // user from db
        const user = await prisma.user.findUnique({
            where: {clerkUserId: userId}
        })
        // console.log("👤 Found user:", user)
        if (!user){
            // console.log("❌ No user found in database")
            throw new Error("User not found")
        }
        // create post
        // console.log("📝 Attempting to create post with data:", {
        //     title,
        //     description,
        //     category,
        //     imageUrl: image,
        //     userId: user.id
        // })
        const post = await prisma.post.create({
            data:{
                title,
                description,
                category: category as Category,
                imageUrl: image,
                userId: user.id,
            }
        })
        // console.log("Post created successfully:", post)

        revalidatePath('/hub')
        return {success: true, data: post, message: "Post created successfully"}

    } catch (error) {
        console.error("Error creating post : ", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create post"
        }
    }
}