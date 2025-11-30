import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ThankYouCard() {
  return (
    <>
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg text-center border-0">
        <CardContent className="pt-6 pb-6">
          <span className="text-6xl mb-4 block animate-pulse">👋</span>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            Thanks for visiting!
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Live long and prosper, fellow explorer. Come back soon for more
            awesome content!
          </p>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-xs text-gray-500 mb-2">
              © Design by Nikita Ermilov • 2024
            </p>
            <Button
              variant="link"
              className="text-blue-600 text-xs hover:text-blue-700 p-0 h-auto"
            >
              Privacy policy
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-4">
        <Badge
          variant="outline"
          className="text-xs text-gray-500 border-gray-300 bg-white"
        >
          🔨 Made in Framer
        </Badge>
      </div>
    </>
  );
}
