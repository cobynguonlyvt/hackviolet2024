import React from "react"
import { JSX } from "react/jsx-dev-runtime"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getUserData(authToken: string) {
    const response = await fetch("http://127.0.0.1:8000/profile/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return await response.json();
}

export default async function Profile(): JSX.Element {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");

    //const cookieStore = await cookies();
    //const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzllOTFiMGU5OTAwMTE2YTlhOTkxODkiLCJleHAiOjE3NDM2NjcwNTZ9.QPZzhGnSE3GXGAXhscSymCYB7y6VTlEVbinLa6uv6cM";

    console.log(authToken);

    if (!authToken) {
        redirect("/signin");
    }
    else {
        const data = await getUserData(authToken);
        console.log(data);
    }

    return (
        <div className="font-alata min-h-screen bg-gradient-to-b from-white to-[#F9D8DB]">
            <div className="relative container mx-auto px-4">


                {/* Logo (same style as on the homepage) */}
                <div className="w-[px] h-[220px] mx-auto">
                    <img
                        src="/skintel_logo.svg" 
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
