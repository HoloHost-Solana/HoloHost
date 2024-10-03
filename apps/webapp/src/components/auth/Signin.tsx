"use client";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your Zod schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Signup() {
  // Initialize the form using React Hook Form and Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Function to handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Here you can add your signup logic (e.g., API call to create account)
  };

  return (
    <Card className="bg-[#0A0A0A] text-white border-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log In</CardTitle>
        <CardDescription>
          Fill Your Deatils To Login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button
            variant="outline"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            {/* Optional: Add a line or any other decoration */}
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-grey-400 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")} // Register email input
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")} // Register password input
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <div className="text-red-500">
                {errors.password.message as string}
              </div>
            )}
          </div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-slate-50">
            Create account
          </Button>
        </form>
      </CardContent>
      <CardFooter>{/* Optional footer content */}</CardFooter>
    </Card>
  );
}
