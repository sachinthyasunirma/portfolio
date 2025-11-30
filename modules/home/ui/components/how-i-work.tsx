"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function HowIWork() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const steps = [
    {
      title: "Strategy",
      description:
        "Define goals, research market, understand user needs and create roadmap",
    },
    {
      title: "Design",
      description:
        "Create wireframes, prototypes, visual designs and design systems",
    },
    {
      title: "Prototyping & Development",
      description:
        "Build interactive prototypes, develop features and integrate functionality",
    },
    {
      title: "Quality assurance",
      description:
        "Test all features, fix bugs, ensure cross-browser compatibility and optimize performance",
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <Card className="bg-blue-500 text-white shadow-lg">
      <CardHeader>
        <Badge
          variant="secondary"
          className="w-fit bg-white/20 text-white border-none"
        >
          My design process
        </Badge>
        <CardTitle className="text-2xl">How I Work</CardTitle>
        <CardDescription className="text-blue-100">
          When it comes to design I always like to approach projects from a
          broader perspective. Considering big business goals, user needs,
          aesthetics as well as the overall feel and emotions of the final
          experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div key={index}>
            <div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => toggleSection(index)}
            >
              <span className="font-medium">{step.title}</span>
              <Plus
                className={`w-5 h-5 transition-transform duration-200 ${
                  expandedSection === index ? "rotate-45" : ""
                }`}
              />
            </div>
            {expandedSection === index && (
              <div className="mt-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-blue-100">
                {step.description}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
