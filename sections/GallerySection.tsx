"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const GALLERY_ITEMS = [
  {
    src: "/images/clinic.png",
    alt: "COZPIRAA Dermatology Clinic Interior",
    title: "Clinical Environment",
    subtitle: "Modern & Hygienic Facility",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    src: "/images/doctor.jpg",
    alt: "Dr. Priyanka Rahul Patil - COZPIRAA Lead Practitioner",
    title: "Dermatological Practitioner",
    subtitle: "Dr. Priyanka Rahul Patil (BAMS)",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/doctor.png",
    alt: "COZPIRAA Dermatologist Consultation",
    title: "Patient Consultation",
    subtitle: "1-on-1 Personalized Care",
    span: "col-span-1 row-span-1",
  },
];

export function GallerySection() {
  return (
    <section className="py-24 bg-ivory-100/50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sage" icon={<ImageIcon className="w-3.5 h-3.5" />}>
            Clinic Gallery
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Our Clinical Facility & Atmosphere
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Designed for patient comfort, medical cleanliness, and comprehensive dermatological care.
          </p>
        </div>

        {/* Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden shadow-card border border-ivory-300 bg-white group min-h-[300px] ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                <Badge variant="sage" icon={<ShieldCheck className="w-3 h-3" />} className="text-[10px] uppercase font-bold">
                  COZPIRAA
                </Badge>
                <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
                <p className="text-xs text-ivory-200">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
