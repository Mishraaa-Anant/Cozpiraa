"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { DOCTOR_PROFILE } from "@/lib/data";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAppointment = () => {
    const element = document.querySelector("#appointment");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Direct Call Button */}
      <a
        href={`tel:${DOCTOR_PROFILE.phone.replace(/[^0-9+]/g, "")}`}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-white text-sage-800 rounded-full shadow-elevation border border-ivory-300 hover:bg-sage-50 transition-all text-xs font-semibold hover:scale-105 active:scale-95"
        aria-label="Call COZPIRAA Clinic"
      >
        <span className="p-1.5 rounded-full bg-sage-100 text-sage-700">
          <Phone className="w-3.5 h-3.5" />
        </span>
        <span className="hidden sm:inline">Call Clinic</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${DOCTOR_PROFILE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 text-white rounded-full shadow-elevation hover:bg-emerald-700 transition-all text-xs font-semibold hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="p-1.5 rounded-full bg-white/20 text-white">
          <MessageSquare className="w-3.5 h-3.5" />
        </span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Book Consultation Quick Trigger */}
      <button
        onClick={scrollToAppointment}
        className="flex items-center gap-2 px-4 py-2.5 bg-sage-600 text-white rounded-full shadow-elevation hover:bg-sage-700 transition-all text-xs font-semibold hover:scale-105 active:scale-95"
        aria-label="Book a consultation"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Consultation</span>
      </button>
    </div>
  );
}
