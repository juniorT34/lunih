"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

import {useRouter} from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.actions";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  category: z.string().min(1,{message: "choose at least one"}),
  description: z.string().min(20,{message: "description must be at least 20 characters"}),
  image: z.string(),
});

export default function CreatePostForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: "",
    },
  });
  

  const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      setIsUploading(true);
      // pinata
      try {
        const data = new FormData()
        data.set("file", file)
  
        const response = await fetch("/api/files",{
          method: "POST",
          body: data,
        })

        if(!response.ok){
          throw new Error("Failed to upload image")
        }
  
        const signedUrl = await response.json()
        setImageUrl(signedUrl)
        
        // Create a preview URL
        const url = URL.createObjectURL(file);
        setPreview(url);
      } catch (error) {
        console.error("Error uploading image : ",error)
        toast({
          title:"Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        })
        
      }finally{

        setIsUploading(false);
      }
      
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    
    try {
      // console.log("Starting form submission!!!")
      const formData = {
        title: values.title,
        description: values.description,
        category: values.category,
        image: imageUrl
      }
      // console.log("Sending to server : ", formData)
      const result = await createPost(formData)

      if(result.success){
        toast({
          title: "Success!",
          description: "Your post has been created."
        })
        router.push("/hub")
      }else{
        toast({
          title:"Error",
          description: result.error || "Failed to create post",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error + "Something went wrong. Please try again.",
        variant: "destructive"

      })
    }
  }


  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-full min-w-[700px] mx-auto p-4 sm:p-6 md:p-8 border border-gray-200 rounded-lg"
        suppressHydrationWarning
      >
        {/* Title and Category Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post title</FormLabel>
                <FormControl>
                  <Input placeholder="Title here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Project">Project</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Thesis">Thesis</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description Section */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description..."
                  className="min-h-[120px] sm:min-h-[160px] md:min-h-[200px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Section */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                      ) : preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="h-full w-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImagePlus className="w-8 h-8 text-gray-500" />
                          <p className="text-sm text-gray-500">Click to upload image</p>
                        </div>
                      )}
                    </label>
                    <input type="hidden" {...field} />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary-100 hover:bg-primary-200"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}