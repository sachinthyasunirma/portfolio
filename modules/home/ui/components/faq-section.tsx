import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "Are you available for new projects?",
      answer:
        "Yes, I am available for new and challenging projects. Please get in touch to discuss your requirements.",
    },
    {
      question: "What kind of projects do you specialize in?",
      answer:
        "I specialize in end-to-end development of web applications, particularly in e-commerce, tourism, and e-learning domains, using modern Java and JavaScript ecosystems.",
    },
    {
      question: "What is your typical tech stack?",
      answer:
        "My core stack includes ReactJS, Next.js, Spring Boot (Microservices), and Node.js, coupled with databases like MySQL and MongoDB.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        <CardDescription className="text-purple-100">
          Find answers to your questions or contact me using direct telegram or
          email.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-center hover:bg-white/10 rounded-md p-2">
              <span className="text-sm font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {openIndex === index && (
              <div className="text-xs text-purple-100 mt-2 px-2 pb-2 leading-relaxed animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
