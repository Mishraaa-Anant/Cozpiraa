"use client";

import React from "react";
import { useExperience } from "@/components/experience/ExperienceContext";
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
import { ShopHeroSection } from "@/sections/shop/ShopHeroSection";
import { ShopComingSoon } from "@/sections/shop/ShopComingSoon";

/**
 * ExperienceRouter — client component responsible for rendering the correct
 * content branch based on the active experience mode (consultation or shop).
 *
 * This keeps page.tsx a clean RSC while isolating all client-side
 * conditional rendering here. Future shop sections can be added to the
 * shop branch without touching the consultation branch.
 */
export function ExperienceRouter() {
  const { isShop } = useExperience();

  if (isShop) {
    return (
      <>
        <ShopHeroSection />
        <ShopComingSoon />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
