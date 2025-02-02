"use client";

import { React, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next/link";
import { useRouter } from "next/navigation";

export default function Quiz() {
    const questions = [
        {
            id: 1,
            question: "What is your skin type?",
            options: ["Oily", "Dry", "Combo"],
        },
        {
            id: 2,
            question: "What type of product are you looking for?",
            options: ["Cleanser", "Moisturizer", "Toner", "Serum", "Spot Treatment"],
        },
        {
            id: 3,
            question: "What's your budget?",
            options: ["$0 - $25", "$25 - $50", "$50 - $100", "Over $100"],
        }
    ]

    const [answers, setAnswers] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const router = useRouter();

    const handleAnswer = (answer: string) => {
        const updatedAnswers = [
            ...answers,
            { questionId: questions[currentIdx].id, answer }
        ];

        setAnswers(updatedAnswers);

        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
        else {
            router.push(`quiz/results?answers=${JSON.stringify(updatedAnswers)}`);
        }
    }

    const currentQuestion = questions[currentIdx]


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F9D8DB]">
            <div
                className="text-center p-8 max-w-2xl mx-auto"
                key={currentQuestion.id} // Ensure unique key for each question transition
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl text-[#26235E] font-bold mb-8">{currentQuestion.question}</h2>
                <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="w-full text-xl py-4 px-8 bg-transparent border-2 border-[#26235E] text-[#26235E] hover:bg-[#F9D8DB]"
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </div>
        </div>    )
}
