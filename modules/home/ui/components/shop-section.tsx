import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShopSection() {
  const images = [
    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle>Nikita Shop</CardTitle>
        <Badge className="bg-blue-500">New Template</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Shop preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
