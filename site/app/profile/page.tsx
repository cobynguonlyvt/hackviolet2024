import React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { JSX } from "react/jsx-dev-runtime"

// Example navigation items
const navigationItems = [
  
  { label: "Home", href: "/" },
  { label: "Quiz", href: "/quiz" },
  { label: "Profile", href: "/profile" },
]



export default function Profile(): JSX.Element {
  return (
   <div className="font-alata min-h-screen bg-gradient-to-b from-white to-[#F8B8CE]">
     <div className="relative container mx-auto px-4">
        

        {/* Logo (same style as on the homepage) */}
        <div className="w-[px] h-[220px] mx-auto">
          <img
            src="/skintel_logo.png" 
            alt="Skintel Logo"
            className="w-full max-w-[509px] mx-auto"          />
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center justify-center gap-12 pt-8">
          <h1 className="text-[#27245e] text-7xl font-['Alata-Regular'] text-center">
            My Profile
          </h1>
          <p className="text-[#27245e] text-2xl text-center">
            Welcome to your profile page!
          </p>
          {/* 
            Add your profile details, user settings, etc.
            For example, user info cards, "Edit Profile" button, etc.
          */}
        </div>

        {/* Gradient Background (same as your homepage) */}
        <div className="w-full px-4"></div>
      </div>
    </div>
  )
}
