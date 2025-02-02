import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu";
  import React from "react";


interface Answer {
    questionId: number;
    answer: string;
}

interface Product {
    id: string;
    brand: string;
    name: string;
    active_ingredients: string[];
    skin_type: string;
    product_type: string;
    price: number;
}

const navItems = [
    { label: "Home", href: "#" },
    { label: "Quiz", href: "#" },
    { label: "Profile", href: "#" },
  ];
  

const ResultsPage = async ({ searchParams }: {searchParams: {answers: string}}) => {
    let parsed_answers: Answer[] = [];
    if (searchParams.answers) {
        try {
            // Decode the URL-encoded string and parse it as JSON
            parsed_answers = JSON.parse(decodeURIComponent(searchParams.answers));
        } catch (error) {
            console.error('Error parsing answers:', error);
        }
    }

    const response = await fetch('http://127.0.0.1:8000/products');
    const products: Product[] = await response.json();

    const filterProducts = (answers: Answer[], products: Product[]) => {
        return products.filter((product) => {
            // Filter by skin type
            const skinTypeAnswer = answers.find((answer) => answer.questionId === 1); // Skin type questionId
            const matchesSkinType = skinTypeAnswer ? product.skin_type.toLowerCase() === skinTypeAnswer.answer.toLowerCase(): true;

            // Filter by price range (assuming price range is questionId 3)
            const priceRangeAnswer = answers.find((answer) => answer.questionId === 3);
            const matchesPriceRange = priceRangeAnswer ? {
                "$25 - $50": product.price >= 25 && product.price <= 50,
                "$50 - $100": product.price >= 50 && product.price <= 100,
                "$100 - $200": product.price >= 100 && product.price <= 200,
                "$0 - $25": product.price >= 0 && product.price <= 25,
            }[priceRangeAnswer.answer] : true;

            // Filter by product type (e.g., cleanser, moisturizer)
            const productTypeAnswer = answers.find((answer) => answer.questionId === 2); // Product type questionId
            const matchesProductType = productTypeAnswer ? product.product_type.toLowerCase() === productTypeAnswer.answer.toLowerCase() : true;

            // Combine the filters
            return matchesSkinType && matchesPriceRange && matchesProductType;
        });
    };

    const filteredProducts = filterProducts(parsed_answers, products);
    console.log(filteredProducts);


    /* return (
        <div> 
            <h1>Quiz Results</h1>
            <h2>Your Answers:</h2>
            <ul>
                {parsed_answers.map((answer) => (
                    <li key={answer.questionId}>
                        Question {answer.questionId}: {answer.answer}
                    </li>
                ))}
            </ul>
            <h2>Recommended Products:</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.brand} | ${product.price}
                    </li>
                ))}
            </ul>        
        </div>
    ); */

    return (
        <div className="min-h-screen bg-[#fff1f1]">
          <div className="container mx-auto relative h-screen">
    
            {/* Navigation Menu */}
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
    
            {/* Results Section */}
            <div className="absolute w-full bottom-0 pb-24 bg-gradient-to-b from-[#fff1f1] via-[#fff1f1] to-[#dd8c8f]">
              <div className="flex flex-col items-center gap-8 mb-32">
    
                {/* User Answers */}
                <h1 className="text-[#27245e] text-6xl font-bold">Your Answers</h1>
                <div className="w-full max-w-4xl">
                  {parsed_answers.map((answer) => (
                    <Card key={answer.questionId} className="mb-4">
                      <CardContent className="p-4">
                        <div className="text-3xl text-[#27245e]">
                          Question {answer.questionId}: {answer.answer}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
    
                {/* Recommended Products */}
                <h2 className="text-[#27245e] text-6xl font-bold mt-8">Recommended Products</h2>
                <div className="w-full max-w-4xl">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Card key={product.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="text-3xl text-[#27245e] font-medium">
                            {product.name} - {product.brand}
                          </div>
                          <div className="text-2xl text-[#27245e] mt-2">
                            Price: ${product.price}
                          </div>
                          <div className="text-xl text-[#27245e] mt-1">
                            Type: {product.product_type} | Skin Type: {product.skin_type}
                          </div>
                          <div className="text-lg text-[#27245e] mt-1">
                            Active Ingredients: {product.active_ingredients.join(", ")}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-3xl text-[#27245e] font-medium mt-4">No matching products found.</p>
                  )}
                </div>
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
                  Retake Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default ResultsPage;
