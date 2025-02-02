import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { LoginForm } from "@/components/login-form";

const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Quiz", href: "#" },
  { label: "Profile", href: "#" },
];

export default function SignInPage(): JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F8B8CE] w-full flex flex-col items-center pt-8">
          {/* Logo Section */}
          <div className="w-full flex justify-center">
            <img src="skintel_logo.png" alt="Skintel Logo" className="max-w-[300px] mt-[-90px]" />
          </div>
    
          {/* Background Elements */}
          <div className="absolute left-10 bottom-20 w-[500px]">
            <img src="star.png" alt="Star" className="w-[400px] h-auto mt-[-90px] opacity-70" />
          </div>
          <div className="absolute right-10 bottom-20 w-[500px] flex justify-end">
            <img src="heart.png" alt="Heart" className="w-[400px] h-auto mt-[-90px] opacity-70" />
    
          
        </div>
            {/* Login Form Section */}
            <div className="mt-8 w-full flex justify-center">
            <Card className="bg-transparent border-none">
                <CardContent className="space-y-8 p-8">
                {/* LoginForm */}
                    <LoginForm />
                </CardContent>
            </Card>
        </div>

        {/* Background Gradient */}
        <div className="fixed bottom-0 left-0 right-0 h-[715px] [background:linear-gradient(180deg,rgb(255,241,241)_6%,rgb(221,140,143)_100%)] -z-10" />
        </div>
    );


}
