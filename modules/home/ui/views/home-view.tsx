"use client";

import { useState } from "react";
import BioCardSection from "../components/bio-card-section";
import ShopSection from "../components/shop-section";
import BlogSection from "../components/blog-section";
import FAQSection from "../components/faq-section";
import ProfileCard from "../components/profile-card";
import SocialLinks from "../components/social-links";
import SkillsTools from "../components/skills-tools";
import ProjectCard from "../components/project-card";
import ContactForm from "../components/contact-form";
import HowIWork from "../components/how-i-work";
import DesignerBookmarks from "../components/designer-bookmarks";
import UnsplashCard from "../components/unplash-card";
import MusicalPause from "../components/musical-pause";
import Recommendations from "../components/recommendations";
import ThankYouCard from "../components/thank-you-card";
import Header from "../components/header";

export default function HomeView() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <BioCardSection />
            <ShopSection />
            <BlogSection />
            <FAQSection />
            {/* <LocationCard /> */}
          </div>
          {/* Middle Column */}
          <div className="space-y-6">
            <ProfileCard />
            <SocialLinks />
            <SkillsTools />
            <ProjectCard />
            <ContactForm />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <HowIWork />
            {/* <DesignerBookmarks /> */}
            <UnsplashCard />
            <MusicalPause />
            {/* <Recommendations /> */}
            <ThankYouCard />
          </div>
        </div>
      </main>
    </div>
  );
}
