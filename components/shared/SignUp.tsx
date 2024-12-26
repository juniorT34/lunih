"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "company", "school"]),
//   unsafeMetadata: z.object({
//     role: z.enum(["student", "company", "school"])
//   })
});

const codeSchema = z.object({
    code: z.string().min(6, "The code must be at least 6 characters")
})

type CodeRegistration = z.infer<typeof codeSchema>

type RegistrationSchema = z.infer<typeof registrationSchema>;

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: undefined,
    //   unsafeMetadata: {
    //     role: undefined
    //   }
    },
  });

  const formCode = useForm<CodeRegistration>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: RegistrationSchema) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata:{
            role: data.role
        }
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onPressVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/hub");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="border p-5 rounded w-[500px]">
      <h1 className="text-2xl mb-4">Register</h1>
      {!pendingVerification ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Junior" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Turs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="junior@example.com" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary-100 hover:bg-primary-200">
              Create an account
            </Button>
            <div className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary-100 hover:text-primary-200">
              Login here
            </Link>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...formCode}>
          <form className="space-y-4">
            <FormField
              control={formCode.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter verification code..."
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={onPressVerify} className="w-full">
              Verify Email
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default RegisterPage;