
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call an authentication API
    console.log("Login attempt:", values);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to SoleVenture!",
      });
      navigate('/');
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container max-w-md mx-auto py-16 px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-brand hover:text-brand/80 transition">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center">
                  <LogIn className="h-8 w-8 text-brand" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-muted-foreground">Enter your credentials to access exclusive SoleVenture offers</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link to="#" className="text-sm text-brand hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full bg-brand hover:bg-brand/90" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">New to SoleVenture?</span>
              </div>
            </div>

            <div className="text-center">
              <Link to="/signup" className="w-full inline-block">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to SoleVenture's Terms of Service & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
