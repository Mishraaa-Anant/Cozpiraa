"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  HelpCircle,
} from "lucide-react";
import { SKIN_CONCERNS } from "@/lib/data";
import { SkinConcern } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function SkinConcernsSection() {
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>(SKIN_CONCERNS[0]);

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
    <section id="concerns" className="py-20 bg-ivory-100/50 border-b border-ivory-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="sage" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Interactive Guidance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-800 tracking-tight">
            Understand Your Skin Concern
          </h2>
          <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed">
            Select a skin or scalp concern below to view clinical characteristics, common causes, and recommended dermatological care categories.
          </p>
        </div>

        {/* Interactive Container: Grid + Active Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 12 Concern Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {SKIN_CONCERNS.map((concern) => {
              const isActive = selectedConcern.id === concern.id;
              return (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 ${
                    isActive
                      ? "bg-sage-600 text-white border-sage-700 shadow-elevation scale-[1.02]"
                      : "bg-white text-charcoal-800 border-ivory-300 hover:border-sage-400 hover:shadow-card"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-ivory-200 text-charcoal-600"
                      }`}
                    >
                      {concern.category}
                    </span>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                  </div>
                  <h3
                    className={`font-semibold text-sm sm:text-base leading-snug ${
                      isActive ? "text-white" : "text-charcoal-800"
                    }`}
                  >
                    {concern.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right: Active Concern Detail Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcern.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-6 sm:p-8 space-y-6 border-sage-600/30 bg-white shadow-elevation">
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">
                        {selectedConcern.category} Category
                      </span>
                      <h3 className="text-2xl font-bold text-charcoal-800 mt-0.5">
                        {selectedConcern.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-sm shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      Clinical Overview
                    </h4>
                    <p className="text-charcoal-700 text-sm leading-relaxed font-normal">
                      {selectedConcern.explanation}
                    </p>
                  </div>

                  {/* Key Characteristics */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      Common Characteristics
                    </h4>
                    <ul className="space-y-1.5 text-xs text-charcoal-700">
                      {selectedConcern.keyCharacteristics.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Treatment Categories */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      Relevant Care Pathways
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedConcern.treatmentCategories.map((t, idx) => (
                        <Badge key={idx} variant="terracotta" className="text-[11px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medical Disclaimer */}
                  <div className="p-3.5 bg-ivory-100 rounded-xl border border-ivory-300 flex items-start gap-2.5 text-xs text-charcoal-600">
                    <Info className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                    <span>{selectedConcern.medicalDisclaimer}</span>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center shadow-md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={scrollToAppointment}
                    >
                      Discuss This With A Dermatologist
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
