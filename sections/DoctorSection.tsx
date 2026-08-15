"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { DOCTOR_PROFILE } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function DoctorSection() {
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

  return (
    <section id="doctor" className="py-24 bg-ivory-100/50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<Stethoscope className="w-3.5 h-3.5" />}>
            Lead Dermatologist & Cosmetologist in Virar
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Meet Virar&apos;s Trusted Dermatologist & Cosmetologist
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Dedicated clinical leadership by Dr. Priyanka Rahul Patil (BAMS), offering 9+ years of clinical dermatology, medical cosmetology, and personalized skin care in Virar West.
          </p>
        </div>

        <Card className="p-8 sm:p-12 border-sage-600/20 bg-white shadow-elevation overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Doctor Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-ivory-300 bg-white">
                <Image
                  src={DOCTOR_PROFILE.image}
                  alt={`${DOCTOR_PROFILE.name} - COZPIRAA Dermatologist`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-ivory-300 shadow-clinical flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm text-charcoal-800 block">
                    {DOCTOR_PROFILE.experience}
                  </span>
                  <span className="text-[11px] text-charcoal-500 font-medium">
                    Evidence-Based Care
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Bio & Profile */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="terracotta" className="text-[11px] uppercase font-bold">
                    {DOCTOR_PROFILE.qualification} Qualified
                  </Badge>
                  <Badge variant="sage" className="text-[11px] uppercase font-bold">
                    Clinical Dermatology
                  </Badge>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
                  {DOCTOR_PROFILE.name}
                </h3>
                <p className="text-sm font-semibold text-sage-700 mt-1">
                  {DOCTOR_PROFILE.title}
                </p>
              </div>

              <p className="text-charcoal-700 text-base leading-relaxed">
                {DOCTOR_PROFILE.bio}
              </p>

              {/* Specialties Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                  Core Clinical Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {DOCTOR_PROFILE.specialties.map((spec, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-ivory-100 border border-ivory-300 text-xs font-semibold text-charcoal-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Principles */}
              <div className="p-4 bg-sage-50/70 rounded-xl border border-sage-200/80 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sage-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  Clinical Philosophy
                </h4>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  "Every patient deserves an empathetic, non-judgmental atmosphere where skin concerns are evaluated through objective medical diagnostics rather than quick cosmetic trends."
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={scrollToAppointment}
                >
                  Book a Consultation
                </Button>
                <a
                  href={`tel:${DOCTOR_PROFILE.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Phone className="w-5 h-5 text-sage-600" />}
                  >
                    Call Clinic Direct
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
