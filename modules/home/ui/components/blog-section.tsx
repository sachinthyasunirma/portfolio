import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function BlogSection() {
  const blogPosts = [
    {
      title: "Spring Boot Microservices",
      subtitle: "Architecting scalable backend systems.",
    },
    {
      title: "React & State Management",
      subtitle: "Building dynamic and responsive user interfaces.",
    },
    {
      title: "From Electronics to Software Engineering",
      subtitle: "My journey and the synergies between the two fields.",
    },
    {
      title: "The Full-Stack Mindset",
      subtitle: "A holistic approach to project development.",
    },
  ];

  return (
    <>
      <Card className="bg-yellow-400 border-0 shadow-lg">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Blog
          </Badge>
          <CardTitle className="text-2xl text-gray-900">
            My Thoughts, Ideas & Updates
          </CardTitle>
          <CardDescription className="text-gray-800">
            Here you’ll find a collection of articles on software development,
            emerging technologies, and insights from my projects.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.subtitle}</p>
              </div>
              {/* <ChevronRight className="w-5 h-5 text-gray-400" /> */}
            </div>
          ))}
        </CardContent>
        <CardContent>
          <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500">
            See all notes
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
