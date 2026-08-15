import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { HeroSection } from "@/sections/HeroSection";
import { SkinConcernsSection } from "@/sections/SkinConcernsSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { SkinJourneySection } from "@/sections/SkinJourneySection";
import { AboutSection } from "@/sections/AboutSection";
import { DoctorSection } from "@/sections/DoctorSection";
import { EduHubSection } from "@/sections/EduHubSection";
import { MythFactSection } from "@/sections/MythFactSection";
import { FAQSection } from "@/sections/FAQSection";
import { AppointmentSection } from "@/sections/AppointmentSection";
import { ContactSection } from "@/sections/ContactSection";
import { GallerySection } from "@/sections/GallerySection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-ivory-100 flex flex-col selection:bg-sage-600 selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <SkinConcernsSection />
        <ServicesSection />
        <SkinJourneySection />
        <AboutSection />
        <DoctorSection />
        <EduHubSection />
        <MythFactSection />
        <FAQSection />
        <AppointmentSection />
        <ContactSection />
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (Call / WhatsApp / Book) */}
      <FloatingActions />
    </div>
  );
}
