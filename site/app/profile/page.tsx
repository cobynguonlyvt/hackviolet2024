import React from "react"
import { JSX } from "react/jsx-dev-runtime"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
    id: string;
    brand: string;
    name: string;
    active_ingredients: string[];
    skin_type: string;
    product_type: string;
    price: number;
}

async function getUserData(authToken: string) {
    const response = await fetch("http://127.0.0.1:8000/profile/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
}


export default async function Profile(): JSX.Element {

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzllOTFiMGU5OTAwMTE2YTlhOTkxODkiLCJleHAiOjE3NDM2Njk3MzN9.OaTee46UwRMmTVz4KtSp6nN4iiQPVsfuLmubQj3em6g";

    console.log(authToken);

    if (!authToken) {
        redirect("/signin");
    }

    const response = await fetch("http://127.0.0.1:8000/profile/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const products: Product[] = await response.json();
    //console.log(products.products);
    //const cookieStore = await cookies();

    return (
        <div className="font-alata min-h-screen bg-gradient-to-b from-white to-[#F8B8CE]">
            <div className="container mx-auto relative h-full ">
              {/* Logo (same style as on the homepage) */}
        <div className="w-[px] h-[220px] mx-auto">
          <img
            src="/skintel_logo.png" 
            alt="Skintel Logo"
            className="w-full max-w-[509px] mx-auto"          />
                {/* Results Section */}
                <div className="absolute w-full pb-24 ">
                    <div className="flex flex-col justify-around items-center gap-8 my-32">


                        {/* Recommended Products */}
                        <h2 className="text-[#27245e] text-4xl font-bold mt-8">Your Routine</h2>

                        <div className="w-full max-w-4xl">
                            {products.products.map((product) => (
                                <Card key={product.id} className="mb-4">
                                    <CardContent className="p-4">
                                        <div className="text-3xl text-[#27245e] font-medium">
                                            {product.name}
                                        </div>
                                        <div className="text-2xl text-[#27245e]">
                                            ${product.price}
                                        </div>
                                        <div className="text-xl text-[#27245e]">
                                            Type: {product.product_type} | Skin Type: {product.skin_type}
                                        </div>
                                        <div className="text-lg text-[#27245e]">
                                            Active Ingredients: {product.active_ingredients}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
