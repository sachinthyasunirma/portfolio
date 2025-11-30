import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
  return (
    <Card className="bg-gradient-to-br from-pink-400 via-rose-400 to-pink-300 text-white border-0 shadow-2xl overflow-hidden rounded-3xl">
      <CardContent className="p-0 relative">
        {/* Full Card Image Background */}
        <div className="relative h-96">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

          {/* Text Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">
              Sachinthya R.
            </h2>
            <p className="text-lg md:text-xl text-white/95 drop-shadow-md">
              UI/UX & Web Designer
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
