"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import { updatePost, getPost } from "@/lib/actions/post.actions";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  category: z.string().min(1, { message: "choose at least one" }),
  description: z
    .string()
    .min(20, { message: "description must be at least 20 characters" }),
  imageUrl: z.string().optional(),
});

export default function EditPostForm({ postId }: { postId: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId){
        setError("Post ID is required");
        setIsLoading(false);
      };
      
      try {
        const response = await getPost(postId);
        // console.log("Post response:", response);
        if (!response.success) {
          throw new Error(response.error);
        }

        const post = response.data;
        if (!post) {
          throw new Error("No post data received");
        }
        
        if (response.success && response.data) {
          const post = response.data;
          
          form.reset({
            title: post.title,
            category: post.category,
            description: post.description,
            imageUrl: post.imageUrl ?? undefined,
          });
          
          setPreview(post.imageUrl || "");
          setError(null);
        } else {
          throw new Error(response.error || "Failed to fetch post");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch post";
        setError(errorMessage);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch post data",
          variant: "destructive",
        });
        router.push("/hub");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, form, toast,router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = new FormData();
      data.set("file", file);

      const response = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const signedUrl = await response.json();
      form.setValue("imageUrl", signedUrl);
      setPreview(URL.createObjectURL(file));
    } catch (error) {
      toast({
        title: "Error",
        description: error + "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await updatePost({
        postId,
        title: values.title,
        description: values.description,
        category: values.category,
        image: preview
      });

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your post has been updated.",
        });
        router.push("/hub");
      } else {
        throw new Error(result.error || "Failed to update post");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p>Loading post data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.push("/hub")}>Return to Hub</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 h-full min-w-[700px] mx-auto p-4 sm:p-6 md:p-8 border border-gray-200 rounded-lg"
      >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

        <FormField
          control={form.control}
          name="imageUrl"
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
                          <p className="text-sm text-gray-500">
                            Click to upload image
                          </p>
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
              Updating...
            </>
          ) : (
            "Update Post"
          )}
        </Button>
      </form>
    </Form>
  );
}