import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UnsplashCard() {
  return (
    <Card className="overflow-hidden shadow-lg border-0">
      <CardContent className="p-0">
        <div className="relative h-64">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
            alt="Architecture Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
            <Badge
              variant="secondary"
              className="w-fit mb-2 bg-white/90 text-gray-900"
            >
              Photography
            </Badge>
            <h3 className="text-2xl font-bold text-white mb-1">Unsplash</h3>
            <p className="text-white/95 text-sm leading-relaxed">
              Download free, beautiful high-quality photos curated by me.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
