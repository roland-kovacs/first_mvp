"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { login, signup, AuthState } from './actions'
import { useState } from 'react';

const initialState: AuthState = {
  error: null
};

export function LoginForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [loginState, loginAction] = useActionState<AuthState, FormData>(login, initialState);
  const [signupState, signupAction] = useActionState<AuthState, FormData>(signup, initialState);

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">{isSignup ? 'Sign Up' : 'Login'}</CardTitle>
          <CardDescription className="text-sm text-center">
            {isSignup 
              ? 'Enter your credentials to create an account'
              : 'Enter your credentials to access your account'}
          </CardDescription>
        </CardHeader>
        <form action={isSignup ? signupAction : loginAction}>
          <CardContent className="space-y-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {(isSignup ? signupState.error : loginState.error) && (
                <div className="text-sm text-red-500 text-center">
                  {isSignup ? signupState.error : loginState.error}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-6">
            <div className="flex justify-center gap-4">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit">{isSignup ? 'Sign Up' : 'Login'}</Button>
            </div>
            <div className="text-center">
              <Button 
                variant="link" 
                type="button"
                onClick={handleToggleMode}
              >
                {isSignup 
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}