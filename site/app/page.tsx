"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";


// Data for testimonials
const testimonials = [
  { name: "Ben C.", text: "Finally, a skincare quiz that actually gives me products that work—I'm obsessed!", rating: 5 },
  { name: "Justin S.", text: "The skintel is real—this quiz gave me the perfect routine without the trial and error!", rating: 5 },
  { name: "Hannah N.", text: "Super quick, super accurate, and my skin has never looked better!", rating: 5 },
  { name: "Coby N.", text: "Love how it tailors recommendations to my budget!", rating: 5 },
];

export default function Desktop(): JSX.Element {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedText, setAnimatedText] = useState("Great skin isn't a secret,");
  

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const finalText = "Great skin isn't a secret,  it's SKINTEL!";
    let index = animatedText.length;

    const typingInterval = setInterval(() => {
      if (index < finalText.length) {
        setAnimatedText((prev) => prev + finalText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 300); // Typing speed

    return () => clearInterval(typingInterval);
  }, [animatedText]);

  const translateX = scrollPosition * 0.2; // Adjust for scroll speed

  return (
    <div className="font-alata min-h-screen bg-gradient-to-b from-white to-[#F8B8CE]">
      <div className="w-full">

        {/* Navigation */}
        <img src="skintel_logo.svg" alt="Skintel Logo" className="absolute top-4 right-6 w-full max-w-[700px]" />

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-around py-16 pt-0 px-32">
          <div className="lg:w-1/2 relative">
            {/*Background Image */}
            <div 
              className = "absolute inset-0 bg-no-repeat bg-center bg-contain z-10"
              style = {{
                backgroundImage: "url('circle.png')",
                backgroundSize: '65%',
                opacity: 0.7
              }}
              />

            <img src="rotating_bottle.png" alt="Hero" className="relative w-full max-w-[1210px] z-10" />
          </div>
          <div className="lg:w-1/2 space-y-46">
            <p className="text-[#5d3483] text-4xl text-right mt-24 pt-16 translate-x-10">
              Say goodbye to skincare guesswork and hello to smart routines!
              SKINTEL dishes out the intel your skin craves—customized routines
              based on your unique skin type, concerns, and goals.
            </p>
            <h1 className="text-[#26235E] text-7xl text-right font-bold mt-20 pt-4">
              {animatedText}
              <span className="ml-1 blinking-cursor">|</span> 
            </h1>
          </div>
        </div>

        {/* Brand Carousel with Scroll Animation */}
        <Card>
          <CardContent className="p-2">
            <img
              src="skincare_logos.svg"
              alt="logos"
              className="w-50 h-auto"
              style={{
                transform: `translateX(${200 - translateX}px)`,
                transition: "transform 0.1s linear",
                willChange: "transform",
              }}
            />
          </CardContent>
        </Card>

        <h2 className="py-20 pl-8 text-[#26235E] text-5xl text-left font-bold mb-8">
          Introducing the SKINTEL Quiz...
        </h2>

        {/* Quiz Section */}
        <div className="pl-8 py-(-10) flex">
          {/* Left half: heading + text */}
          <div className="w-1/2 pr-8">
            <p className="text-[#5d3483] text-3xl mt-[-80px]">
              Not sure where to start with skincare? Take the SKINTEL Quiz—a quick
              and easy way to find a routine that actually works for you. Just
              tell us about your skin type, concerns, and budget, and we'll
              generate a personalized regimen with expert-approved products. No
              more guesswork, no more wasted money—just glowing results. Ready to
              get the skintel?
            </p>
          </div>

          {/* Right half: button */}
          <div className="w-1/2 flex items-center justify-center mt-[-110px]">
            <Link href="/quiz" passHref>
              <Button className="rounded-[100px] text-7xl py-14 px-16 bg-[#26235E] border-1 border-[#26235E] text-white hover:bg-transparent hover:border-[#26235E] hover:border-4 hover:text-[#26235E] duration-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16 mt-[-30px]">
          <h2 className="text-[#26235E] text-5xl text-left px-6 font-bold mb-5">
            Hear from real users...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-transparent border-none shadow-none">
                <CardContent className="p-6">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 stroke-[#26235E] fill-[#FFD700] stroke-[2px]"
                      />
                    ))}
                  </div>
                  <h3 className="text-[#26235E] text-4xl mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#5d3483] text-xl">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
