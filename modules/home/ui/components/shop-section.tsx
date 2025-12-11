"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Figma, Github, Globe } from "lucide-react";

// Define project data type
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  figmaLink?: string;
  liveLink?: string;
  githubLink?: string;
  features: string[];
}

interface Figma {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  figmaLink?: string;
  liveLink?: string;
  githubLink?: string;
  features: string[];
}

export default function ShopSection() {
  const [isOpen, setIsOpen] = useState(false);

  const images = ["itos2", "hotel", "artgallery", "transport"];

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Hotel Booking & Landing Page Design",
      description:
        "A comprehensive hotel booking and management platform with real-time availability, payment processing, and admin dashboard.",
      category: "Web Application",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe", "MongoDB"],
      image: "/images/hotel.png",
      // figmaLink: "https://www.figma.com/file/your-figma-link-1",
      // liveLink: "https://hotel-demo.example.com",
      // githubLink: "https://github.com/yourusername/hotel-management",
      features: [
        "Real-time room availability",
        "Secure payment processing",
        "Admin dashboard with analytics",
        "Multi-language support",
      ],
    },
    {
      id: 2,
      title: "Art Gallery Platform",
      description:
        "An online art gallery showcasing digital and physical artworks with virtual exhibition rooms.",
      category: "E-commerce",
      tags: ["React", "Three.js", "Node.js", "PostgreSQL", "AWS"],
      image: "/images/artgallery.png",
      // figmaLink: "https://www.figma.com/file/your-figma-link-2",
      // liveLink: "https://artgallery.example.com",
      // githubLink: "https://github.com/yourusername/art-gallery",
      features: [
        "Virtual 3D exhibition rooms",
        "Artist profiles and portfolios",
        "Secure artwork transactions",
        "Augmented Reality preview",
      ],
    },
    {
      id: 3,
      title: "ITOS System",
      description:
        "Integrated Transportation Operations System for managing fleet and logistics operations.",
      category: "Enterprise",
      tags: ["React.js", "Spring Boot", "MySQL", "Redis", "Docker"],
      image: "/images/itos2.png",
      // figmaLink: "https://www.figma.com/file/your-figma-link-3",
      // liveLink: "https://itos.example.com",
      features: [
        "Real-time fleet tracking",
        "Route optimization",
        "Driver management",
        "Analytics and reporting",
      ],
    },
    {
      id: 4,
      title: "Transport Booking App",
      description:
        "Transportation booking application with real-time tracking and multiple vehicle options.",
      category: "Enterprise",
      tags: ["React.js", "Spring Boot", "MySQL", "Redis", "Docker"],
      image: "/images/transport.png",
      // figmaLink: "https://www.figma.com/file/your-figma-link-4",
      // liveLink: "https://transport-app.example.com",
      // githubLink: "https://github.com/yourusername/transport-app",
      features: [
        "Real-time vehicle tracking",
        "Multiple payment options",
        "Driver rating system",
        "Estimated fare calculator",
      ],
    },
  ];

  const figmaDesigns: Figma[] = [];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card
            className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => setIsOpen(true)}
          >
            <CardHeader className="flex flex-row justify-between items-start">
              <CardTitle className="text-xl font-bold">My Projects</CardTitle>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all">
                View All Projects
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-32 rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={`/images/${src}.png`}
                      alt={`Project preview ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Click to view all projects and Figma designs
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="!max-w-[1600px] w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              My Projects & Designs
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Projects Showcase
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="designs"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500"
              >
                <div className="flex items-center gap-2">
                  <Figma className="w-4 h-4" />
                  Figma Designs
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Project Image */}
                    <div className="md:w-2/5 relative h-64 md:h-auto">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Project Details */}
                    <div className="md:w-3/5 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800">
                          {project.category}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-1">
                          {project.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t">
                        {project.figmaLink && (
                          <a
                            href={project.figmaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <Figma className="w-4 h-4" />
                            Figma Design
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Figma Designs Tab */}
            <TabsContent value="designs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {figmaDesigns.length != 0 ? (
                  figmaDesigns.map(
                    (figma) =>
                      figma.figmaLink && (
                        <div
                          key={figma.id}
                          className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                        >
                          <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50">
                            <h3 className="font-bold text-lg mb-2">
                              {figma.title} Design
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {figma.description}
                            </p>

                            {/* Figma Embed Container */}
                            <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <Figma className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                  <p className="text-gray-500">
                                    Figma Design Preview
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    Interactive prototypes available
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-orange-100 text-orange-800">
                                  Design System
                                </Badge>
                                <Badge variant="outline">Prototype</Badge>
                              </div>
                              <a
                                href={figma.figmaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors group"
                              >
                                <Figma className="w-4 h-4" />
                                Open in Figma
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="flex justify-center items-center">
                    This section has not been developed yet.
                  </div>
                )}
              </div>

              {/* Figma Stats Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl">
                <h3 className="text-xl font-bold mb-4">Design Process</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">0+</div>
                    <div className="text-gray-300">Design Components</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">0%</div>
                    <div className="text-gray-300">Responsive Designs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">0</div>
                    <div className="text-gray-300">Design Systems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">∞</div>
                    <div className="text-gray-300">Iterations</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
