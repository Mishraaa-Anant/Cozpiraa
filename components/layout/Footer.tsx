"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { DOCTOR_PROFILE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-charcoal-800 text-ivory-100 pt-16 pb-12 border-t border-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-charcoal-700">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1">
                <Image
                  src="/images/latest.png"
                  alt="COZPIRAA Skin, Hair, Laser & Cosmetology Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
                  COZPIRAA
                  <ShieldCheck className="w-4 h-4 text-sage-400 inline" />
                </span>
                <span className="text-[10px] uppercase font-semibold text-sage-400 tracking-widest -mt-1">
                  Skin, Hair & Laser Clinic
                </span>
              </div>
            </div>

            <p className="text-charcoal-300 text-sm leading-relaxed">
              COZPIRAA is recognized as the top-rated cosmetology and skin, hair, laser treatment clinic in Virar West, delivering evidence-based clinical skin care, acne scar subcision, melasma care, laser rejuvenation, and PRP hair growth by Dr. Priyanka Rahul Patil.
            </p>

            <div className="pt-2 text-xs text-charcoal-400 space-y-1">
              <p className="font-medium text-ivory-200">
                Cosmetology Consultant: {DOCTOR_PROFILE.name} ({DOCTOR_PROFILE.qualification})
              </p>
              <p>10+ Years Experience · Global City, Virar West</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sage-400" />
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/#home" },
                { label: "About COZPIRAA Clinic", href: "/#about" },
                { label: "Skin, Hair & Laser Services", href: "/#services" },
                { label: "Skin Concern Selector", href: "/#concerns" },
                { label: "Patient Care Journey", href: "/#journey" },
                { label: "Cosmetology Consultant in Virar", href: "/#doctor" },
                { label: "Frequently Asked Questions", href: "/#faq" },
                { label: "Book Consultation", href: "/#appointment" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-charcoal-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-sage-400 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Focus */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sage-400" />
              Top Services in Virar
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Acne & Comedone Therapy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Acne Scar Subcision & Microneedling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Melasma & Hyperpigmentation Care</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Medical Peels & Glow Cosmetology</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Laser Skin Rejuvenation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Trichology & PRP Hair Growth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                <span>Anti-Aging & Fine Line Care</span>
              </li>
            </ul>
          </div>

          {/* Clinic Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-400" />
              Clinic Location & Contact
            </h4>
            <div className="space-y-3 text-sm text-charcoal-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-400 shrink-0 mt-1" />
                <span className="leading-snug">{DOCTOR_PROFILE.clinicAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <a
                  href={`tel:${DOCTOR_PROFILE.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {DOCTOR_PROFILE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <a
                  href={`mailto:${DOCTOR_PROFILE.email}`}
                  className="hover:text-white transition-colors"
                >
                  {DOCTOR_PROFILE.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sage-400 shrink-0 mt-1" />
                <span>{DOCTOR_PROFILE.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Local SEO Serving Keywords Bar */}
        <div className="py-6 border-b border-charcoal-700 text-xs text-charcoal-400 space-y-2">
          <p className="font-semibold text-ivory-200 uppercase tracking-wider text-[11px]">
            Serving Local Areas Across Palghar & Vasai-Virar:
          </p>
          <p className="leading-relaxed">
            Virar West · Global City Virar · Virar East · Bolinj · Arnala · Agashi · Nallasopara West · Vasai Road · Palghar District · Boisar
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-charcoal-400 gap-4">
          <p>© {new Date().getFullYear()} COZPIRAA Skin, Hair & Laser Clinic. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Cosmetology Consultant in Virar</span>
            <span>·</span>
            <span>Dr. Priyanka Rahul Patil</span>
            <span>·</span>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).openCookiePreferences) {
                  (window as any).openCookiePreferences();
                }
              }}
              className="hover:text-white transition-colors underline focus:outline-none"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
