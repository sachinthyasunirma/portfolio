import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function DesignerBookmarks() {
  const features = [
    "UI-kits, icons, mockups, 3D content, fonts, illustrations and more.",
    "Useful plugins/materials for Figma and for other programs.",
    "Links to interesting sites for you.",
    "Download files directly. All free!",
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg border-0">
      <CardContent className="pt-6">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <span className="text-3xl">📱</span>
        </div>

        <h3 className="text-2xl font-bold text-center mb-2">
          Designer Bookmarks
        </h3>
        <p className="text-center text-purple-100 mb-4">Telegram Channel</p>

        <div className="space-y-2 text-sm mb-4">
          {features.map((feature, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className="text-yellow-300 text-base">📌</span>
              <span className="flex-1">{feature}</span>
            </p>
          ))}
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0">
          Subscribe and Get Inspired
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
