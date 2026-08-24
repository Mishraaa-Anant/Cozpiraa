"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Sparkles, ShieldCheck, ChevronDown, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-gradient-to-b from-ivory-100 via-ivory-50 to-white overflow-hidden border-b border-ivory-200/60"
    >
      {/* Background Decorative Circles */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 bg-sage-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-terracotta-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <Badge
              variant="sage"
              icon={<ShieldCheck className="w-4 h-4 text-sage-600" />}
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              Top-Rated Skin, Hair, Laser & Cosmetology Consultant in Virar West
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-800 tracking-tight leading-[1.15]">
              Leading Skin, Hair, Laser &{" "}
              <span className="text-sage-600 relative inline-block">
                Cosmetology Clinic
                <span className="absolute left-0 bottom-1 w-full h-2 bg-sage-200/50 -z-10 rounded-full" />
              </span>{" "}
              in Virar
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-charcoal-600 font-normal leading-relaxed max-w-2xl">
              Consult <strong className="text-charcoal-800 font-semibold">Dr. Priyanka Rahul Patil (BAMS)</strong> — Virar&apos;s trusted Cosmetology Consultant with 10+ years of clinical expertise in skin, hair, laser treatments, acne control, scar reduction, melasma care, and hair regrowth PRP.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
                onClick={() => scrollToSection("#appointment")}
                className="shadow-elevation"
              >
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Sparkles className="w-5 h-5 text-sage-600" />}
                onClick={() => scrollToSection("#concerns")}
              >
                Explore Skin Concerns
              </Button>
            </div>

            {/* Trust Line */}
            <div className="pt-6 border-t border-ivory-300/80 flex items-center gap-2 text-xs sm:text-sm font-medium text-charcoal-500">
              <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
              <span>Personalized Care</span>
              <span className="text-ivory-400">•</span>
              <span>Professional Guidance</span>
              <span className="text-ivory-400">•</span>
              <span>Patient-Focused Approach</span>
            </div>
          </motion.div>

          {/* Right Column Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sage-200/40 via-ivory-200 to-terracotta-200/30 blur-lg -z-10" />

              <div className="relative rounded-2xl overflow-hidden shadow-elevation border border-ivory-300 bg-white group">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/doctor.jpg"
                    alt="Dr. Priyanka Rahul Patil - Cosmetology Consultant & Skin, Hair, Laser Practitioner at COZPIRAA"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Image Badges */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-ivory-200 shadow-clinical flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-800 uppercase tracking-wider">
                        Dr. Priyanka Rahul Patil
                      </h4>
                      <p className="text-[11px] text-charcoal-500 font-medium">
                        BAMS · 10+ Years Practice
                      </p>
                    </div>
                  </div>
                  <Badge variant="sage" className="text-[10px] uppercase font-bold">
                    Skin & Laser
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-charcoal-400 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => scrollToSection("#concerns")}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
