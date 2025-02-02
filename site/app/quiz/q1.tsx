import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Quiz", href: "#" },
  { label: "Profile", href: "#" },
];

const skinTypes = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
];

export default function Question(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fff1f1]">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <NavigationMenu className="py-4">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="opacity-90 font-normal text-[#27245e] text-[37px] px-4"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo */}
        <div className="flex justify-center my-8">
          <img src="" alt="SKINTEL" className="w-[809px] h-[220px]" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[100px] text-[#27245e] font-normal mb-8">
            Question 1
          </h1>
          <h2 className="text-[70px] text-[#27245e] font-normal mb-12">
            What is your skin type?
          </h2>

          <Card className="bg-transparent border-none">
            <CardContent>
              <RadioGroup className="space-y-6">
                {skinTypes.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <Card className="w-[494px] h-[110px] flex items-center relative">
                      <CardContent className="flex items-center justify-between w-full p-6">
                        <Label
                          htmlFor={type.value}
                          className="text-[50px] text-[#27245e] font-normal"
                        >
                          {type.label}
                        </Label>
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="w-[55px] h-[55px] border-4 border-[#eecccc]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-16">
            <Button
              variant="ghost"
              className="text-[70px] text-[#27245e] font-normal hover:bg-transparent"
            >
              Back
            </Button>
            <Button
              variant="ghost"
              className="text-[70px] text-[#27245e] font-normal hover:bg-transparent"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-[715px] [background:linear-gradient(180deg,rgb(255,241,241)_6%,rgb(221,140,143)_100%)] -z-10" />
    </div>
  );
}
