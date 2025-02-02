import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";

const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Quiz", href: "#" },
  { label: "Profile", href: "#" },
];

const skinCareOptions = [
  [
    { label: "Cleanser", id: "cleanser" },
    { label: "Moisturizer", id: "moisturizer" },
  ],
  [
    { label: "Toner", id: "toner" },
    { label: "Serum", id: "serum" },
    { label: "Spot Treatment", id: "spot-treatment" },
  ],
];

const Question = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#fff1f1]">
      <div className="container mx-auto px-4">
        <NavigationMenu className="py-4">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="text-[#27245e] opacity-90 text-3xl font-['Timmana-Regular'] px-6"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex justify-center my-8">
          <img
            src=""
            alt="Skintel Logo"
            className="w-[809px] h-[220px] object-contain"
          />
        </div>

        <div className="relative mt-8">
          <div className="space-y-8">
            {skinCareOptions.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-8">
                {row.map((option) => (
                  <Card
                    key={option.id}
                    className="w-[494px] h-[110px] bg-white rounded-lg relative"
                  >
                    <CardContent className="flex items-center justify-between p-6">
                      <span className="text-[#27245e] text-5xl font-['Alata-Regular']">
                        {option.label}
                      </span>
                      <Checkbox
                        id={option.id}
                        className="h-14 w-14 rounded-full border-4 border-[#eecccc]"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-16">
            <Button
              variant="ghost"
              className="text-[#27245e] text-7xl font-['Alata-Regular']"
            >
              Back
            </Button>
            <Button
              variant="ghost"
              className="text-[#27245e] text-7xl font-['Alata-Regular']"
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
