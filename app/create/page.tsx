"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/hub"); // Redirect to dashboard or home page
      }
      else {
        console.log(JSON.stringify(result, null, 2));
      }
      
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setError(error.errors?.[0]?.message || "An error occurred during sign in");
    }
  };

  return (
    <div className="border p-5 rounded w-[500px]">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter your password"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-red-500 mt-2">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <div className="text-sm text-center text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
              Register here
            </Link>
          </div>

          <div className="text-sm text-center text-gray-500">
            <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600">
              Forgot password?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;