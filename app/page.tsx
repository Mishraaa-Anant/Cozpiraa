import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ExperienceProvider } from "@/components/experience/ExperienceContext";
import { ExperienceRouter } from "@/components/experience/ExperienceRouter";

export default function Home() {
  return (
    <ExperienceProvider>
      <div className="relative min-h-screen bg-ivory-100 flex flex-col selection:bg-sage-600 selection:text-white">
        {/* Sticky Header */}
        <Navbar />

        {/* Main Content — switches between Consultation and Shop experiences */}
        <main className="flex-1">
          <ExperienceRouter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Action Buttons (Call / WhatsApp / Book) */}
        <FloatingActions />
      </div>
    </ExperienceProvider>
  );
}
