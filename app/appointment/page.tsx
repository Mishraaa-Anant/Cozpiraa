import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { AppointmentSection } from "@/sections/AppointmentSection";
import { ContactSection } from "@/sections/ContactSection";

export const metadata = {
  title: "Book Appointment Online | CozPiraa Clinic Virar West",
  description: "Book your online appointment with Dr. Priyanka Rahul Patil (BAMS) at COZPIRAA Clinic Virar West. Instant confirmation for Acne, PRP, Laser, and Cosmetology.",
};

export default function AppointmentPage() {
  return (
    <div className="relative min-h-screen bg-ivory-100 flex flex-col selection:bg-sage-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-12">
        <AppointmentSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
