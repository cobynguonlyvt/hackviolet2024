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
  { name: "Coby N.", text: "Love how it tailors recommendations to my budget—no more overpriced regrets!", rating: 5 },
];

const Desktop = (): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedText, setAnimatedText] = useState("Great skin isn't a secret.");

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
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
    }, 270); // Typing speed

    return () => clearInterval(typingInterval);
  }, []);

  const translateX = scrollPosition * 0.2; // Adjust for scroll speed

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9D8DB]">
      <div className="w-full px-4">
        {/* Navigation */}
        <img src="skintel_logo.svg" alt="Skintel Logo" className="w-full max-w-[509px] mx-auto" />

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-around py-16 pt-0 px-32">
          <div className="lg:w-1/2">
            <img src="bottle_cloud.svg" alt="Hero" className="w-full max-w-[1210px]" />
          </div>
          <div className="lg:w-1/2 space-y-48">
            <p className="text-[#26235E] text-4xl text-right">
              Say goodbye to skincare guesswork and hello to smart routines!
              SKINTEL dishes out the intel your skin craves—customized routines
              based on your unique skin type, concerns, and goals.
            </p>
            <h1 className="text-[#26235E] text-7xl text-right font-bold">
              {animatedText}
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

        {/* Quiz Section */}
        <div className="py-16">
          <h2 className="text-[#26235E] text-7xl text-left font-bold mb-8">
            Introducing the SKINTEL Quiz...
          </h2>
          <p className="text-[#26235E] text-4xl max-w-4xl">
            Not sure where to start with skincare? Take the SKINTEL Quiz—a quick
            and easy way to find a routine that actually works for you. Just
            tell us about your skin type, concerns, and budget, and we'll
            generate a personalized regimen with expert-approved products. No
            more guesswork, no more wasted money—just glowing results. Ready to
            get the skintel?
          </p>

          <div className="flex justify-start mt-8">
            <Link href="/quiz" passHref>
              <Button className="text-5xl py-8 px-16 bg-transparent border-2 border-white text-white hover:bg-white/10">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <h2 className="text-[#26235E] text-7xl text-right font-bold mb-16">
            Hear from real users...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-transparent">
                <CardContent className="p-6">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-[#26235E] w-6 h-6 fill-current"
                      />
                    ))}
                  </div>
                  <h3 className="text-[#26235E] text-4xl mb-4">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#D2999E] text-xl">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
