import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "GitHub",
      username: "/nikita-ermilov",
      icon: <Github className="w-5 h-5" />,
      bg: "bg-white",
      border: "border border-gray-200",
      buttonClass:
        "bg-black text-white hover:bg-gray-800 flex items-center justify-between w-full",
      buttonText: "Repo",
      link: "https://github.com/sachinthyasunirma",
    },
    {
      name: "Twitter",
      username: "@nikita_uiux",
      icon: <Twitter className="w-5 h-5" />,
      bg: "bg-white",
      border: "border border-gray-200",
      buttonClass:
        "bg-black text-white hover:bg-gray-800 flex items-center justify-between w-full",
      buttonText: "Follow",
      link: "https://github.com/sachinthyasunirma",
    },
    {
      name: "Instagram",
      username: "@nikita.ermilov",
      icon: <Instagram className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-50",
      border: "border border-orange-100",
      buttonClass:
        "bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-between w-full",
      buttonText: "Follow",
      link: "https://github.com/sachinthyasunirma",
    },
    {
      name: "LinkedIn",
      username: "/sachinthya",
      icon: <Linkedin className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border border-blue-100",
      buttonClass:
        "bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-between w-full",
      buttonText: "Connect",
      link: "https://www.linkedin.com/in/sachinthya-rathnavibushana-1976b318a",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
      {socialLinks.map((social, index) => (
        <Card
          key={index}
          className={`rounded-3xl shadow-none ${social.bg} ${social.border} p-4`}
        >
          <CardContent className="p-0">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                {social.icon}
              </div>

              <div>
                <h3 className="font-semibold text-lg">{social.name}</h3>
                <p className="text-sm text-gray-500">{social.username}</p>
              </div>

              {/* Wrap Button with anchor tag */}
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className={`${social.buttonClass} cursor-pointer`}>
                  <span className="font-medium">
                    {social.extra ? `${social.extra} ` : ""}
                    {social.buttonText}
                  </span>
                  <span className="text-lg">↗</span>
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
