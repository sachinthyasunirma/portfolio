import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function Recommendations() {
  const recommendations = [
    {
      name: "Jon Yezzel",
      role: "Contra",
      rating: 5,
      text: "Nikita is a lion among lambs—bold, confident, and stands out in a world where most play it safe. If you want a designer who owns their craft, look no farther.",
      verified: true,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100">
                <Image
                  src={rec.avatar}
                  alt={rec.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                  {rec.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white px-1.5 py-0 text-xs"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{rec.role}</p>
              </div>
            </div>

            <div className="flex gap-0.5">
              {[...Array(rec.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{rec.text}"
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
