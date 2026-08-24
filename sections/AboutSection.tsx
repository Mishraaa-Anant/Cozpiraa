"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  MessageSquare,
  Award,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const CLINIC_HIGHLIGHTS = [
  {
    title: "Personalized Care",
    desc: "Tailored skin, hair, and cosmetology protocols matched to your specific skin architecture and lifestyle.",
    icon: Heart,
  },
  {
    title: "Professional Guidance",
    desc: "Physician-guided treatments backed by evidence-based aesthetic and skin science.",
    icon: ShieldCheck,
  },
  {
    title: "Patient Comfort",
    desc: "A calm, sterile, and welcoming clinic environment designed to put you at total ease.",
    icon: Award,
  },
  {
    title: "Transparent Communication",
    desc: "Clear explanations of your condition, treatment steps, and expected clinical timelines.",
    icon: MessageSquare,
  },
  {
    title: "Long-Term Skin Health",
    desc: "Focusing on barrier preservation and preventive guidance rather than quick symptom masking.",
    icon: CheckCircle2,
  },
];

export function AboutSection() {
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
    <section id="about" className="py-24 bg-white border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevation border border-ivory-300 bg-white group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/clinic.png"
                  alt="COZPIRAA Skin & Laser Clinic Interior - Virar West"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 bg-gradient-to-r from-sage-800 to-sage-900 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base">Modern Skin & Cosmetology Facility</h4>
                  <p className="text-xs text-sage-200">Global City, Virar West, Maharashtra</p>
                </div>
                <Badge variant="terracotta" className="text-xs font-bold uppercase">
                  Patient Comfort
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Right Column Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <Badge variant="sage" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              About COZPIRAA Skin, Hair & Laser Clinic
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight leading-tight">
              Virar&apos;s Premier Skin, Hair, Laser & Medical Cosmetology Center
            </h2>

            <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
              Located in Global City, Virar West, COZPIRAA is dedicated to delivering evidence-based clinical skin care, medical cosmetology, laser treatments, and trichology. Guided by <strong className="text-charcoal-800 font-semibold">Dr. Priyanka Rahul Patil (BAMS)</strong> with 10+ years of experience, we provide personalized care tailored to your unique skin architecture.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CLINIC_HIGHLIGHTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-ivory-100/70 border border-ivory-300/80 space-y-1.5 hover:border-sage-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-sage-600 shrink-0" />
                      <h4 className="font-bold text-sm text-charcoal-800">{item.title}</h4>
                    </div>
                    <p className="text-xs text-charcoal-600 leading-normal">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
                onClick={scrollToAppointment}
              >
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
