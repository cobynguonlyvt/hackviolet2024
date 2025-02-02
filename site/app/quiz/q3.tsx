import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Quiz", href: "#" },
  { label: "Profile", href: "#" },
];

const Question = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#fff1f1]">
      <div className="container mx-auto relative h-screen">
        {/* Navigation */}
        <NavigationMenu className="pt-12">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="opacity-90 font-normal text-[#27245e] text-4xl px-4 hover:text-opacity-80 transition-colors"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo */}
        <div className="flex justify-center mt-8">
          <img
            src=""
            alt="SKINTEL"
            className="w-[809px] h-[220px] object-contain"
          />
        </div>

        {/* Main Content */}
        <div className="absolute w-full bottom-0 pb-24 bg-gradient-to-b from-[#fff1f1] via-[#fff1f1] to-[#dd8c8f]">
          <div className="flex justify-center gap-16 mb-32">
            {/* Radio Group */}
            <RadioGroup defaultValue="" className="flex gap-16">
              <Card className="relative w-[702px]">
                <CardContent className="p-0">
                  <div className="flex items-center p-8">
                    <span className="text-[#27245e] text-5xl font-normal">
                      Low
                    </span>
                    <RadioGroupItem
                      value="low"
                      className="ml-auto w-14 h-14 border-4 border-[#eecccc]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative w-[702px]">
                <CardContent className="p-0">
                  <div className="flex items-center p-8">
                    <span className="text-[#27245e] text-5xl font-normal">
                      High
                    </span>
                    <RadioGroupItem
                      value="high"
                      className="ml-auto w-14 h-14 border-4 border-[#eecccc]"
                    />
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between px-14">
            <Button
              variant="ghost"
              className="text-[#27245e] text-7xl hover:bg-transparent hover:text-opacity-80"
            >
              Back
            </Button>
            <Button
              variant="ghost"
              className="text-[#27245e] text-7xl hover:bg-transparent hover:text-opacity-80"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
