import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { JSX } from "react/jsx-dev-runtime";

const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Quiz", href: "#" },
  { label: "Profile", href: "#" },
];

export default function Prequiz(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fff1f1]">
      <div className="relative container mx-auto px-4">
        {/* Navigation */}
        <NavigationMenu className="py-4">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="text-[#27245e] opacity-90 text-4xl font-['Timmana-Regular'] px-6 hover:opacity-100"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12 pt-8">
          {/* Logo */}
          <div className="w-[809px] h-[220px]">
            <img
              src=""
              alt="Skintel Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-[#27245e] text-7xl font-['Alata-Regular'] text-center">
            Find your products!
          </h1>

          {/* Start Quiz Button */}
          <Card className="mt-auto relative">
            <CardContent className="p-0">
              <Button className="w-[551px] h-[163px] bg-white hover:bg-gray-50">
                <span className="text-[#27245e] text-[80px] font-['Alata-Regular']">
                  Start Quiz
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Gradient Background */}
        <div className="absolute bottom-0 left-0 right-0 h-[715px] [background:linear-gradient(180deg,rgb(255,241,241)_6%,rgb(221,140,143)_100%)]" />
      </div>
    </div>
  );
}

