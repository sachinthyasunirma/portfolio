"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function MusicalPause() {
  const router = useRouter();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          My Playlist
        </Badge>
        <CardTitle className="text-2xl">Musical Pause</CardTitle>
        <CardDescription>
          Take a break from your busy schedule and enjoy an endless variety of
          sounds and genres that will make you sing, dance and be inspired.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onClick={() => router.push("https://music.apple.com/us/album/choosin-texas/1844932149?i=1844932150")}
          className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-xl">🎵</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Collection
              </p>
              <p className="font-semibold text-gray-900">Apple Music</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}
