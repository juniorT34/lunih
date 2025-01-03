"use server"
import { auth} from '@clerk/nextjs/server'
import {revalidatePath} from "next/cache"
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export type CreatePostParams = {
    title: string,
    description: string,
    category: string,
    image: string
}

export type UpdatePostParams = {
    postId: string
    title?: string
    description?: string
    category?: string
    image?: string
}

export async function createPost({title,description,category,image}: CreatePostParams){
    
    try {

        const {userId} = await auth()
        if(!userId){
            throw new Error("Unauthorized: Must be logged in to create a post")
        }

        // user from db
        const user = await prisma.user.findUnique({
            where: {clerkUserId: userId}
        })
        if (!user){
            throw new Error("User not found")
        }
        // create post
        
        const post = await prisma.post.create({
            data:{
                title,
                description,
                category: category as Category,
                imageUrl: image,
                userId: user.id,
            }
        })

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

export async function getPosts(){
    try{
        const posts = await prisma.post.findMany({
            include: {user: true},
            orderBy: {createdAt: "desc"}
        })
        return {success: true, data: posts}
    }catch(error){
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get posts"
        }
    }
}

export async function getPost(postId: string){
    try{
        const {userId} = await auth()
        if(!userId){
            throw new Error("Unauthorized: You must be logged in to view post")
        }

        const post = await prisma.post.findUnique({
            where: {id: postId},
            include:{
                user: true
            }
        })

        if(!post){
            throw new Error("Post not found")
        }
        return {success: true, data: post}
    }catch(error){
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to get post"
        }
    }
}

export async function updatePost({postId,title,description, category, image}: UpdatePostParams){
    try {
        const {userId} = await auth()
        if(!userId){
            throw new Error("Unauthorized: You must be logged in to update post")
        }

        //check if user owns the post
        const post = await prisma.post.findUnique({
            where: {id: postId},
            include:{user:true}
        })

        const user = await prisma.user.findUnique({
            where: {clerkUserId: userId}
        })

        if(!user || post?.userId !== user.id){
            throw new Error("Unauthorized: Can only update your own posts")
        }

        const updatedPost = await prisma.post.update({
            where: {id: postId},
            data:{
                ...(title && {title}),
                ...(description && {description}),
                ... (category && {category: category as Category}),
                ...(image && {imageUrl : image}),
                updatedAt: new Date()
            }
        })
        revalidatePath('/hub')
        return {success: true, data: updatePost}
    } catch (error) {
        console.error("Error updating post : ", error)
        return {
            success: false,
            error: error instanceof Error ? error.message: "Failed to update post"
        }
    }
}

export async function deletePost(postId: string){
    try {
        const {userId} = await auth()
        if(!userId){
            throw new Error("Unauthorized: You must be logged in to delete post")
        }

        // check if user owns the post
        const post = await prisma.post.findUnique({
            where: {id: postId},
            include:{user:true}
        })
        if(!post){
            throw new Error("Post not found")
        }
        const user = await prisma.user.findUnique({
            where: {clerkUserId: userId}
        })

        if(!user || post.userId !== user.id){
            throw new Error("Unauthorized: Can only delete your own posts")
        }

        // delete post
        await prisma.post.delete({
            where: {id: postId}
        })

        revalidatePath('/hub')
        return {success: true, message: "Post deleted successfully"}
    } catch (error) {
        console.error("Error deleting post : ", error)
        return {
            success: false,
            error: error instanceof Error ? error.message: "Failed to delete post"
        }
    }
}