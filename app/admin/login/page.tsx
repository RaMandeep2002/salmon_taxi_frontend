"use client";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { loginAdmin } from "../slices/slice/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const { token, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (token) {
      toast({
        title: "Already Logged In",
        description: "Redirecting to dashboard...",
      });
      router.push("/admin/dashboard");
    }
  }, [token, router, toast]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginAdmin({ email, password })).unwrap();
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.log("Error ==> ", error);
      // setIsLoading(false);
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
<div  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.postimg.cc/JnTcbvg9/bg-1.png')",
  }}> 

      <div>
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
