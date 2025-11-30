import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingCart } from "lucide-react";

export default function BioCardSection() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
      <CardHeader>
        <Sparkles className="w-8 h-8 text-yellow-500 mb-2" />
        <CardTitle className="text-2xl text-black">
          Sachinthya Rathnavibushana Full-Stack Software Engineer & MSc IT
          Candidate
        </CardTitle>
        <CardDescription className="text-gray-600">
          Crafting scalable, enterprise-grade solutions with a passion for
          innovation and cutting-edge technology. With 4+ years of experience in
          the full software development lifecycle, I bridge the gap between
          complex backend systems and intuitive frontend experiences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Get In Touch
        </Button>
      </CardContent>
    </Card>
  );
}
