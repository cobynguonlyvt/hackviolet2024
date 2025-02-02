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


    const handleBack = () => {
        if (currentIdx > 0) {
          // Remove last answer
          const updatedAnswers = answers.slice(0, -1);
          setAnswers(updatedAnswers);
          setCurrentIdx((prev) => prev - 1);
        }
      };
    
      // (Optional) Next button: if you want a “Skip” approach
      // This adds an empty answer and moves on.
      const handleNext = () => {
        // Only skip if not on the last question
        if (currentIdx < questions.length - 1) {
          const updatedAnswers = [
            ...answers,
            { questionId: questions[currentIdx].id, answer: "" }, // or "Skipped"
          ];
          setAnswers(updatedAnswers);
          setCurrentIdx(currentIdx + 1);
        } else {
          router.push(`quiz/results?answers=${JSON.stringify(answers)}`);
        }
      };
    
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
        
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F8B8CE] w-full flex flex-col items-center pt-8">
            <div className="w-full flex justify-center">
                <img src="skintel_logo.png" alt="Skintel Logo" className="max-w-[300px] mt-[-90px]" />
            </div>
            <div className="absolute left-10 bottom-20 w-[500px]">
                 <img src="star.png" alt="Star" className="w-[400px] h-auto mt-[-90px] opacity-70" />
            </div>

            <div className="absolute right-10 bottom-20 w-[500px] flex justify-end">
                <img src="heart.png" alt="Heart" className="w-[400px] h-auto mt-[-90px] opacity-70" />
            </div>
            <div
                className="text-center p-8 max-w-2xl mx-auto mt-[10]"
                key={currentQuestion.id} // Ensure unique key for each question transition
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-5xl text-[#26235E] font-bold mb-8">{currentQuestion.question}</h2>
                <div className="flex flex-col items-center space-y-4">
                    {currentQuestion.options.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="w-[300px] text-xl py-8 px-6 bg-[#fc8fe6] border-4 border-[#fc8fe6] text-white hover:bg-[#fc8fe6] hover:bg-transparent hover:text-[#fc8fe6] rounded-full duration-700"
                        >
                            {option}
                        </Button>
                    ))}
                    
                </div>
            </div>

            {/* Back / Next buttons */}
      <div className="flex gap-8 mt-8">
        {/* Show Back button only if not on the first question */}
        {currentIdx > 0 && (
          <Button
            onClick={handleBack}
            className="w-[200px] text-xl py-4 px-8
                       bg-[#26235E] border-4 border-[#26235E] text-white
                       hover:bg-transparent hover:text-[#26235E]
                       hover:border-[#26235E] rounded-full duration-700"
          >
            Back
          </Button>
        )}

      </div>
    </div>
  );
}
