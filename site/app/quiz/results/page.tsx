import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { redirect } from "next/navigation";

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

    const handleAdd = (product: Product) => {
        console.log(product);
        const product_id = product.id;
        console.log(`adding ${product_id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fff1f1] to-[#dd8c8f]">
            <div className="container mx-auto relative h-full ">
                {/* Results Section */}
                <div className="absolute w-full pb-24 ">
                    <div className="flex flex-col justify-around items-center gap-8 my-32">


                        {/* Recommended Products */}
                        <h2 className="text-[#27245e] text-4xl font-bold mt-8">Recommended Products</h2>
                        <div className="w-full max-w-4xl">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Card key={product.id} className="mb-4">
                                        <CardContent className="p-4">
                                            <div className="text-3xl text-[#27245e] font-medium">
                                                {product.name}
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
                                            <button
                                                onClick={handleAdd(product)}
                                                key={product.id}
                                                className="w-[200px] h-[50px] justify-center items-center mt-4 text-xl py-0 px-0 bg-[#26235E] border-4 border-[#26235E] text-white hover:bg-transparent hover:text-[#26235E] hover:border-[#26235E] rounded-full duration-700"
                                            >
                                                    Add to Routine
                                            </button>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                    <p className="text-3xl text-[#27245e] font-medium mt-4">No matching products found.</p>
                                )}
                        </div>

                        {/**
                        *<h1 className="text-[#27245e] text-4xl font-bold">Your Answers</h1>
                        *<div className="w-full max-w-4xl">
                        *    {parsed_answers.map((answer) => (
                        *        <Card key={answer.questionId} className="mb-4">
                        *            <CardContent className="p-4">
                        *                <div className="text-xl text-[#27245e]">
                        *                    Question {answer.questionId}: {answer.answer}
                        *                </div>
                        *            </CardContent>
                        *        </Card>
                        *    ))}
                        *</div>
                        */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
