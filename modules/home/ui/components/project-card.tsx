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
import { Clock, ExternalLink, MessageCircle, CheckCircle } from "lucide-react";

export default function UpworkProjectCard() {
  const features = [
    { text: "Framer & Frontend implementation", type: "default" },
    { text: "Clean, responsive code (HTML/CSS/JS)", type: "default" },
    { text: "Upwork hourly: $15 / hour", type: "price" },
    { text: "Unlimited minor revisions within scope", type: "default" },
    { text: "Upwork contract & escrow", type: "contract" },
    { text: "Free 15‑minute consultation", type: "free" },
  ];

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "free":
        return "bg-green-500";
      case "contract":
        return "bg-blue-500";
      case "price":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="shadow-lg max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          Framer & Frontend Developer — Upwork
        </CardTitle>
        <CardDescription>
          Professional Framer builds, focused on clean responsive code and clear
          communication. Available exclusively through Upwork at $15/hr.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Hourly
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Upwork only
          </Badge>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Typical reply within 24 hours
            </span>
            <span className="font-bold text-lg">$15 / hr</span>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${getFeatureColor(
                    feature.type
                  )}`}
                />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>Clear milestones and time tracking via Upwork</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Secure payments & dispute protection through Upwork</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Hire me on Upwork
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-center text-sm text-green-600 font-medium">
          Available for new contracts — let’s discuss your project scope
        </p>
      </CardContent>
    </Card>
  );
}
